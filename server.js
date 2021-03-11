// defining constants on server page, adding express app and ports
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

//setting express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//sets express app to serve static files
app.use(express.static('./Develop/public'));

//requiring the routes folder where api and html routes are stored
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

//setting a listener 
app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
});