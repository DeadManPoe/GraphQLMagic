const Sequelize = require('sequelize');
const DbContext = require("./db");

const ArtistModel = DbContext.define('Artist', {
   name : {
       type : Sequelize.STRING,
       primaryKey : true
   }
});
module.exports = ArtistModel;