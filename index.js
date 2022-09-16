var express =require('express');
var session = require('express-session');
var cookie = require('cookie-parser');
var path = require('path');
var ejs = require( 'ejs');
var flush=require('connect-flash');
var bodyParser = require('body-parser');
const http =require('http');
var changepassword=require('./controllers/changepassword')
var login=require('./controllers/login');
var view_list = require('./controllers/viewlist');
var admin=require('./controllers/admin');
var app=express();
var dbs=require('./models/db_cont')
var room=require('./controllers/room');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const server=http.createServer(app);

    dbs.authenticate().then(() =>{;
    console.log('Connection has been established successfully.');
  }).catch((error)=> {
    console.error('Unable to connect to the database:', error);
  })

//app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookie());

app.use(session({
    secret: 'secret123',
    cookie: { maxAge : 600000},
    resave: true,
    saveUninitialized: true
    }));
app.use(flush());

const PORT = process.env.PORT || 3000
server.listen (PORT, ()=>console.log(`server running on port ${PORT}`))

app.use('/',login);
app.use('/',changepassword);
app.use('/', view_list);
app.use('/',admin);
app.use('/',room);

module.exports = app;