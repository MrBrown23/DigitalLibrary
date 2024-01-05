const express = require('express');
const router = express.Router();
const path = require('path');
const crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();

const insertBookRouter = (db) => {
    router.get('/', (req, res) => {
        console.log('I am in get')
    
        db.all('SELECT * FROM books', (err, rows) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Internal Server Error');
            }
    
            res.render(path.join(__dirname, '../views/book'), { books: rows });
        });
    });

    router.post('/', (req, res) => {
        console.log('I am in Post')
                const { bookName, authorName, genre, numAvailable } = req.body;
        
                const query = 'INSERT INTO books (book_name, author, genre, num_available) VALUES (?, ?, ?, ?)';
                db.run(query, [bookName, authorName, genre, numAvailable], (err) => {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    db.all('SELECT * FROM books', (err, rows) => {
                        if (err) {
                            console.error(err.message);
                            return res.status(500).send('Internal Server Error');
                        }
                
                        res.render(path.join(__dirname, '../views/book'), { books: rows });
                    });

                });
            });

    router.post('/delete-book/:id', (req, res) => {
        onsole.log('I am in Post delete')
        const id = req.params.id;
        const query = 'DELETE FROM books WHERE id = ?';
        db.run(query, id, (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Internal Server Error');
            }
            db.all('SELECT * FROM books', (err, rows) => {
            if (err) {
                console.error(err.message);
                    return res.status(500).send('Internal Server Error');
                }
            
                    res.render(path.join(__dirname, '../views/book'), { books: rows });
                });
                    });
            });

    return router;
};

module.exports = insertBookRouter;



// const express = require('express');
// const router = express.Router();

// const insertBookRouter = (db) => {
//     router.post('/', (req, res) => {
//         const { bookName, authorName, genre, numAvailable } = req.body;

//         const query = 'INSERT INTO books (book_name, author, genre, num_available) VALUES (?, ?, ?, ?)';
//         db.run(query, [bookName, authorName, genre, numAvailable], (err) => {
//             if (err) {
//                 return res.status(500).send(err.message);
//             }
//             res.redirect('./book.html');
//         });
//     });

//     return router;
// };

// module.exports = insertBookRouter;
