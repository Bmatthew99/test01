const { readdirSync, statSync, existsSync } = require('fs');

module.exports = {
    getDirs : source =>
        readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name),
    getFiles : directoryPath => {
        var files = [];
        if(!existsSync(directoryPath)){
            return files;
        }
        readdirSync(directoryPath).forEach(file => {
            if(!statSync(directoryPath +'/'+ file).isDirectory()){
                files.push(file);
            }
        });
        return files;
    },
    trimExtension : file => {
        var n = file.lastIndexOf(".");
        return file.slice(0, n);
    }
}