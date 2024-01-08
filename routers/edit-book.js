const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const editBookRouter = (db) => {
    router.get('/:id', (req, res) => {
        console.log("We are in get edit-book.js");
        const bookId = req.params.id;
        console.log(bookId);

        db.get('SELECT * FROM books WHERE id = ?', [bookId], (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Internal Server Error');
            }

            if (!row) {
                return res.status(404).send('Book not found');
                // res.render(path.join(__dirname, '../views/editBook'), { book: row });
            }

            res.render(path.join(__dirname, '../views/editBook'), { book: row });
        });
    });

    router.post('/:id', (req, res) => {
        console.log("We are in post edit-book.js");
        const bookId = req.params.id;
        console.log(bookId);

        db.get('SELECT * FROM books WHERE id = ?', [bookId], (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Internal Server Error');
            }

            if (!row) {
                return res.status(404).send('Book not found');
                // res.render(path.join(__dirname, '../views/editBook'), { book: row });
            }

            res.render(path.join(__dirname, '../views/editBook'), { book: row });
        });
    });
    return router;
};

module.exports = editBookRouter;
