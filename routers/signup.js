const express = require('express');
const path = require('path');
const router = express.Router();
const crypto = require('crypto');

const signupRouter = (db) => {
    router.get('/', (req, res) => {
        console.log("We are in signup.js");
        console.log(req.session.loggedIn);
        console.log(req.session.user);
        if (req.session && req.session.loggedIn) {
            if (req.session.user && req.session.user.username === 'admin') {
                res.render(path.join(__dirname, '../views/admin'), { user: req.session.user });
            } else {
                res.render(path.join(__dirname, '../views/library'), { user: req.session.user });
            }
        }
        else{
            var errorMessage = '';
            res.render(path.join(__dirname, '../views/signup'),{ errorMessage });}
    });

    router.post('/', (req, res) => {
        const { f_name, l_name, username, email, password, passwordV } = req.body;

        if (password !== passwordV) {
            return res.render(path.join(__dirname, '../views/signup'), { errorMessage: "Passwords don't match" }); 
           
        }

        
        db.get('SELECT COUNT(*) AS usernameCount FROM clients WHERE username = ?', [username], (err, row) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            if (row.usernameCount > 0) {
                return res.render(path.join(__dirname, '../views/signup'), { errorMessage: 'Username already exists' });            
            } else {
                db.get('SELECT COUNT(*) AS emailCount FROM clients WHERE email = ?', [email], (err, row) => {
                    if (err) {
                        return res.status(500).send(err.message);
                    }

                    if (row.emailCount > 0) {
                        return res.render(path.join(__dirname, '../views/signup'), { errorMessage: 'Email already exists' });
                    } else {
                        const query = `INSERT INTO clients (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)`;
                        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
                        db.run(query, [f_name, l_name, username, email, hashedPassword], function(err) {
                            if (err) {
                                return res.status(500).send(err.message);
                            }

                            res.render(path.join(__dirname, '../views/login'));
                        });
                    }
                });
            }
        });
    });

    return router;
};

module.exports = signupRouter;
