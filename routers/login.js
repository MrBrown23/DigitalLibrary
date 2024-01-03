const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();

const loginRouter = (db) => {
    router.post('/', (req, res) => {
        const { emailOrUsername, password } = req.body;

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        const query = `SELECT * FROM clients WHERE (username = ? OR email = ?) AND password = ?`;
        db.get(query, [emailOrUsername, emailOrUsername, hashedPassword], (err, row) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            if (!row) {

                return res.redirect('/login.html?error=invalid');
                //return res.status(401).send('Invalid username/email or password');
            }

            res.redirect('/library.html');
        });
    });

    return router;
};

module.exports = loginRouter;
