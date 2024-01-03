const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const signupRouter = require('./routers/signup');
app.use('/signup', signupRouter(db));

const loginRouter = require('./routers/login');
app.use('/login', loginRouter(db));

const insertBookRouter = require('./routers/insert-book');
app.use('/insert-book', insertBookRouter(db));


app.use((req, res) => {
    res.status(404).redirect('/404.html');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

/*

const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test.db');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/signup', (req, res) => {
    const { f_name, l_name, username, email, password, passwordV } = req.body;

    if (password !== passwordV) {
        return res.status(400).send("Passwords don't match");
    }

    const query = `INSERT INTO clients (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [f_name, l_name, username, email, password], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }

        res.redirect('/login.html');
    });
});

app.use((req, res) => {
    res.status(404).redirect('/404.html');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
*/

/*const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000 || 5000;

app.use(express.static('public'));
app.use((req, res) => {
    res.status(404);
    res.redirect('404.html');
});*/

/*const signupRoute = require('./routers/signup');
app.use('/signup', signupRoute);
*/

/*const db = new sqlite3.Database('./test.db');

router.post('/signup', (req, res) => {
    const { f_name, l_name, username, email, password } = req.body;
    console.log({ f_name, l_name, username, email, password });

    const query = `INSERT INTO clients (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [f_name, l_name, username, email, password], function(err) {
        if (err) {
            //return res.status(500).send(err.message);
            return console.log(err.message);
        }
        res.send('Data inserted into database');
        res.redirect('login.html')
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});*/






/*const express = require('express');
const path = require('path');

const app = express();

const port = 8080;

app.use(express.static('public'));

app.use((req,res) => {
    res.status(404);
    res.redirect('404.html')
})

app.listen(port, () => {
    console.log(`Server is lisstening on port ${port}`);
});
*/
