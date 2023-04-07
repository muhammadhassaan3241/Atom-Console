require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DBUSERNAME,
    host: process.env.DBHOST,
    password: process.env.DBPASSWORD,
    dbname: process.env.DBNAME,
    port: process.env.PORT,
    session: process.env.SESSION_SECRET_KEY,
  },
  production: {
    username: process.env.DBUSERNAME,
    host: process.env.DBHOST,
    password: process.env.DBPASSWORD,
    dbname: process.env.DBNAME,
    port: process.env.PORT,
    session: process.env.SESSION_SECRET_KEY,
  },
};
