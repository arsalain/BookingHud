var express = require('express');
var mysql =require('mysql');
var router = express.Router();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require ('express-session');
var db = require.main.require ('./models/db_controller');
var user =require('../models/user')
var books =require('../models/book')

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

//let router = express.Router();
router.get('/', function(req ,res){
    res.render('login.ejs');
});


router.use(session({

    secret: 'secret123',
    resave : true ,
    saveUninitialized : true ,
    cookie:{maxAge:600000}
}));

router.post('/login', async(req, res) =>{
    let id = req.body.id;
    let password = req.body.password;
    const users = await user.findOne({where:{id:id,password:password}});

    if(!users ){
        req.flash('success', 'user succesfulyl registered')
        res.locals.messag = req.flash();
        res.render('login');
    } else if (users.role == 'user') {
        req.session.userId = users.id;
        db.gettype(function(req,result){
            res.render('user',{rows:result});
           })
              }
              else if (users.role == 'Admin') {
                req.session.adminId = users.id;
                                const book = await books.findAll();
                                 res.render('admin/admin.ejs',{list :book}) 
                        }
                        else {
                            return res.status(400).json({ message: "Something went wrong,please try again later" });
                        }

            })


router.get("/logout", (req, res) => {
    res.redirect("/");
});




module.exports = router;