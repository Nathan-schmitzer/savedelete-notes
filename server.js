const express = require("express");;
const path = require("path");
const fs = require("fs");
const app = express();
const PORT =  process.env.PORT || 3000;
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// returns notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});



app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", function(req, res) {
    let array = [];
    let addId = {...req.body, id: uuidv4()}
    

    fs.readFile(__dirname + "/db/db.json", function(err, data) {
        if (err) throw err;
        
        array = JSON.parse(data);
        
        array.push(addId);      
        
        
        fs.writeFile(__dirname + "/db/db.json",JSON.stringify(array), `utf-8`, err => {
            if (err) throw err;
            
            res.end();
        })
    });

});

app.delete("/api/notes/:id", function (req, res) {   
        let noteId = req.params.id;
        // console.log('this is the notes id', noteId);
        fs.readFile(__dirname + '/db/db.json', (err, data) => {
            let dbFiles = JSON.parse(data);
            const filteredNotes = dbFiles.filter(values => values.id != noteId);
    
            fs.writeFile(__dirname + '/db/db.json', JSON.stringify(filteredNotes), 'utf-8', err => {
                if (err) throw err;
                res.end();
            });
        });
    
})

// returns index.html
app.get("*", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, function () {
    console.log(`App listening on http://localhost:${PORT}`); 
})