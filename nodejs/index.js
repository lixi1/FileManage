var http = require('http');
var url = require('url');
var mysql = require('mysql');
var querystring = require("querystring");
var uuid = require('node-uuid');
var bodyParser = require('body-parser');
var cors = require('cors')

const express = require('express');
var app = express();

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "agent"
});

connection.connect();

app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: false}));

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// app.all('*', function(req, res, next) {
//     console.log(req.headers.origin)
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Credentials", true)
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// })

// 根据ID查询文章
app.get('/getFile', function(req, res, next) {
    const query = req.query.id ? 
        `SELECT * from agentlists where id = '${req.query.id}'`
        :'SELECT * from agentlists'

    connection.query(query, function (error, results, fields) {
        if (error) {
            next(error)
        } else {
            res.send(JSON.stringify(results));
        }
    })
})

// 添加文章
app.post('/addFile', function(req, res, next) {
    const query = `INSERT INTO agentlists (id, title, content)
        values ('${uuid.v1().replace(/-/g,"")}', '${req.body.title}','${req.body.content}');`
    connection.query(query, function (error, results, fields) {
        if (error) {
            next(error)
        } else {
            res.send(JSON.stringify(results));
        }
    })
})

app.post('/updateFile', function(req, res, next) {
    const query = `UPDATE agentlists set title='${req.body.title}', content='${req.body.content}' where id='${req.body.id}'`;
    connection.query(query, function(error, results, fields) {
        if(error){
            next(error)
        } else {
            res.send(JSON.stringify(results))
        }
    })
})

// 删除文章
app.post("/delFile", function(req, res, next) {
    const query = `DELETE from agentlists where id='${req.body.id}'`;
    connection.query(query, function(error, results, fields) {
        if(error){
            next(error)
        } else {
            res.send(JSON.stringify(results))
        }
    })
})


app.listen(8080)
