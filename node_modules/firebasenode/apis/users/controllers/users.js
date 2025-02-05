// const { admin, firebase } = require('../../../core/firebase');
var {admin , firebase} = framework.firebase;
// console.log(framework);

const db = admin.database();
const auth = firebase.auth();

module.exports = {
    register: (req, res) => {
        var email = req.body.email;
        var pass = req.body.password;
        var cpass = req.body.cPassword;
        var extraData = 'this is extra';
    
        var eCpassword = false;
        var ePassword = false;
        var eEmail = false;
    
        if(pass !== cpass){
            eCpassword = true;
        }
        if(!pass || pass == ''){
            ePassword = true;
        }
        if(!email || email == ''){
            eEmail = true;
        }
        if(eCpassword || ePassword || eEmail){
            return res.status(500).send({errors : {
                cpassword : eCpassword,
                email : eEmail,
                password : ePassword
            }});
        } else{
            auth.createUserWithEmailAndPassword(email, pass)
            .then(data => {
                // User created successfully
                db.ref(`/users/${data.user.uid}`).set({
                    email,
                    extraData
                })
                .catch(err => {
                    return res.status(500).send({
                        error : 'Can\'t create user in realtime database however user is created in auth.'
                    })
                })
                res.status(200).json(data);
            })
            .catch(err => {
                // An error occured while creating user
                console.error(`Error : ${err}`);
                res.status(500).json(err.message);
            })
        }
    },
    login: (req, res) => {
        var email = req.body.email;
        var pass = req.body.password;
        var ePassword = false;
        var eEmail = false;
    
        if(!pass || pass == ''){
            ePassword = true;
        }
        if(!email || email == ''){
            eEmail = true;
        }
        if(ePassword || eEmail){
            return res.status(500).send({
                errors : {
                    email : eEmail,
                    password : ePassword
                }
            })
        } else{
            auth.signInWithEmailAndPassword(email, pass)
            .then(data => {
                return data.user.getIdToken();
            })
            .then(token => {
                return res.status(200).send({token});
            })
            .catch((error) => {
                return res.status(403).send(error);
            })
        }
    },
    test : (req, res) => {
        res.send("Testing routes function");
    }
}