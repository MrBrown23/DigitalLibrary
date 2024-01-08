const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const modifySubscriberRouter = (db) => {
    router.post('/:id', (req, res) => {
        const clientId = req.params.id;
        const { f_name, l_name, username, email } = req.body;

        db.run('UPDATE clients SET first_name = ?, last_name = ?, username = ?, email = ? WHERE id = ?',
            [f_name, l_name, username, email, clientId],
            function (err) {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send('Internal Server Error');
                }
                
                res.redirect('/subscribers');
            }
        );
    });

    return router;
};

module.exports = modifySubscriberRouter;
