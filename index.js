var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

var issues = require('./data/issues.js').issues;

app.get('/Issues', cors(), (req, res) => {
    var data = JSON.parse(JSON.stringify(issues, null, 1),null,2);
    res.json(data);
});

app.get('/Issues/:id', (req, res) => {
    var issue = issues.find(x => x.id == parseInt(req.params.id));
    // console.log(issue);
    var data = JSON.parse(JSON.stringify(issue, null, 2));
    res.json(data);
});

app.post('/Issues',(req,res) =>{
    var issue ={};
    issue.description= req.body.description;
    issue.severity= req.body.severity;
    issue.status= req.body.status;
    issue.created= req.body.created;
    issue.resolved= req.body.resolved;
    issue.id= issues.length +1;
    issues.push(issue);
    console.log(issue);
    var data = JSON.parse(JSON.stringify(issue, null, 2));
    res.send(data);
});

app.listen(3000, 'localhost', () => {
    console.log('Server started at 3000');
});
