const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const modifyBookRouter = (db) => {
    router.post('/:id', (req, res) => {
        const bookId = req.params.id;
        const { bookName, authorName, genre, numAvailable } = req.body;
        db.run('UPDATE books SET book_name = ?, author = ?, genre = ?, num_available = ? WHERE id = ?',
            [bookName, authorName, genre, numAvailable, bookId],
            function (err) {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send('Internal Server Error');
                }
                
                res.redirect('/book');
            }
        );
    });

    return router;
};

module.exports = modifyBookRouter;
