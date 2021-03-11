//setting constants, requiring fs and uuid module
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
    // get and display the notes page
    app.get("/api/notes", (req, res) => {
        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    });

    // posting new notes to the notes page, setting an ID using the uuid module
    app.post("/api/notes", (req, res) => {
        let notesTaken = req.body;
        notesTaken.id = uuidv4();
        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
            notes.push(notesTaken);
            fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
                if (err) throw err;
                res.json(notes);
            });
        });
    });

    //deleting notes page using ids
    app.delete("/api/notes/:id", (req, res) => {
        const id = req.params.id;
        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            const notes = JSON.parse(data);
            let notesArr = notes.filter((note) => {
                return id !== note.id;
            })
            fs.writeFile('./db/db.json', JSON.stringify(notesArr), (err) => {
                if (err) throw err;
                res.json(notesArr);
            });
        });
    });
}