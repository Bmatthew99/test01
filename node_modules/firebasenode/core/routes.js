const { Router } = require('express');
const router = Router();
const { validateToken } = require('../middlewares/firebase_token');
// const { existsSync } = require('fs');
// const path = require('path');
// console.log(framework);

const apis = framework.core.functions.getDirs(__dirname + '/../apis');

/* Looping through all apis */
for(let key in apis){
    var routes = {};
    /* getting all routes */
    routes = require(`../apis/${apis[key]}/routes.json`);

    /* for each route */ 
    for(let route in routes){
        /* if route is not enabled skip it */
        if(!routes[route].enabled) continue;

        /* extract controller and action from a route */
        var controllerArray = routes[route].action.split('.');

        /* if controller and actions are not defined as expected */
        if(controllerArray.length != 2 || !routes[route].path || !routes[route].action){
            throw `There is an problem with API : '${apis[key]}' ROUTE PATH: ${routes[route].path} METHOD: ${routes[route].method}`;
        }

        /* if path of a route doesn't start with '/' add '/' at the begining */
        if(!routes[route].path.startsWith('/')){
            routes[route].path = '/'+routes[route].path;
        }

        /* combine route path with api name to avoid conflictions */
        routes[route].path = '/'+(apis[key]+routes[route].path);
        // console.log(routes[route].path);

        /* hold extracted controller and action info */
        const action = {
            controller: controllerArray[0],
            function: controllerArray[1]
        }

        /* fetching function */
        try{
            
            if(framework.controllers && framework.controllers[apis[key]] && framework.controllers[apis[key]][action.controller] && framework.controllers[apis[key]][action.controller][action.function]){
                var func = framework.controllers[apis[key]][action.controller][action.function];
            } else {
                var func = false;
            }
        } catch(err){
            throw [err, `There is an problem with API : '${apis[key]}', FUNCTION: '${action.function}'.`];
        }

        /* if function was not found show warning and ignore that route */
        if(!func){
            console.warn(`(ignored) Function '${routes[route].action}' defiend for API : '${apis[key]}' & PATH : (${routes[route].method})'${routes[route].path}' was not accessible.`);
            continue;
        }

        /* define routes */
        if(!routes[route].secure){
            router[routes[route].method](routes[route].path, func);
        } else {
            router[routes[route].method](routes[route].path, validateToken, func);
        }
    }

}
module.exports = router;