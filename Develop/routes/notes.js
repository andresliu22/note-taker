const notes = require('express').Router();
const { fstat } = require('fs');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const fs = require('fs');

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

notes.delete('/:id', (req, res) => {
    readFromFile('./db/db.json').then(
        (data) => {
            const parsedData = JSON.parse(data);
            const filterData = parsedData.filter(obj => parseInt(obj.id) !== parseInt(req.params.id));
            fs.writeFile("./db/db.json", JSON.stringify(filterData), (error) => {
                error ? console.log(error) : console.log("Note deleted");
            });
            res.json(filterData);
        }
    )
})
    

module.exports = notes;