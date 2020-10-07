const express = require("express");;
const path = require("path");
const fs = require("fs");
const app = express();
const PORT =  process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// returns notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});
// returns index.html
app.get("*", function (req, res) {
    res.sendFile(__dirname, "index.html");
});

app.get("/api/notes", function (req, res) {
    res.readFile(__dirname, "db.json");
});

// app.post("/api/notes", function(req, res) {
//     res.
// });

// app.delete("/api/notes/:id", function (req, res, id) {
//     res.deleteFile()
// })

app.listen(PORT, function () {
    console.log(`App listening on http://localhost:${PORT}`); 
})