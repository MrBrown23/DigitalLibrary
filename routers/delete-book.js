// const express = require('express');
// const router = express.Router();
// const path = require('path');
// const sqlite3 = require('sqlite3').verbose();
// console.log('I am in delete-book');
// const deleteBookRouter = (db) => {
//         router.post('/', (req, res) => {
//         console.log('I am in Post delete');
//         const id = req.params.id;
//         console.log(id);
//         const query = 'DELETE FROM books WHERE id = ?';
//         db.run(query, id, (err) => {
//             if (err) {
//                 console.error(err.message);
//                 return res.status(500).send('Internal Server Error');
//             }
//             db.all('SELECT * FROM books', (err, rows) => {
//             if (err) {
//                 console.error(err.message);
//                     return res.status(500).send('Internal Server Error');
//                 }
            
//                     res.render(path.join(__dirname, '../views/book'), { books: rows });
//                 });
//                     });
//             });

//     return router;
// };

// module.exports = deleteBookRouter;

const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const deleteBookRouter = (db) => {
    router.post('/:id', (req, res) => {
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

module.exports = deleteBookRouter;


