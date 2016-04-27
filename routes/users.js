var express = require('express');
var router = express.Router();

/* GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
console.log("user file");
/*
var pg = require("pg");
var fs=require("fs"); //read file

var client = new pg.Client({
    user: "kzjfulwnalafsn",
    password: "mwRj0alcqG8Jt3TCcexXGx0tjl",
    database: "d8irm9pe4mtfhc",
    port: 5432,
    host: "ec2-54-225-201-25.compute-1.amazonaws.com",
    ssl: true
});

//var conString = "postgres://kkzlwquiofbjyy:A5z8aW0j7pv2cNtiRN2OLJ3qI_@ec2-54-243-226-163.compute-1.amazonaws.com:5432/d3i2uja340u48s";

//var client = new pg.Client(conString);
client.connect();
// client.query('delete * from test_user;')
client.query('DROP table jsondata;')

client.query('CREATE TABLE IF NOT EXISTS jsondata(empid varchar(50) primary key, ename varchar(50), city varchar(50), county varchar(50));')
var obj;
fs.readFile('empdata.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);

    for(var i = 0; i < 100; i++) {
        client.query("INSERT INTO jsondata(empid, ename, city, county) values($1, $2, $3 ,$4)", [obj[i].empid, obj[i].emp_name, obj[i].city, obj[i].county], function (err, result) {
        if (err) {
            console.log(err);
        }
    });

    }


console.log("empdata inserted");



});*/

var mongoose = require ("mongoose");
var fs = require('fs');

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://gayatri:gayatri@ds021771.mlab.com:21771/heroku_fkkrl8s8';

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});

var userSchema = new mongoose.Schema({
    empid: Number,
    emp_name:String,
    city:String,
    county:String
});

var PUser = mongoose.model('data', userSchema);

/*
fs.readFile('empdata.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);

    for(var i = 0; i <=99; i++) {

        var detail = new PUser ({
            empid: obj[i].empid,
            emp_name:obj[i].emp_name,
            city:obj[i].city,
            county:obj[i].county
        });

        detail.save(function (err) {
            if (err) {
                console.log ('Error on save 1 !')
                console.log(err);
            }

        });
    }
    console.log('data inserted');

});
*/
// reading data

router.get('/', function(req, res, next) {

    var peopleJSON;
    res.contentType('application/json');

    var PUser = mongoose.model('data', userSchema);
    var query = PUser.find({empid: req.query.empid});

    query.exec(function(err, sheet) {
        if (err) {
            return res.send(400);
        }

        res.send(sheet);
    });
});


module.exports = router;