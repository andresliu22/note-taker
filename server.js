const fs = require('fs');
const express = require('express');
const { readAndAppend, readFromFile } = require('./helpers/fsUtils');
const api = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.listen(PORT, () => {
    console.log(`Listening from port ${PORT}!`);
})
