const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const signupRouter = (db) => {
    router.post('/', (req, res) => {
        const { f_name, l_name, username, email, password, passwordV } = req.body;

        if (password !== passwordV) {
            return res.status(400).send("Passwords don't match");
        }

        const query = `INSERT INTO clients (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)`;
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        db.run(query, [f_name, l_name, username, email, hashedPassword], function(err) {
            if (err) {
                return res.status(500).send(err.message);
            }

            res.redirect('/login.html');
        });
    });

    return router;
};

module.exports = signupRouter;
