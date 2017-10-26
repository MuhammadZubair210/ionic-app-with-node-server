const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const User = require('../../src/models/contact');
const db = require('mongodb');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mean');


// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
        if (err) return console.log(err);
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// try get
// router.get('/contacts', (req, res) => {
//     Contact.find((err, contact) => {
//         res.json(contact)
//     })
// });

router.get('/contacts', (req, res) => {
    connection((db) => {
        db.collection('contacts')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});



//delete user
router.delete('/contact/:id', (req, res) => {
    console.log(req.params.id);
    connection((db) => {
        db.collection('contacts').remove({ _id: ObjectID(req.params.id) }, (err, result) => {
            if (err) {
                return res.json(err);
            }
            else {
                return res.json(result);
            }
        })
    })
})

//update user
router.put('/contact/:id', (req, res) => {
    console.log(req.body);
    connection((db) => {
        db.collection('contacts').findOneAndUpdate({ _id: ObjectID(req.params.id) }, req.body, (err, result) => {
            if (err) {
                return res.json(err);
            }
            else {
                return res.json(result);
            }
        })
    })
})

// Get users
router.get('/users', (req, res, next) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
    next();
});

// try post
router.post('/contacts', (req, res) => {
    console.log(req.body)
    let contact = new User(req.body);

    contact.save((err, contact) => {
        if (err) {
            // res.json(err);
            console.log(err, "not sent")
        }
        res.json(contact);
        console.log("sent successfully")

    });
 
});
// try post
// router.post('/users', (req, res) => {
//     connection((db) => {
//         db.collection('users').save(req.body)
//             .then((users) => {
//                 response.data = users;
//                 res.json(response);
//             })
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
// });

module.exports = router;
  
