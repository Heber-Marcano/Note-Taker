const express = require("express")
const path = require("path")
const fs = require("fs");
const uniqid = require("uniqid")

const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"))
} )
app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname,"./public/notes.html"))
} )

app.get("/api/notes",(req,res) => {
    fs.readFile("./db/db.json",(err,results) => {
        let notes;
        err ? console.log(err) : notes = JSON.parse(results)
        console.log(notes)
        res.json(notes)
    })
})
app.post("/api/notes",(req,res) => {
console.log(req.body)
req.body.id = uniqid()
console.log(req.body)
fs.readFile(".")
})



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);