const Sequelize = require ('sequelize');
var express = require('express');

const sequelize = new Sequelize('bookingSystem','root','root',{
    dialect: 'mysql'
})

module.exports=sequelize;
