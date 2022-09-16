var mysql = require('mysql');

var con = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'root',
database: 'bookingsystem'
});

con.connect(function(err) {
if(err) {
throw err;
}else{
console.log('Connected')
}
})
module.exports.adduser = function (
  role,
  id,
  name,
  email,
  password,
  callback
) {
  var query =
    "INSERT INTO `user`(`role`,`id`,`name`,`email`,`password`) values ('" +
    role +
    "','" +
    id +
    "','" +
    name +
    "','" +
    email +
    "','" +
    password +
    "')";
  con.query(query, callback);
  console.log(query);
};
module.exports.checkpassword = function (password,id, callback) {
    var query = "select *from user where  password='"+password+"' and id='"+id+"'";
    con.query(query, callback);
    console.log(query);
  };
  module.exports.findOne = function (email, callback) {
    var query = "select *from user where email='" + email + "'";
    con.query(query, callback);
    console.log(query);
  };
module.exports.setpassword = function (id, newpassword, callback) {
    var query =
      "update user set password='" + newpassword + "' where id='"+id+"'";
    con.query(query, callback);
    console.log(query);
  };
  module.exports.addbook = function (
    type,
    start_date,
    end_date,
    start_time,
    end_time,
    reason,
    status,
    isuser,
    callback
  ) {
    var query =
      "INSERT INTO `books`(`type`,`start_date`,`end_date`,`start_time`,`end_time`,`reason`,`status`,`isuser`) values ('" +
      type +
      "','" +
      start_date +
      "','" +
      end_date +
      "','" +
      start_time +
      "','" +
      end_time +
      "','" +
      reason +
      "','"+ status + "','"+ 
      isuser +"')";
    con.query(query, callback);
    console.log(query);
  };
  module.exports.setstatus = function (id, status, callback) {
    var query =
      "update books set status='" + status + "' where id='" + id + "' ";
    con.query(query, callback);
    console.log(query);
  };
  module.exports.getbookbyuser = function (userid,callback) {
    var query = "select * from books where userid='"+userid+"'";
    con.query(query, callback);
  };
  // module.exports.getbookbyun = function (status,callback) {
  //   var query = "select * from books where status='"+Approved+"'";
  //   con.query(query, callback);
  // };
  module.exports.searchbook = function (userid,key, callback) {
    var query = 'SELECT  *from books where type like "%' + key + '%" ';
    con.query(query, callback);
    console.log(query);
  };
  module.exports.searchbook1 = function (userid,key, callback) {
    var query = 'SELECT  *from books where type like "%' + key + '%" AND userid:"'+userid+"'";
    con.query(query, callback);
    console.log(query);
  };
  module.exports.getBookbyId = function (id, callback) {
    var query = "select * from books where id ='" +id+"'";
    con.query(query, callback);
  };
  module.exports.updatebook = function (
    id,
    type,
    start_date,
    end_date,
    start_time,
    end_time,
    reason,
    callback
  ) {
    var query =
      "update books set type='"+
      type +
      "',start_date='" +
      start_date +
      "',end_date='" +
      end_date +
      "',start_time='" +
      start_time +
      "',end_time='" +
      end_time +
      "',reason='" +
      reason +
      "' where id="+id;
    con.query(query, callback);
    console.log(query);
  };
  module.exports.deletebookbyId = function (id, callback) {
    console.log("i m here");
    var query = "delete from book where id=" + id;
    con.query(query, callback);
  };
  module.exports.getuser = function (callback) {
    var query = "select * from user order by id ";
    con.query(query, callback);
  };
  module.exports.getuserbyId = function (id, callback) {
    var query = "select * from user where id ='" +id+"'";
    con.query(query, callback);
  };
  module.exports.updateuser = function (
    id,
    role,
    name,
    email,
    password,
    callback
  ) {
    var query =
      "update user set role='"+
      role +
      "',id='" +
      id +
      "',name='" +
      name +
      "',email='" +
      email +
      "',password='" +
      password +
      "' where id='"+id+"'";
    con.query(query, callback);
    console.log(query);
  };
  module.exports.gettype = function (callback) {
    var query = "select * from type";
    con.query(query, callback);
  };
  module.exports.deleteuserbyId = function (id, callback) {
    console.log("i m here");
    var query = "delete from user where id=" + id;
    con.query(query, callback);
  };
  module.exports.addroom =  function (
    name,callback
  ) {
    var query =
      "INSERT INTO `type`(`name`) values ('" +
      name +
      "')";
    con.query(query, callback);
    console.log(query);
  };
  module.exports.getRoom = function ( callback) {
    var query = "select * from type order by id ";
    con.query(query, callback);
  };
  module.exports.getRoombyId = function (id, callback) {
    var query = "select * from type where id ='" +id+"'";
    con.query(query, callback);
  };
  module.exports.updateRoombyId = function (
    id,
    name,
    callback
  ) {
    var query =
      "update type set name='"+
      name +
      "' where id="+id;
    con.query(query, callback);
    console.log(query);
  };
  module.exports.deleteRoombyId = function (id, callback) {
    var query = "delete from type where id=" + id;
    con.query(query, callback);
  };