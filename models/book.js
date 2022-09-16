const Sequelize = require ('sequelize');
const sequelize = require("./db_cont");

const books = sequelize.define('books', {

    type: {
      type: Sequelize.DataTypes.STRING
    },
    start_date: {
      type: Sequelize.DataTypes.STRING
    },
    end_date: {
      type: Sequelize.DataTypes.STRING
    },
    start_time: {
      type: Sequelize.DataTypes.STRING
    },
    end_time: {
      type: Sequelize.DataTypes.STRING
    },
    reason: {
      type: Sequelize.DataTypes.STRING
    },
    status:{
      type:Sequelize.DataTypes.STRING
    },
    userid:{
      type:Sequelize.DataTypes.STRING
    }
},
     {
        freezeTableName: true,
        timestamps: false
  }); 
 books.sync({alter:true}).then((data) =>{;
    console.log('books  synced successfully!');
  }).catch((error)=> {
    console.error('Error syncing the books ');
  });

module.exports=books;