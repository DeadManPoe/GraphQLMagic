const SetModel = require("./SetModel");
const CardModel = require("./CardModel");
const fs = require("fs");
const path = require("path");
const jsonSource = fs.readFileSync(path.join(__dirname, "AllSets.json"));
const jsonObj = JSON.parse(jsonSource);
let negativeCounter = 0;

CardModel.drop().then(()=>{

}).catch(()=>{

});

const fillSet = (parsedJson) => {
    SetModel.sync({force : true}).then(()=>{
        for (let key in parsedJson){
            if (parsedJson.hasOwnProperty(key)){
                let setObject = parsedJson[key];
                let cards = setObject.cards;
                SetModel.create({
                    name : setObject.name,
                    code : setObject.code
                }).catch((err)=>{
                    console.error(err);
                    process.exit(-1);
                });
                fillCards(cards,setObject.code);
            }
        }
    })

};
const fillCards = (cards, set)=>{
    CardModel.sync().then(() => {
        for (let key in cards) {
            if (cards.hasOwnProperty(key)) {
                let value = cards[key];
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
                if (value.flavour === undefined){
                    value.flavour = 'NONE'
                }
                if (value.multiverseid === undefined){
                    value.multiverseid = -1;
                }
                CardModel.create({
                    id : value.id,
                    name: value.name.toLowerCase(),
                    text: value.text.toLowerCase(),
                    cmc: value.cmc | 0,
                    mana_cost: value.manaCost,
                    color: value.colors.reduce((curr,accumulator) => {
                        return curr + accumulator
                    },''),
                    type: value.type.toLowerCase(),
                    power: value.power,
                    toughness: value.toughness,
                    multiverse_id : value.multiverseid,
                    flavour_text : value.flavour,
                    //artist : value.artist,
                    set : set
                }).catch((err)=>{
                    console.log(err);
                    process.exit(-1);
                });
            }
        }
    });
};
fillSet(jsonObj);