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

notes.delete('/:id', (req, res) => {
    readFromFile('./db/db.json').then(
        (data) => {
            const found = data.some(obj => obj.id === req.params.id);
            if (!found) {
                res.status(400).json({ msg: `No note with id of ${req.params.id}` });
            } else {
                res.json(todos.filter(todo => todo.id === req.params.id));
            }
        }
    )
})

module.exports = notes;