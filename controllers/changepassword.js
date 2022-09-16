var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require ('./models/db_controller');
var books =require('../models/book')

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.post('/changePassword', function(req, res){
    let oldpassword=req.body.oldpassword;

   let newpassword=req.body.newpassword;

   let id =req.session.userId;

    db.checkpassword(oldpassword,id, function(err, results) {
        if (results.length > 0) {
       
          var id =results[0].id;
              db.setpassword(id,newpassword,function(err,result1) {
if (!err) {
   req.flash('success', 'user succesfulyl registered')
   res.locals.cad = req.flash();
                 res.render('user',{list:results});
               }
                 else {
                  return res.status(500).json(err);
                    }
                });
           }
    else {
      req.flash('success', 'user succesfulyl registered')
      res.locals.mess = req.flash();
      res.render('user');
    }

            });
})
router.post('/change', function(req, res){
  let oldpassword=req.body.oldpassword;

 let newpassword=req.body.newpassword;
 //var id = req.params.id;
 let id = req.session.adminId
  db.checkpassword(oldpassword,id, async function(err, results) {
      if (results.length > 0) {
     
        var id =results[0].id;
            db.setpassword(id,newpassword,function(err,result1) {
if (!err) {
 req.flash('success', 'user succesfulyl registered')
 res.locals.cad = req.flash();
 db.getallbook(function(err,result){
  if(err)
   throw err;
   res.render('admin/admin.ejs',{list : result})
});
             }
               else {
                return res.status(500).json(err);
                  }
              });
         }
  else {
    req.flash('success', 'user succesfulyl registered')
    res.locals.mess = req.flash();
    const book = await books.findAll();
       res.render('admin/admin.ejs',{list : book})
  
  }

          });
})
module.exports =router;
