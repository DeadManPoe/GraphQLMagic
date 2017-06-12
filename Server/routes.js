const express = require("express");
const router = express.Router();
const CardModel = require("./CardModel");
const bodyParser = require("body-parser");

const makeTextualFieldsLowerCase = (req, res, next) => {
    let jsonObj = req.query;
    let targetObj = {};
    for (let key in jsonObj){
        if (jsonObj.hasOwnProperty(key)){
            if (key === 'name' || key === 'text' || key === 'type'){
                targetObj[key] = jsonObj[key].toLowerCase();
            }
            else {
                targetObj[key] = jsonObj[key];
            }
        }
    }
    req.query = targetObj;
    next();
};
const stripNullFields = (req, res, next) => {
    let jsonObj = req.query;
    let targetObj = {};
    for (let key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
            let value = jsonObj[key];
            if (value !== "null") {
                targetObj[key] = value;
            }
        }
    }
    req.query = targetObj;
    next();
};
const getCard = (req, res) => {
    let jsonBody = req.query;

    CardModel.findAll({
        where: jsonBody
    }).then((results) => {
        let response = {
            "data" : results,
            "success" : results.length !== 0
        };
        res.json(response)
    })
};
router.use(bodyParser.urlencoded({ extended: true }));
router.use(stripNullFields);
router.use(makeTextualFieldsLowerCase);
router.get("/card", getCard);

module.exports = {
    router : router,
    makeTextualFieldsLowerCase : makeTextualFieldsLowerCase,
    stripNullFields : stripNullFields,
    getCard : getCard
};