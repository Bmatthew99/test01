const path = require('path');
const apis = framework.core.functions.getDirs(__dirname + '/../apis');
/* create services as empty obj */
framework.services = {};
try{
    /* for each apis folder */
    for(let api in apis){
        /* get list of files inside services folder */ 
        const services = framework.core.functions.getFiles(path.join(__dirname, `../apis/${apis[api]}/services`));
        /* if this is first occurrence  */
        if(!framework.services[apis[api]]){
            framework.services[apis[api]] = {};
        }
        for(let service in services){
            var controllerName = framework.core.functions.trimExtension(services[service]);
            framework.services[apis[api]][controllerName] = require(path.join(__dirname, `../apis/${apis[api]}/services/${services[service]}`));
        }
    }
} catch(err){
    throw [err, "Problem with services"];
}
module.exports = framework.services;