const Sequelize = require('sequelize');
const DbContext = require("./db");
const SetModel = require("./SetModel");
const ArtistModel = require("./ArtistModel");
const CardModel = DbContext.define('Card',{
    name : {
        type : Sequelize.STRING,
        allowNull : false,
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
    },
    multiverse_id : {
        type : Sequelize.INTEGER,
        allowNull : false,
    },
    id : {
        type : Sequelize.STRING,
        primaryKey : true
    },
    flavour_text :{
        type : Sequelize.TEXT,
        allowNull : false
    }

});
CardModel.belongsTo(SetModel, { foreignKey : {
    name : 'set',
    allowNull : false
}});
//CardModel.belongsTo(ArtistModel, {foreignKey: {
//    name : 'artist',
//    allowNull : false
//}});
module.exports = CardModel;