const initFramework = () => {
    global.framework;
    /* init core functions */
    framework = {
        core : {
            functions : require('./functions')
        }
    };
    framework.firebase = require('./firebase');
    require('./controllers');
    require('./services');
}

module.exports = initFramework;