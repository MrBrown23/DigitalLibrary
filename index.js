const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sqlite3 = require('sqlite3').verbose();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));



const port = process.env.PORT || 3000 || 8080 || 5000;
const db = new sqlite3.Database('test.db');
app.use(
    session({
        key: 'user_sid',
        secret: 'secret-key',
        resave: false,
        saveUninitialized: false,
        cookie:{
            expires: 6000000
        }
    })
);

const libraryRouter = require('./routers/library-router');
app.use('/admin', libraryRouter);
app.use('/library', libraryRouter);

app.get('/', (req, res) => {
    res.render('index');
});


const signupRouter = require('./routers/signup');
app.use('/signup',signupRouter(db));


const loginRouter = require('./routers/login');
app.use('/login',loginRouter(db));

const logoutRouter = require('./routers/logout');
app.use('/logout',logoutRouter);


const deleteBookRouter = require('./routers/delete-book');
app.use('/delete-book',deleteBookRouter(db));


const subscribersRouter = require('./routers/subscribers');
app.use('/subscribers',subscribersRouter(db));


const insertBookRouter = require('./routers/insert-book');
app.use('/book',insertBookRouter(db));

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(3000, () => {
    console.log(`Server running on port ${port}`);
});



