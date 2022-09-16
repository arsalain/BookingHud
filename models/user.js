const Sequelize = require ('sequelize');
const sequelize = require("./db_cont");

const user = sequelize.define('user', {

    id: {
      type: Sequelize.DataTypes.STRING(20),
      primaryKey: true
    },
    name: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false
    }, 
    role: {
      type: Sequelize.DataTypes.STRING(20),
      allowNull: false
    }
},
    {
       freezeTableName: true,
       timestamps: false,
  }); 
 user.sync({alter: true}).then((data) =>{;
    console.log('User  synced successfully!');
  }).catch((error)=> {
    console.error('Error syncing the User!');
  });

module.exports=user;