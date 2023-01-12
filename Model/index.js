const dbConfig = require('../Config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        port: dbConfig.PORT,
        timezone: '+09:00',
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./ModelObject/user.model")(sequelize, Sequelize);
db.diary = require("./ModelObject/diary.model")(sequelize, Sequelize);
db.emotion = require("./ModelObject/emotion.model")(sequelize, Sequelize);

module.exports = db;