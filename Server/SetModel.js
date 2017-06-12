const Sequelize = require('sequelize');
const DbContext = require("./db");

const SetModel = DbContext.define('Set',
    {
        name : {
            type : Sequelize.STRING,
            allowNull : false,
        },
        code : {
            type : Sequelize.STRING,
            allowNull: false,
            primaryKey : true
        }
    }
);
module.exports = SetModel;