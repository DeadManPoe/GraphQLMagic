const CardModel = require('./CardModel');
const fs = require("fs");
const path = require("path");
const jsonSource = fs.readFileSync(path.join(__dirname, "AllCards.json"));
const jsonObj = JSON.parse(jsonSource);
/**
 * Drops the 'Cards' table of the DB, if already present, and fills the table with data taken from
 * the AllCards.json file
 */
CardModel.sync({force: true}).then(() => {
    for (let key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
            let value = jsonObj[key];
            if (value.colors === undefined){
                value.colors = []
            }
            if (value.text === undefined){
                value.text = ''
            }
            if (value.manaCost === undefined){
                value.manaCost = 'NONE'
            }
            if (value.power === undefined){
                value.power = 'NONE'
            }
            if (value.toughness === undefined){
                value.toughness = 'NONE'
            }
            CardModel.create({
                name: value.name.toLowerCase(),
                text: value.text.toLowerCase(),
                cmc: value.cmc | 0,
                mana_cost: value.manaCost,
                color: value.colors.reduce((curr,accumulator) => {
                    return curr + accumulator
                },''),
                type: value.type.toLowerCase(),
                power: value.power,
                toughness: value.toughness
            }).catch((err)=>{
                console.log(err);
                process.exit(-1);
            });
        }
    }
});