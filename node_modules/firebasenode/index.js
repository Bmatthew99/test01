const app = require('./core/app');
var readlineSync = require('readline-sync');
const detect = require('detect-port');
const verifyPort = (port) => {  
    detect(port)
    .then(_port => {
    if (port == _port) {
        app.listen(port, () => {
            console.log(`server started at : http://${app.get('host')}:${port}/`);
        });
    } else {
        if (readlineSync.keyInYN(`port: ${port} is occupied, Change port to: ${_port}?`)) {
            verifyPort(_port);
        } else {
            console.log('Leaving...');
        }
    }
    })
    .catch(err => {
        console.log(err);
    });
}

verifyPort(app.get('port'));