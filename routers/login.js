const express = require('express');
const router = express.Router();
const path = require('path');
const crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();

const loginRouter = (db) => {

    router.get('/', (req, res) => {
    if (req.session && req.session.loggedIn) {
        if (req.session.user && req.session.user.username === 'admin') {
            res.render(path.join(__dirname, '../views/admin'), { user: req.session.user });
        } else {
            res.render(path.join(__dirname, '../views/library'), { user: req.session.user });
        }
    } else {
        var errorMessage = '';
        res.render(path.join(__dirname, '../views/login'), { errorMessage });
    }
    });


    router.post('/', (req, res) => {
        const { emailOrUsername, password } = req.body;
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        db.get(
            'SELECT * FROM clients WHERE (username = ? OR email = ?) AND password = ?',
            [emailOrUsername, emailOrUsername, hashedPassword],
            (err, row) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send('Internal Server Error');
                }

                if (!row) {
                    return res.render(path.join(__dirname, '../views/login'), { errorMessage: 'Wrong Username or Password' }); 
                }

                req.session.loggedIn = true;
                req.session.user = {
                    id: row.id,
                    username: row.username,
                };

                console.log(req.session.loggedIn);
                console.log(req.session.user);

                if (row.username === 'admin') {
                   
                    return res.render(path.join(__dirname, '../views/admin'), { user: req.session.user });
                } else {
                    return res.render(path.join(__dirname, '../views/library'), { user: req.session.user });
                }
            }
        );
    });

    return router;
};

module.exports = loginRouter;

