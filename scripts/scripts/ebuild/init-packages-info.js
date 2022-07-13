
const {initMonorepoPackagesInfo} = require('./utils');

const isDev = process.argv[2] === 'dev';

initMonorepoPackagesInfo(isDev);
 