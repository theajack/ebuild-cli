const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

function resolveRootPath (str) {
    return path.resolve(__dirname, `../../${str}`);
}

function resolvePacakgePath (str) {
    return path.resolve(__dirname, `../../packages/${str}`);
}

function extrackSinglePackageInfo (dir) {
    const {name, version, dependencies} = require(resolvePacakgePath(`${dir}/package.json`));
    return {
        name,
        version,
        dependencies: dependencies ? Object.keys(dependencies) : [],
    };
}

function extractPackagesInfo () {
    const dirs = fs.readdirSync(resolveRootPath('packages'));

    return dirs.map(dir => extrackSinglePackageInfo(dir));
}

function upcaseFirstLetter (str) {
    if (typeof str !== 'string' || !str) return '';
    return str[0].toUpperCase() + str.substr(1);
}

function initMonorepoPackagesInfo (isDev) {
    const dirs = fs.readdirSync(resolveRootPath('packages'));

    dirs.forEach((dir) => {
        initMonorepoSinglePackageInfo(dir, isDev);
    });
}

function initMonorepoSinglePackageInfo (dir, isDev = false) {
    const packagePath = resolvePacakgePath(`${dir}/package.json`);
    const pkg = require(packagePath);
    const prefix = 'monorepo'; // todo 修改前缀
    const packageName = `${prefix}${dir === 'main' ? '' : `-${dir}`}`;

    if (isDev) {
        pkg.main = 'src/index.ts';
        pkg.typings = 'src/index.ts';
    } else {
        pkg.main = `dist/${packageName}.min.js`;
        pkg.typings = `dist/${packageName}.d.ts`;
    }
    pkg.publishConfig = {
        registry: 'https://registry.npmjs.org/',
    };
    writeJsonIntoFile(packagePath, pkg);
    fs.copyFileSync(resolveRootPath('README.md'), resolvePacakgePath(`${dir}/README.md`));

    const tsconfig = require(resolveRootPath('tsconfig.json'));
    tsconfig.include = ['src/**/*'];
    writeJsonIntoFile(resolvePacakgePath(`${dir}/tsconfig.json`), tsconfig);
}

function writeJsonIntoFile (filePath, json) {
    fs.writeFileSync(transfromFilePath(filePath), JSON.stringify(json, null, 4), 'utf8');
}

function writeStringIntoFile (filePath, str, append = false) {
    filePath = transfromFilePath(filePath);
    append ?
        fs.appendFileSync(filePath, str, 'utf8') :
        fs.writeFileSync(filePath, str, 'utf8');
    
}

function transfromFilePath (filePath) {
    if (filePath[0] === '@') {
        return resolveRootPath(filePath.substr(1));
    }
    return filePath;
}

async function exec (cmd) {
    return new Promise(resolve => {
        childProcess.exec(cmd, function (error, stdout, stderr) {
            if (error) {
                resolve({success: false, stdout, stderr});
            } else {
                resolve({
                    success: true,
                    stdout,
                    stderr
                });
            }
        });
    });
}

function buildPackageJson (extract = {}) {
    const pkg = require(resolveRootPath('package.json'));

    const attrs = ['name', 'version', 'description', 'main', 'unpkg', 'jsdelivr', 'typings', 'repository', 'keywords', 'author', 'license', 'bugs', 'homepage', 'dependencies'];

    const npmPkg = {};

    attrs.forEach(key => {
        if (pkg[key]) {
            npmPkg[key] = pkg[key];
        }
    });

    let filePath = '@npm/package.json';

    for (const key in extract) {
        if (key === '$path') {
            filePath = extract[key];
        } else {
            npmPkg[key] = extract[key];
        }
    }

    writeJsonIntoFile(filePath, npmPkg);
}

function copyFile (src, dest) {
    fs.copyFileSync(transfromFilePath(src), transfromFilePath(dest));
}

function readFile (filePath) {
    return fs.readFileSync(transfromFilePath(filePath), {encoding: 'utf-8'});
}

function replaceFileContent (filePath, regExp, replacement) {
    const content = readFile(filePath);
    const newContent = content.replace(regExp, replacement);
    writeStringIntoFile(filePath, newContent);
}

function mkdirDir (filePath) {
    filePath = transfromFilePath(filePath);
    if (!fs.existsSync(filePath)) {
        console.log('mkdirSync', filePath);
        fs.mkdirSync(filePath);
    }
}
  
function clearDirectory (dirPath) {
    dirPath = transfromFilePath(dirPath);
    if (!fs.existsSync(dirPath)) return;
    clearDirectoryBase(dirPath);
}
  
function clearDirectoryBase (dirPath) {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
        const filePath = `${dirPath}/${file}`;
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            clearDirectoryBase(filePath);
            fs.rmdirSync(filePath);
        } else {
            fs.unlinkSync(filePath);
        }
    });
};

module.exports = {
    exec,
    extrackSinglePackageInfo,
    resolveRootPath,
    resolvePacakgePath,
    extractPackagesInfo,
    upcaseFirstLetter,
    initMonorepoPackagesInfo,
    initMonorepoSinglePackageInfo,
    writeJsonIntoFile,
    writeStringIntoFile,
    buildPackageJson,
    transfromFilePath,
    copyFile,
    clearDirectory,
    mkdirDir,
    replaceFileContent,
    readFile,
};
