const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const deleteBookRouter = (db) => {
    router.post('/:id', (req, res) => {
        console.log("I am in post delete-subscriber.js");
        
        const id = req.params.id;
        console.log(`I am trying to delete ${id}!`);
        const query = 'DELETE FROM clients WHERE id = ?';
        db.run(query, id, (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Internal Server Error');
            }
            db.all('SELECT * FROM clients', (err, rows) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send('Internal Server Error');
                }
                errorMessage = '';
                res.render(path.join(__dirname, '../views/subscribers'), { clients: rows, errorMessage });
            });
        });
    });

    return router;
};

module.exports = deleteBookRouter;


