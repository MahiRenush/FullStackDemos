var express= require('express');
var app= express();
var bodyParser= require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors= require('cors');

var issues= require('./data/issues.js').issues;

app.use(logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// app.options('*',function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
//     next();
// });

app.get('/Issues', (req,res)=>{
    var data= JSON.stringify(issues, null, 2);
    console.log(data);
    res.send(data);
});
app.get('/Issues/:id', (req,res)=>{
    let issue= issues.find(x=> x.id==parseInt(req.params.id));
    var data= JSON.stringify(issue, null, 2);
    console.log(data);
    res.send(data);
});

app.post('/Issues', (req, res)=>{
    var issue={ };
    issue.description= req.body.description;
    issue.severity= req.body.severity;
    issue.status= req.body.status;
    issue.created= req.body.created;
    issue.resolved= req.body.resolved;

    let countOfRecords= issues.length;
    // issue.id=(countOfRecords+1);
    let lastID= issues[countOfRecords-1].id;
    issue.id= lastID+ 1;

    issues.push(issue);
    var data= JSON.parse(JSON.stringify(issue));
    console.log(req.body);
    res.send(issues);
})

app.put('/Issues/:id', (req, res)=>{
    var issue={ };
    issue.id= req.params.id;
    issue.description= req.body.description;
    issue.severity= req.body.severity;
    issue.status= req.body.status;
    issue.created= req.body.created;
    issue.resolved= req.body.resolved;
    existingIssueIndex= issues.indexOf(issues.find(x=> x.id==parseInt(req.params.id)));
    issues.splice(existingIssueIndex,1,issue);
    res.send(issue);
})

app.delete('/Issues/:id', (req, res) =>{
    existingIssueIndex= issues.indexOf(issues.find(x=> x.id==parseInt(req.params.id)));
    issues.splice(existingIssueIndex,1);
    // _.remove(issues, {id: this.id});
    
    res.send(issues);
})

app.listen(3000,'localhost',()=>{
    console.log('Server started at 3000');
});
