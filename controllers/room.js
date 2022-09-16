var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require.main.require ('./models/db_controller');


router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());


router.post('/addroom',function(req,res){

    db.addroom(req.body.name)
    if(db.addroom){
            req.flash('success', 'user succesfulyl registered')
            res.locals.mess = req.flash();
            res.redirect('/getroom')
        }
         else{

            res.render('admin/room.ejs',{list : results})
        }
    })


router.get('/getroom',(req,res,next)=>{
    db.getRoom(function(err,result){
        if(!err){
            res.render('admin/room.ejs',{list : result})
       }
        else{
            return res.status(500).json(err);
       }
})
})
router.get('/edit_room/:id',function(req,res){
    var id = req.params.id;
    db.getRoombyId(id,function(err,result){
        if(err)
        throw err;
    res.render('admin/editroom.ejs' ,{list : result});
        });
  });

router.post('/update_room/:id',function(req,res){
    var id = req.params.id;
    db.updateRoombyId(id,req.body.name)
            if(db.updateRoombyId){
            res.redirect('/getroom')
        }     
})
 
router.get('/delete_room/:id',function(req,res){
    var id = req.params.id;
        db.deleteRoombyId(id)
        if(db.deleteRoombyId){
            res.redirect('/getroom')
        }
        });                         

 module.exports=router;