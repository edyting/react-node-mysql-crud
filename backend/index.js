import express from "express";
import mysql from "mysql";



const app = express();
// database connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nodetuts"
})

// if there is an authentication problem check database configuration detatils

app.get("/",(req,res)=>{
    res.json("Hello There")
});

app.get("/books",(req,res)=>{
    const query = "SELECT * FROM books";
    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })

})

// adding books
app.post("/books",(req,res)=>{
    const query = "INSERT INTO `books` (`title`, `description`, `cover`) VALUES (?)"

    const values = ["title from backend","description from backend","cover picture from backend"];

    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("book submitted successfully");
    })
})



app.listen(5000,console.log("listening on port 5000..."))