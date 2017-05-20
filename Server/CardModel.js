const Sequelize = require('sequelize');
const DbContext = require("./db");

const CardModel = DbContext.define('Card',{
    name : {
        type : Sequelize.STRING,
        allowNull : false,
        primaryKey : true
    },
    text : {
        type : Sequelize.TEXT,
        allowNull : false
    },
    type : {
        type : Sequelize.STRING,
        allowNull: false
    },
    cmc : {
        type : Sequelize.INTEGER,
        allowNull : false
    },
    mana_cost : {
        type : Sequelize.STRING,
        allowNull : false
    },
    color : {
        type : Sequelize.STRING,
        allowNull : false
    },
    power : {
        type : Sequelize.STRING,
        allowNull : false
    },
    toughness : {
        type : Sequelize.STRING,
        allowNull : false
    }
});
module.exports = CardModel;