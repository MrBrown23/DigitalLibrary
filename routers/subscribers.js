const express = require('express');
const router = express.Router();
const path = require('path');
const crypto = require('crypto');
const { use } = require('./library-router');
const sqlite3 = require('sqlite3').verbose();
const admin = 'admin';

const subscribersRouter = (db) => {
    router.get('/', (req, res) => {
        console.log('I am in get (subscribers.js)');
        query = `SELECT * FROM clients WHERE username != ?`;
        db.all(query, [admin], (err, rows) => {
            if (err) {
                console.log('I am in get (subscribers.js) err method');
                console.error(err.message);
                return res.status(500).send('Internal Server Error');
            }
            if (errorMessage){
                var errorMessage = '';
            } 
            
    
            res.render(path.join(__dirname, '../views/subscribers'), { clients: rows, errorMessage });
        });
    });

    router.post('/', (req, res) => {
        console.log('I am in post (subscribers.js)');
        const { f_name, l_name, username, email, password, passwordV } = req.body;

        if (password !== passwordV) {
            // username = 'admin';
            query = `SELECT * FROM clients WHERE username != ?`;
            db.all(query, [admin], (err, rows) => {
                if (err) {
                    console.log('I am in get (subscribers.js) err method');
                    console.error(err.message);
                    return res.status(500).send('Internal Server Error');
                }
                var errorMessage = "Passwords don't match";
                console.log('I am in post (subscribers.js) password not matching');
                return res.render(path.join(__dirname, '../views/subscribers'), { clients: rows, errorMessage }); 
        
            }); 
        }
        else{
            db.get('SELECT COUNT(*) AS usernameCount FROM clients WHERE username = ?', [username], (err, row) => {
            console.log('I am in post (subscribers.js) looking if username/email');
            if (err) {
                return res.status(500).send(err.message);
            }

            if (row.usernameCount > 0) {
            console.log(username);
            query = `SELECT * FROM clients WHERE username != ?`;

            db.all(query, [admin], (err, rows) => {
                if (err) {
                    console.log('I am in get (subscribers.js) err method');
                    console.error(err.message);
                    return res.status(500).send('Internal Server Error');
                }
                errorMessage = 'Username already exists';                
                console.log('I am in post (subscribers.js) username exists in the db');
                return res.render(path.join(__dirname, '../views/subscribers'), { clients: rows, errorMessage }); 
            }); 
                            
            } 
            
            else {
                db.get('SELECT COUNT(*) AS emailCount FROM clients WHERE email = ?', [email], (err, row) => {
                    if (err) {
                        return res.status(500).send(err.message);
                    }

                    if (row.emailCount > 0) {
                        console.log(username);
                        query = `SELECT * FROM clients WHERE username != ?`;
            
                        db.all(query, [admin], (err, rows) => {
                            if (err) {
                                console.log('I am in get (subscribers.js) err method');
                                console.error(err.message);
                                return res.status(500).send('Internal Server Error');
                            }
                            errorMessage = 'Email already exists';           
                           console.log('I am in post (subscribers.js) email exists in the db');
                            return res.render(path.join(__dirname, '../views/subscribers'), { clients: rows, errorMessage }); 
                        
                        }); 
                       
                    } 
                    
                    else {
                        console.log('I am in post (subscribers.js) we put it in the db');
                        query = `INSERT INTO clients (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)`;
                        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
                        db.run(query, [f_name, l_name, username, email, hashedPassword], function(err) {
                            if (err) {
                                return res.status(500).send(err.message);
                            }
                            console.log(username);
                            query = `SELECT * FROM clients WHERE username != ?`;
                
                            db.all(query, [admin], (err, rows) => {
                                if (err) {
                                    console.log('I am in get (subscribers.js) err method');
                                    console.error(err.message);
                                    return res.status(500).send('Internal Server Error');
                                }
                                errorMessage = '';           
                               console.log('I am in post (subscribers.js) we put stuff into the db now we are going to subs again');
                                return res.render(path.join(__dirname, '../views/subscribers'), { clients: rows, errorMessage }); 
                                // res.render(path.join(__dirname, '../views/suscribers'));
                            // return res.render(path.join(__dirname, '../views/suscribers'), { errorMessage: 'Email already exists' });
                               
                            }); 
                            console.log(`I am in post (subscribers.js)res.render(path.join(__dirname, '../views/suscribers'));`);

                            // res.render(path.join(__dirname, '../views/suscribers'));
                        });
                    }
                });
            }
        });
    }
    });     

    return router;
};

module.exports = subscribersRouter;
