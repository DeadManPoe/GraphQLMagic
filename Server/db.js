//Sets the connection with the pgres db
const Sequelize = require("sequelize");

const dbContext = new Sequelize(
    'mtg', 'client', 'client',
    {
        host: 'localhost',
        port: 5433,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    }
);
console.log("dsdsd");
dbContext
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = dbContext;