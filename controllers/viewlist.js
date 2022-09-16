var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require ('express-session');
var books =require('../models/book')
var db = require.main.require ('./models/db_controller');

router.use(session({

  secret: 'secret',
  resave : true ,
  saveUninitialized : true ,
  cookie:{maxAge:60000}
}));
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

// router.post('/add_book',function(req,res){
//   let isuser=true;

//   db.addbook1(req.body.type,req.body.start_date,req.body.end_date,req.body.start_time,req.body.end_time,req.body.reason,req.body.status,isuser )
//   if(db.addbook1){
//     req.flash('success', 'user succesfulyl registered')
//     res.locals.inst = req.flash();
//     console.log('1 book inserted');
//      res.render('user.ejs',{list:res});
// }else{
// res.render('user.ejs',{list:res});
// }
// });
router.post('/add_book',async(req,res)=>{
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
      userid: req.session.userId,
      status: "Pending"
    }
  })
  if(created){
  req.flash('success', 'user succesfulyl registered')
      res.locals.inst = req.flash();
      console.log('1 book inserted');
      res.render('user.ejs',{list:res})
  }
  else{
          req.flash('danger', 'user succesfulyl registered')
        res.locals.inste = req.flash();
        console.log('Data already exits');
        res.render('user.ejs',{list:res});
  }
});

router.get('/view_list',function(req,res){

    var userid=req.session.userId
    db.getbookbyuser(userid,function(err,result){
      if(err)
      throw err;
        res.render('view_list.ejs',{list : result})  
      
    });
  });


router.post('/search',function(req,res){
    var key = req.body.search;
   db.searchbook1(key,function(err,result){
     console.log(result);
     if(err)
     throw err;
       // if(req.cookies['name'] == null){
          res.render('view_list.ejs',{list : result});
   //     }else{
       //   res.render('admin/admin.ejs',{list : result})
      //  }
   });
});
router.get("/back", (req, res) => {
  db.gettype(function(req,result){
    res.render('user',{rows:result});
   })
});   

module.exports = router;