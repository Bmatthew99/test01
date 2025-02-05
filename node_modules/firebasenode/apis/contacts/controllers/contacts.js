const { admin } = framework.firebase;
const db = admin.database();
const config = require('../../../config/firebase');

module.exports = {
    fetchAll : (req, res) => {
        //"value", "child_added", "child_removed", "child_changed", or "child_moved".
        // return res.send(req.user);
        db.ref('/contacts/'+req.user.uid).once('value',(snapshot) => {
            const data = snapshot.val()
            return res.status(200).json(data);
            // res.render('index', {contacts : data});
        })
        .catch(error => {
            return res.status(500).send(error);
        }); 
    },
    add: (req, res) => {
        const imageUrl = "https://firebasestorage.googleapis.com/v0/b/node-251406.appspot.com/o/blank-profile-picture-973460_640.png?alt=media";
        var contact = {
            firstname : req.body.firstname || '',
            lastname : req.body.lastname || '',
            email : req.body.email || '',
            phone : req.body.phone || '',
            imageUrl
        }
        db.ref('/contacts/'+req.user.uid).push(contact)
        .then(data => {
            return res.status(200).json({
                status: "Success!!",
                Message: "Contact Added!!"
            });
        })
        .catch(error => {
            return res.status(500).json(error)
        });
        // res.redirect('/');
    },
    delete: (req, res) => {
        db.ref(`contacts/${req.user.uid}/${req.params.id}`).remove()
        .then(data => {
            return res.status(200).send({status : "success", message: 'Contact Deleted!!'});
        })
        .catch(err => {
            return res.status(500).send(data);
        });
        // res.redirect('/');
    },
    uploadImage: (req, res) => {
        const path = require('path');
        const os = require('os');
        const fs = require('fs');
        var Busboy = require('busboy');
        var busboy = new Busboy({ headers: req.headers });

        let imageFileName;
        let imageToUpload = {};
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
            file.on('data', function(data) {
              console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
            });
            file.on('end', function() {
                console.log('File [' + fieldname + '] Finished');
            });
            console.log("coming inside file....");
            var tmp = filename.split('.');
            var imageExtension = tmp[tmp.length-1];
            imageFileName = `${Math.round(Math.random()*10000000000000000)}.${imageExtension}`;
            const filePath = path.join(os.tmpdir(), imageFileName);
            console.log("filepath inside --> ", filePath);
            imageToUpload = { filePath, mimetype};
            file.pipe(fs.createWriteStream(filePath));
        });
        busboy.on('finish', function() {
            admin.storage().bucket().upload(imageToUpload.filePath, {
                resumable: false,
                metadata: {
                    metadata: {
                        contentType: imageToUpload.mimetype
                    }
                }
            })
            .then(() => {
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
                console.log(imageUrl);
                const contactId = req.params.id;
                db.ref(`contacts/${req.user.uid}/${contactId}/imageUrl`).set(imageUrl);
            })
            .then(() => {
                return res.status(200).send("Image Uploaded Succesfully!!");
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).send(err);
            })
        });
        req.pipe(busboy);
    },
    uploadImageTest: (req, res) => {
        
        const path = require('path');
        const os = require('os');
        const fs = require('fs');
        var Busboy = require('busboy');
        var busboy = new Busboy({ headers: req.headers });

        let imageFileName;
        let imageToUpload = {};
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
            file.on('data', function(data) {
              console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
            });
            file.on('end', function() {
                console.log('File [' + fieldname + '] Finished');
            });
            console.log("coming inside file....");
            var tmp = filename.split('.');
            var imageExtension = tmp[tmp.length-1];
            imageFileName = `${Math.round(Math.random()*10000000000000000)}.${imageExtension}`;
            const filePath = path.join(os.tmpdir(), imageFileName);
            console.log("filepath inside --> ", filePath);
            imageToUpload = { filePath, mimetype};
            file.pipe(fs.createWriteStream(filePath));
        });
        busboy.on('finish', function() {
            admin.storage().bucket().upload(imageToUpload.filePath, {
                resumable: false,
                metadata: {
                    metadata: {
                        contentType: imageToUpload.mimetype
                    }
                }
            })
            .then(() => {
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
                console.log(imageUrl);
                // const contactId = req.params.id;
                // db.ref(`contacts/${req.user.uid}/${contactId}/imageUrl`) = imageUrl;
            })
            .then(() => {
                return res.status(200).send("Image Uploaded Succesfully!!");
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).send(err);
            })
        });
        req.pipe(busboy);
    }
}