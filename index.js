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
