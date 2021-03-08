const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// module.exports = (app) => {
//     fs.readFile('./db/db.json', 'utf8', (err, data) => {
//         if (err) throw err;
//         var notes = JSON.parse(data);

//         app.get('api/notes', (req, res) => {
//             res.json(notes);
//         });

//         app.post('api/notes', (req, res) => {
//             let newNote = req.body;
//             newNote.id = uuidv4();
//             notes.push(newNote);
//             updateNotes();
//             return console.log("added new note: " + newNote.title);
//         });

//         app.get('api/notes/:id', (req, res) => {
//             res.json(notes[req.params.id]);
//         });

//         app.delete('api/notes/:id', (req, res) => {
//             notes.splice(req.params.id, 1);
//             updateNotes();
//             console.log('deleted note with id' + req.params.id);
//         });

//         function updateNotes() {
//             fs.writeFile("./db/db.json",JSON.stringify(notes,'\t'),err => {
//                 if (err) throw err;
//                 return true;
//             });
//         }
//     });
// }

module.exports = (app) => {
    // get and display the notes page
    app.get("/api/notes", (req, res) => {
        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    });

    // posting new notes to the notes page
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

    //deleting notes page
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