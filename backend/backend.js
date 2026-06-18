import express from "express";
import mysql from "mysql2"
import cors from "cors"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { error } from "console";
const app = express()
import cookieParser from "cookie-parser";
app.use(cookieParser());
app.use(cors({
     origin: "http://127.0.0.1:3001",
    credentials: true
}))
app.use(express.json())
import verifyUser from "./middleware.js";
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
app.get("/user",async (req,res)=>{
    try{
        const [users]=await db.promise().query("select id,email,name,is_active from jwt where is_active =1 ") 
        res.json(users);  
    }
    catch(err){
console.log(err)
    }
})
app.get("/userprofile",verifyUser,async (req,res)=>{
    try{
           const [users]=await db.promise().query("select id,email,name,is_active from jwt where id=? ",[id]) 
        res.json(users);
    }
    catch(err){
        return res.status(500).send(err)
    }
})

app.post("/adduserdata",async (req,res)=>{
    try{
              const {name,email,password}=req.body;
               if(!email || !password || !name){
          return res.status(500).send("fill all the feilds")
        }
           if(!email.includes("@")){
           return res.status(500).send("enter valid email")
          }
    const cryptedhash = await bcrypt.hash(password,10);
    const [rows] =await db.promise().query("select email from jwt where email = ?",[email])
    if(rows.length >0){
        return res.status(500).send("user already exists");
    }
    const [users] = await db.promise().query("insert into jwt (email,name,password) values(?,?,?)",[email,name,cryptedhash])
    res.send("user registered successfully")
    }
    catch(err){
       return res.status(500).send(err);
    }
  
}) 
app.post("/loginuser", async (req,res)=>{
    try{
        const {email,password}=req.body;
         if(!email || !password ){
          return res.status(500).send("fill all the feilds")
        }
        if(!email.includes("@")){
            return res.status(500).send("please write valid email id ")
        }
    const [compare] = await db.promise().query("select id,password from jwt where email = ? ",[email]);
    if(compare.length === 0){
    return res.status(404).send("User not found");
      }
    if(await bcrypt.compare( password,compare[0].password)){

    const token = jwt.sign(
        { id: compare[0].id },
        "mysecretkey",
        { expiresIn: "1d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });

    res.send("logged in successfully");
}
else{
    res.status(401).send("wrong credentials");
}
   
    }
    catch(err){
       return res.status(500).send(err);
    }
    
})

app.put("/updateuser",verifyUser,async (req,res)=>{
    try{
        const {email,oldpassword,newpassword}=req.body;
         if(!email || !oldpassword ||!newpassword){
          return res.status(500).send("fill all the feilds")
        }
        const [registerdpassword]=await db.promise().query("select password,is_active from jwt where id = ?",[id])
        const [{password,is_active}]=registerdpassword
        if(is_active){
        if(await bcrypt.compare(oldpassword,password)){
            const cryptedpassword =await bcrypt.hash(newpassword,10)
            const [newuserpassword]=await db.promise().query("update jwt set password = ? where email = ?",[cryptedpassword,email])
            res.send("password change successfully")
        }
        else{
            return res.status(500).send("wrong credentials")
        }}
        else{
            return res.status(500).send("user not found")
        }
        
    }
    catch(err){
       return res.status(500).send(err);
    }
}) 

app.delete("/deleteuser",verifyUser,async (req,res)=>{
    try{
        const {email,password}=req.body;
         if(!email || !password){
          return res.status(500).send("fill all the feilds")
        }
        const [rows]=await db.promise().query("select password from jwt where id = ? ",[id]);
        if(rows.length === 0){
            return res.status(404).send("not a user or user not exists")
        }
        if(await bcrypt.compare(password,rows[0].password)){
            const [deleteuser] = await db.promise().query("update jwt set is_active = 0 where email = ? ",[email])
            return res.send("deleted successfully")
        }
        else{
            return res.status(401).send("wrong credentials")
        }
    }
    catch(err){
   return res.status(500).send(err);
    }
})


app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})