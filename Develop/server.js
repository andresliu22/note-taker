const fs = require('fs');
const express = require('express');
const { readAndAppend, readFromFile } = require('./helpers/fsUtils');

const app = express();
const PORT = 3001;
const path = require('path');
app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.post('/notes', (req, res) => {
    readAndAppend(req.body, './db/db.json');

    const response = {
        status: 'success',
        body: req.body
    }

    res.json(response);
});

app.listen(PORT, () => {
    console.log(`Listening from port ${PORT}!`);
})
