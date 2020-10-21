function formatName(name){
    var flag = false;
    return name.split('').map(c=>{
        if(c===' '||c==='-'){
            flag = true;
            return '';
        }
        if(flag){
            flag = false;
            return c.toUpperCase();
        }
        return c;
    }).join('')
}

module.exports = {
    formatName: formatName
}