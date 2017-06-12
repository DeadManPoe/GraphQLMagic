/**
 * Created by giorgiopea on 07/06/17.
 */
const CardModel = require("../Server/CardModel");
const module = require("../Server/routes");

test('cleans an object from fields with a string value equal to "null"',()=>{
   module.stripNullFields({
       field_a : "",
       field_b: "null"
   },{},()=>{

   })
});