//requiring a path to display a page
const path = require('path');

//defiining the paths for the notes page and the index landing page
module.exports = (app) => {
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, '../Develop/public/notes.html'));
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../Develop/public/index.html'));
    });
}