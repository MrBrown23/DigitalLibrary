const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const editSubscriberRouter = (db) => {
    router.get('/:id', (req, res) => {
        console.log("We are in get edit-subscriber.js");
        const clientId = req.params.id;
        console.log(clientId);

        db.get('SELECT * FROM clients WHERE id = ?', [clientId], (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Internal Server Error');
            }

            if (!row) {
                return res.status(404).send('Book not found');
                // res.render(path.join(__dirname, '../views/editBook'), { book: row });
            }

            res.render(path.join(__dirname, '../views/editSubscriber'), { book: row });
        });
    });

    router.post('/:id', (req, res) => {
        console.log("We are in post edit-subscriber.js");
        const clientId = req.params.id;
        console.log(clientId);

        db.get('SELECT * FROM clients WHERE id = ?', [clientId], (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Internal Server Error');
            }

            if (!row) {
                return res.status(404).send('Client not found');
                // res.render(path.join(__dirname, '../views/editBook'), { book: row });
            }

            res.render(path.join(__dirname, '../views/editSubscriber'), { client: row });
        });
    });
    return router;
};

module.exports = editSubscriberRouter;
