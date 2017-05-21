const express = require("express");
const router = express.Router();
const CardModel = require("./CardModel");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

const stripNullFields = (req, res, next) => {
    jsonObj = req.query;
    targetObj = {};
    for (key in jsonObj) {
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
router.use(stripNullFields);

const getCard = (req, res) => {
    jsonBody = req.query;

    CardModel.findAll({
        where: jsonBody
    }).then((results) => {
        res.send(JSON.stringify(results))
    })
};
router.get("/card", getCard);

module.exports = router;