"use strict";

// packages
import mysql from "mysql";

// modules
import { DBHOST, DBNAME, DBPASS, DBUSER } from "../config/db.js"

// db parameters
const parameters = {
    host: DBHOST,
    user: DBUSER,
    password: DBPASS,
    database: DBNAME,
}

// database connection
export const db = mysql.createConnection(parameters);

// check connection
db.connect((err) => {
    err ? console.log(err) : console.log("mySql is connected");;
})




