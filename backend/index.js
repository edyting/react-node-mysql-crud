import express from "express";
import mysql from "mysql";
import cors from "cors"


const app = express();
// database connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nodetuts"
})

// middleware to accept json format
app.use(express.json())

// adding cors middleware
app.use(cors())

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
    const query = "INSERT INTO `books` (`title`, `description`, `cover`,`price`) VALUES (?)"

    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price
    ];

    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("book submitted successfully");
    })
})

// delete
app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id;

    const query = "DELETE FROM books WHERE id = ? "
    db.query(query,[bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("book deleted successfully");
    })
})

// update
app.put("/books/:id",(req,res)=>{
    const bookId = req.params.id;

    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price
    ];

    const query = "UPDATE books SET `title` = ? ,`description` = ? ,`price` = ?,`cover` = ? WHERE id = ?";
    db.query(query,[...values,bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("book updated successfully");
    })
})


app.listen(5000,console.log("listening on port 5000..."))