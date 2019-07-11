const User = require('../Models/User.js');

exports.create = (req, res) => {
    
    if(!req.body) {
        return res.status(400).send({
            status : 400,
            message: "User registration can not be empty"
        });
    }

    let user = new User({
        id: req.body.id,
        name:  req.body.name,
        email: req.body.email,
        birthdate: req.body.birthdate,
        status:  req.body.status,
        fav_sports: req.body.fav_sports
    });

    user.save().then(user => {
        let response = {
            success : true,
            status : 200,
            data : user
        }
        res.send(response);
    }).catch(err => {
        let msg = (err.message.search("id_1") > -1) ? "id" : (err.message.search("email_1") > -1) ? "email" : null;
        res.status(500).send({
            status : 500,
            message: (msg) ? "The user "+msg+" already exists" : err.message
        });
    });
};

exports.show = (req, res) => {
    User.find({id:req.params.userId},{ '_id':0 , "__v":0 }).then(user => {

        if(!user || !user.length) {
            return res.status(404).send({
                status : 404,
                message: "There is no active user record with the id: " + req.params.userId
            });            
        }
        let response = {
            success : true,
            status : 200,
            data : user
        }
        res.send(response);

    }).catch(err => {
        return res.status(500).send({
            status : 500,
            message: "There is an error with the record: " + req.params.userId
        });
    });
};

exports.update = (req, res) => {
    
    if(!req.body) {
        return res.status(400).send({
            status : 400,
            message: "User registration can not be empty"
        });
    }

    delete req.body.id
    delete req.body.createdAt
    delete req.body.updatedAt
    
    User.findOneAndUpdate({ id : req.params.userId }, {
        $set : req.body
    },{ "fields": { "_id":0, "__v": 0 }, new: true, runValidators: true }).then(user => {

        if(!user) {
            return res.status(404).send({
                status : 404,
                message: "There is no active user record with the id: " + req.params.userId
            });
        }
        
        let response = {
            success : true,
            status : 200,
            data : user
        }
        res.send(response);

    }).catch(err => {
        let msg = (err.message.search("id_1") > -1) ? "id" : (err.message.search("email_1") > -1) ? "email" : null;
        res.status(500).send({
            status : 500,
            message: (msg) ? "The user "+msg+" already exists" : err.message
        });
    });
};