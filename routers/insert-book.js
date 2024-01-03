const express = require('express');
const router = express.Router();

const insertBookRouter = (db) => {
    router.post('/', (req, res) => {
        const { bookName, authorName, genre, numAvailable } = req.body;

        const query = 'INSERT INTO books (book_name, author, genre, num_available) VALUES (?, ?, ?, ?)';
        db.run(query, [bookName, authorName, genre, numAvailable], (err) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.redirect('./book.html');
        });
    });

    return router;
};

module.exports = insertBookRouter;
