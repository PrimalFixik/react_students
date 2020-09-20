const express = require('express');
const router = express.Router();
const cors = require("cors");
var dataAccessAdapter = require('./mongoUtil');

var summaryRating = 0;
var numberOfStudents = 0;


router.use(cors());

router.get('/', function(req, res) {
    try {
        const client = dataAccessAdapter.getDb();
        client.db("universityDB").collection("groups").find({}).toArray(function (err, groups) {
            client.db("universityDB").collection("students").find({}).toArray(function (err, students) {
                groups.forEach(function (item, i, groups) {
                    summaryRating = 0;
                    numberOfStudents = 0;
                    item.amountRating = 0;
                    item.count = 0;
                    item.countDebtors = 0;
                    students.forEach(function (children, i, childrens) {
                        if(item.id === children.group){
                            summaryRating += children.rating;
                            item.count += 1;
                            numberOfStudents += 1;
                            item.amountRating = summaryRating / numberOfStudents;
                            if(children.isDebtor === "Yes"){
                                item.countDebtors += 1;
                            }
                        }
                    });
                });
                res.send(groups);
            });
        });
    } catch(e) {
        console.error(e)
    }
});

router.get('/:id', (req, res) => {
    let id = req.params.id || null;
    const client = dataAccessAdapter.getDb();
    client.db("universityDB").collection("groups").findOne({id: String(id)}, function (err, group) {
        client.db("universityDB").collection("students").find({}).toArray(function (err, students) {
            summaryRating = 0;
            numberOfStudents = 0;
            group.amountRating = 0;
            group.count = 0;
            group.countDebtors = 0;
            students.forEach(function (children, i, childrens) {
                if(group.id === children.group){
                    summaryRating += children.rating;
                    item.count += 1;
                    numberOfStudents += 1;
                    item.amountRating = summaryRating / numberOfStudents;
                    if(children.isDebtor === "Yes"){
                        group.countDebtors += 1;
                    }
                }
            });
            console.log(group);
            res.send(group);
        });
    });
});

router.post("/", cors(), function(req, res) {
    try {
        if(!req.body){
            return res.sendStatus(400);
        }
        let { id } = req.body;
        const group = { id: id };
        const client = dataAccessAdapter.getDb();
        client.db("universityDB").collection("groups").insertOne(group, function (err, result) {
            client.db("universityDB").collection("groups").find({}).toArray(function (err, groups) {
                client.db("universityDB").collection("students").find({}).toArray(function (err, students) {
                    groups.forEach(function (item, i, groups) {
                        summaryRating = 0;
                        numberOfStudents = 0;
                        item.amountRating = 0;
                        item.count = 0;
                        item.countDebtors = 0;
                        students.forEach(function (children, i, childrens) {
                            if(item.id === children.group){
                                summaryRating += children.rating;
                                item.count += 1;
                                numberOfStudents += 1;
                                item.amountRating = summaryRating / numberOfStudents;
                                if(children.isDebtor === "Yes"){
                                    item.countDebtors += 1;
                                }
                            }
                        });

                    });
                    res.send(groups);
                });
            });
        })
    } catch(e) {
        console.error(e)
    }
});

router.put("/", function(req, res) {
    try {
        if(!req.body){
            return res.sendStatus(400);
        }
        let { id, oldID} = req.body;
        const client = dataAccessAdapter.getDb();
        client.db("universityDB").collection("groups").findOneAndUpdate({id: oldID}, {$set: {id: id}}, {returnOriginal: false}, function (err, result) {
            client.db("universityDB").collection("groups").find({}).toArray(function (err, groups) {
                client.db("universityDB").collection("students").find({}).toArray(function (err, students) {
                    groups.forEach(function (item, i, groups) {
                        summaryRating = 0;
                        numberOfStudents = 0;
                        item.amountRating = 0;
                        item.count = 0;
                        item.countDebtors = 0;
                        students.forEach(function (children, i, childrens) {
                            if(item.id === children.group){
                                summaryRating += children.rating;
                                item.count += 1;
                                numberOfStudents += 1;
                                item.amountRating = summaryRating / numberOfStudents;
                                if(children.isDebtor === "Yes"){
                                    item.countDebtors += 1;
                                }
                            }
                        });
                    });
                    res.send(groups);
                });
            });
        })
    } catch(e) {
        console.error(e)
    }
});

router.delete("/", function(req, res){
    try {
        if(!req.body){
            return res.sendStatus(400);
        }
        let { id } = req.body;
        const client = dataAccessAdapter.getDb();
        client.db("universityDB").collection("groups").findOneAndDelete({id: id}, function (err, result) {
            client.db("universityDB").collection("groups").find({}).toArray(function (err, groups) {
                client.db("universityDB").collection("students").find({}).toArray(function (err, students) {
                    groups.forEach(function (item, i, groups) {
                        summaryRating = 0;
                        numberOfStudents = 0;
                        item.amountRating = 0;
                        item.count = 0;
                        item.countDebtors = 0;
                        students.forEach(function (children, i, childrens) {
                            if(item.id === children.group){
                                summaryRating += children.rating;
                                item.count += 1;
                                numberOfStudents += 1;
                                item.amountRating = summaryRating / numberOfStudents;
                                if(children.isDebtor === "Yes"){
                                    item.countDebtors += 1;
                                }
                                else{
                                    item.countPractice += 1;
                                }
                            }
                        });
                    });
                    console.log(result.value);
                    res.send(groups);
                });
            });
        })
    } catch(e) {
        console.error(e)
    }
});

module.exports = router;