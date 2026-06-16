import express from "express"
const app= express();
import cors from "cors";
import mysql from "mysql2"
import jwt from "jsonwebtoken"
app.use(cors())
app.use(express.json())
const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"Shanawaj@#$8123",
database:"jwt_auth"
})
db.connect((err)=>{
    if(err){
        console.log(err)
    }
    else
        console.log("db connection successful")
})
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})