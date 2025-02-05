# FirebaseNode
### Version 1.5.0
FirebaseNode is framework that provides very easy Api management and connection with Firebase. With the use of FirebaseNode we can connect with firebase and create apis with them very quickly.

## Installation
 * Use npm to install FirebaseNode
    ```bash
    npm i firebasenode
    ```
OR if you clone this repo

 * Use this cmd on root of the project.
    ```bash
    npm install 
    ```
 * To setup firebase edit config/firebase.js with firebase-admin and firebase configurations (Both of them are required).
 * For server configuration edit config/server.json.
 * For development run following cmd.
    ```bash
    npm run dev
    ```
 * For production run following cmd.
    ```bash
    npm start
    ```

## Usage
 * Setup firebase console
    - Sign in to firebase account from [here](https://console.firebase.google.com/).
    - Create new project or use existing.
    - Now in your project deshboard click on web app and register your web app with providing nickname to your app.
    - Now this will show you some SDK code, from that copy firebasConfig and use that as firebase client config.
    - For the admin settings, Go to dashboard click on settings icon near Project Overview link in left sidebar.
        - click on Project Settings
        - Go to Service Accounts
        - Copy node-js config from that and in order to download service account json file click on Generate new private key and use that as service account json file.
 * SetUP Firebase Account in framework config:- 
    - Modify config/firebase.js
        add your firebase client configuration to the key 'firebaseConfig'.
        add your firebase admin configuration to the key 'adminConfig' 
        to add your service account json file at your desired location and require it in this file and replace serviceAccount const with your serviceAccount file data.
 * Create Apis :-
    - Create a folder inside apis folder with the name of api you want.
    - inside that folder create controllers and services folders and routes.json file
    - Format of the routes.json file will be as follows:
        ```JSON
        [{
            "path": "path/to/api",
            "method": "REQUEST_METHOD",
            "action": "CONTROLLER_NAME.ACTION_NAME",
            "secure": true | false,
            "enabled": true | false
        }]
        ```
    - Here we can specify any number of routes we want.
    - If specified action or controllers is not there then that route will be ignored with console warning.
    - Note :- Here path will be prefixed with API_NAME/ACTUAL_PATH
 * Services :- 
    - Services are defined in apis/{API_NAME}/services direcotry.
    - These services will be accessible with framework.services.{API_NAME}.{SERVICE_FILE_NAME}.{FUNCTION_NAME}
 * Controllers :- 
    - Controllers are defined in apis{API_NAME}/controllers directory.
    - Access services with framework super global variable.
## Changelog
 * Create global app/framework variable to access all controllers/services/firebase/middlewares etc
 * Apis added (All apis which are currently on can be found in apis folder in separated api named folder.)
 * Routes added (Now we'll need to just create routes.json containing routes info to define routes)
 * Controllers added (All actions that a route performs can be referenced and found in controllers folder of each api folder)
 * Firebase config separated from code. (Firebase and firebase admin can be configured from config/firebase.js)
 * Server configuration (server configurations like port number etc can be modified from config/server.json)
 * Firebase admin token middleware is separated from code and can be found at middlewares/firebase_token.js
 * Port checking added (Port will be veryfied before starting server on that port and will ask to start server from another free port without changing the code.)

## TODO
 * Add cli support to create APIs.
 * implement env-cmd package
 * implement themes concept
 * Make One of the Firebase-admin or Firebase optional.
 * implement array of middlewares
 * implement global middlewares https://expressjs.com/en/guide/routing.html find express.Router
 * Add functions and config to global.