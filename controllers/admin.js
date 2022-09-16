var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var db = require.main.require ('./models/db_controller');
var books =require('../models/book')
var user =require('../models/user')

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get("/login", async(req, res) => {
  const book = await books.findAll({where:{status:{[Op.ne]:"Pending"}}});
         res.render('admin/admin.ejs',{list : book})
});

router.post('/addbook',async(req,res)=>{
  let [data,created]= await books.findOrCreate({
    where: {   start_date: req.body.start_date,
      end_date: req.body.end_date,start_time: req.body.start_time,
      end_time: req.body.end_time },
    defaults:{
      type: req.body.type, 
      start_date: req.body.start_date, 
      end_date: req.body.end_date,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      reason: req.body.reason,
      userid: req.session.adminId,
      status: "Pending"
    }
  })
  if(created){
    req.flash('success', 'user succesfulyl registered')
    res.locals.inst = req.flash();
    console.log('1 book inserted');
    db.gettype(function(req,result){
     res.render('admin/add.ejs',{rows:result});
    })
  }
  else{
          req.flash('danger', 'user succesfulyl registered')
        res.locals.inste = req.flash();
        console.log('Data already exits');
        db.gettype(function(req,result){
          res.render('admin/add.ejs',{rows:result});
         })
  }
});

router.post('/search_all',function(req,res){
  var key = req.body.search;
 db.searchbook(key,function(err,result){
   console.log(result);
     if(err)
     throw err;
        res.render('admin/admin.ejs',{list : result})
 });
});

router.get("/add", (req, res) => {
    db.gettype(function(req,result){
      res.render("admin/add.ejs",{rows:result});
    })
});

router.get("/update1", async (req, res) => {
  const book = await books.findAll({where:{status:"Pending"}});
         res.render('admin/confirm.ejs',{list : book})
});
router.post('/update_book',async function(req, res){
  let status=req.body.status;

  const book = await books.findAll({where:{status:"Pending"}});
      var id =book[0].id;
            db.setstatus(id,status,function(err,results) {
  res.render('admin/confirm.ejs',{list : book})
      });
});

router.get('/edit_book/:id',function(req,res){
  var id = req.params.id;

  db.getBookbyId(id,function(err,result){
  res.render('admin/edit_book.ejs' ,{list : result});
      });
});
router.post('/update_book/:id',function(req,res){
  var id=req.params.id;
  db.updatebook(id,req.body.type,req.body.start_date,req.body.end_date,req.body.start_time,req.body.end_time,req.body.reason,req.body.status)
    if (db.updatebook) {
   db.getallbook(function(err,result){
    if(err)
     throw err;
    // res.render('admin/admin.ejs',{list : result})
    res.redirect("/login");
 });
  }
    else{
      return res.status(500).json(err);
    }
    });

    router.get('/delete_book/:id',function(req,res){
      books.destroy({
        where: {
           id:  req.params.id //this will be your id that you want to delete
        }
      }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
       if(rowDeleted === 1){
        res.redirect("/login")
          console.log('Deleted successfully');
        }
      }, function(err){
         console.log(err); 
      });
      })
       
 router.get("/add_user", (req, res) => {
        res.render("admin/adduser.ejs");
    });
router.post('/add_user',function(req,res){
      db.adduser(req.body.role,req.body.id,req.body.name,req.body.email,req.body.password);
    if(db.adduser){
        req.flash('success', 'user succesfulyl registered')
        res.locals.insta = req.flash();
        console.log('1 book inserted');
         res.render('admin/adduser.ejs');
    }else{
    res.render('admin/adduser.ejs');
    }
    });
router.get("/view_user", (req, res) => {
      db.getuser(function(err,result){
        if(err)
         throw err;
         res.render('admin/viewuser.ejs',{list : result})
     });
  });
    
router.get('/edit_user/:id',function(req,res){
  var id = req.params.id;

  db.getuserbyId(id,function(err,result){
  res.render('admin/edituser.ejs' ,{list : result});
      });
});
router.post('/update_user/:id',function(req,res){
  var id=req.params.id;
  db.updateuser(id,req.body.role,req.body.name,req.body.email,req.body.password)
    if (db.updateuser) {
      res.redirect("/view_user")
    }
 });

router.get('/delete_user/:id',function(req,res){
user.destroy({
  where: {
     id:  req.params.id //this will be your id that you want to delete
  }
}).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
 if(rowDeleted === 1){
  res.redirect("/view_user")
    console.log('Deleted successfully');
  }
}, function(err){
   console.log(err); 
});
})
module.exports = router;