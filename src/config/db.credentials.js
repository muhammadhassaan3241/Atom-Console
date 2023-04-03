import dotenv from "dotenv";
dotenv.config();

// db parameters
export const DBHOST = process.env.DBHOST;
export const DBUSER = process.env.DBUSER;
export const DBPASS = process.env.DBPASS;
export const DBNAME = process.env.DBNAME;