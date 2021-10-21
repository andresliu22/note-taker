const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then(
        (data) => {
            res.json(JSON.parse(data));
        }
    )
});

notes.post('/', (req, res) => {
    readAndAppend(req.body, './db/db.json');

    const response = {
        status: 'success',
        body: req.body
    }

    res.json(response);
});

module.exports = notes;