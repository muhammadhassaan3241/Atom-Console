"use strict";
const mysql = require("mysql");

const { development } = require("../config/config");

const parameters = {
    host: development.host,
    user: development.username,
    password: development.password,
    database: development.dbname,
}

const DB = mysql.createConnection(parameters);

DB.connect((err) => {
    err ? console.log(err) : console.log("mySql is connected");;
})

module.exports = DB;


