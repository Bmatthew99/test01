const path = require('path');
const apis = framework.core.functions.getDirs(__dirname + '/../apis');

framework.controllers = {};
try{
    for(let api in apis){
        const controllers = framework.core.functions.getFiles(path.join(__dirname, `../apis/${apis[api]}/controllers`));
        // console.log("api --> ", apis[api], '---> ', controllers);
        if(!framework.controllers[apis[api]]){
            framework.controllers[apis[api]] = {};
        }
        for(let controller in controllers){
            var controllerName = framework.core.functions.trimExtension(controllers[controller])
            framework.controllers[apis[api]][controllerName] = require(path.join(__dirname, `../apis/${apis[api]}/controllers/${controllers[controller]}`));
        }
    }
} catch(err){
    throw [err, "Problem with Controllers"];
}
module.exports = framework.controllers;