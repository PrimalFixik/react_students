const express = require('express');
const router = express.Router();
const cors = require("cors");
var dataAccessAdapter = require('./mongoUtil');

router.use(cors());

router.get('/', function(req, res) {
    try {
        const client = dataAccessAdapter.getDb();
        client.db("universityDB").collection("students").find({}).toArray(function (err, students) {
            res.send(students);
        });
    } catch(e) {
        console.error(e)
    }
});

router.get('/:id', (req, res) => {
    let id = req.params.id || null;
    const client = dataAccessAdapter.getDb();
    client.db("universityDB").collection("students").find({group: String(id)}).toArray(function (err, students) {
        res.send(students);
    });
});

router.post("/", cors(), function(req, res) {
    try {
        if(!req.body){
            return res.sendStatus(400);
        }
        let { id, studentName, rating, isDebtor, age, group, parentID } = req.body;
        const student = {id: id, studentName: studentName, rating: rating, isDebtor: isDebtor, age: age, group: group};

        if(parentID !== undefined){
            const client = dataAccessAdapter.getDb();
            client.db("universityDB").collection("students").insertOne(student, function (err, result){
                client.db("universityDB").collection("students").find({group: parentID}).toArray(function (err, students) {
                    console.log(result.ops[0]);
                    res.send(students);
                });
            });
        }
        else{
            const client = dataAccessAdapter.getDb();
            client.db("universityDB").collection("students").insertOne(student, function (err, result){
                client.db("universityDB").collection("students").find({}).toArray(function (err, students) {
                    console.log(result.ops[0]);
                    res.send(students);
                });
            });
        }
    } catch(e) {
        console.error(e)
    }
});

router.put("/", function(req, res) {
    try {
        if(!req.body){
            return res.sendStatus(400);
        }
        let { id, studentName, rating, isDebtor, age, group, oldID, parentID } = req.body;
        if(parentID !== undefined){
            const client = dataAccessAdapter.getDb();
            client.db("universityDB").collection("students").findOneAndUpdate({id: oldID}, { $set: { id: id, studentName: studentName, rating: rating, isDebtor: isDebtor, age: age, group: group }},
                {returnOriginal: false }, function(err, result){
                    client.db("universityDB").collection("students").find({group: parentID}).toArray(function (err, students) {
                        console.log(result);
                        res.send(students);
                    });
                })
        }
        else{
            const client = dataAccessAdapter.getDb();
            client.db("universityDB").collection("students").findOneAndUpdate({id: oldID}, { $set: { id: id, studentName: studentName, rating: rating, isDebtor: isDebtor, age: age, group: group }},
                {returnOriginal: false }, function(err, result){
                    client.db("universityDB").collection("students").find({}).toArray(function (err, students) {
                        console.log(result);
                        res.send(students);
                    });
                })
        }
    } catch(e) {
        console.error(e)
    }
});

router.delete("/", function(req, res){
    try {
        if(!req.body){
            return res.sendStatus(400);
        }
        let { id, parentID } = req.body;
        if(parentID !== undefined){
            const client = dataAccessAdapter.getDb();
            client.db("universityDB").collection("students").findOneAndDelete({id: id}, function(err, result){
                client.db("universityDB").collection("students").find({group: parentID}).toArray(function (err, students) {
                    console.log(result.value);
                    res.send(students);
                });
            })
        }
        else{
            const client = dataAccessAdapter.getDb();
            client.db("universityDB").collection("students").findOneAndDelete({id: id}, function(err, result){
                client.db("universityDB").collection("students").find({}).toArray(function (err, students) {
                    console.log(result.value);
                    res.send(students);
                });
            })
        }

    } catch(e) {
        console.error(e)
    }
});

module.exports = router;