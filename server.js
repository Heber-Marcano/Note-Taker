const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const notes = JSON.parse(data);
      res.json(notes);
    }
  });
});

app.post("/api/notes", (req, res) => {
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const notes = JSON.parse(data);
      const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
      };
      notes.push(newNote);
      fs.writeFile("./db.json", JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          const updatedNotes = JSON.parse(JSON.stringify(notes));
          res.json(updatedNotes);
        }
      });
    }
  });
});

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
