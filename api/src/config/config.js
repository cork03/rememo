const dorenv = require("dotenv");

dorenv.config();

const config = {
  host: process.env.HOST,
  database: process.env.DATABASE_NAME || "",
  username: process.env.USER_NAME || "",
  password: process.env.DATABASE_PASSWORD,
  dialect: "mysql",
};

module.exports = {
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.host,
  dialect: "mysql",
  operatorsAliases: false,
};
