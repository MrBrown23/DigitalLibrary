const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3').verbose(); // Import SQLite library

const buyRouter = (db) => {
    router.get('/', (req, res) => {
        // Query to fetch books from the database
        db.all('SELECT * FROM books WHERE num_available > 0', (err, rows) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Internal Server Error');
            }
            
            // Render buy.ejs with the retrieved book information
            res.render(path.join(__dirname, '../views/buy'), { books: rows });
        });
    });
        return router;
}

module.exports = buyRouter;
