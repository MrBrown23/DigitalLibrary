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



// app.use((req, res, next) => {
//     if(req.session.user && req.cookie.user_sid){
//         res.redirect('/')
//     }
// });


// Require and use the library router
const libraryRouter = require('./routers/library-router');
app.use('/admin', libraryRouter);
app.use('/library', libraryRouter);



// app.get(('/admin'),(req, res) => {
//     // console.log(req.session.user)
//     if(req.session.user && req.cookie.user_sid){
//         res.render('admin');
//     }
//     else{
//         res.render('login');
//     }
// });

// app.get(('/book'),(req, res) => {
//     // console.log(req.session.user)
//     if(req.session.user && req.cookie.user_sid){
//         res.render('book');
//     }
//     else{
//         res.render('login');
//     }
// });

// app.get(('/subscribes'),(req, res) => {
//     // console.log(req.session.user)
//     if(req.session.user && req.cookie.user_sid){
//         res.render('subscribes');
//     }
//     else{
//         res.render('login');
//     }
// });

// app.get(('/library'),(req, res) => {
//     // console.log(req.session.user)
//     if(req.session.user && req.cookie.user_sid){
//         res.render('library');
//     }
//     else{
//         res.render('login');
//     }
// });

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


// app.get('/book', (req, res) => {

//     db.all('SELECT * FROM books', (err, rows) => {
//         if (err) {
//             console.error(err.message);
//             return res.status(500).send('Internal Server Error');
//         }

//         res.render('book', { books: rows });
//     });
// });

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(3000, () => {
    console.log(`Server running on port ${port}`);
});


// app.get('/login', (req, res) => {
//     res.render('login');
// });
// app.post('/login', (req, res) => {
//     console.log(req.body);
//     const { emailOrUsername, password } = req.body;
//     const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

//     db.get(
//         'SELECT * FROM clients WHERE (username = ? OR email = ?) AND password = ?',
//         [emailOrUsername, emailOrUsername, hashedPassword],
//         (err, row) => {
//             if (err) {
//                 console.error(err.message);
//                 return res.status(500).send('Internal Server Error');
//             }

//             if (!row) {
//                 return res.render('login'); // Redirect to login again or show an error message
//             }
//             console.log(row);

//             // Check user role and redirect accordingly
//             if (row.username === 'admin') {
//                 return res.render('admin');
//             } else {
//                 return res.render('library');
//             }
//         }
//     );
// });


// const express = require('express');
// const app = express();

// const port = process.env.PORT || 3000;

// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('test.db');

// app.use(express.urlencoded({ extended: true }));
// app.set('view engine', 'ejs'); 
// app.use(express.static('public'));

// const signupRouter = require('./routers/signup');
// app.use('/signup', signupRouter(db));

// const loginRouter = require('./routers/login');
// app.use('/login', loginRouter(db));

// const insertBookRouter = require('./routers/insert-book');
// app.use('/insert-book', insertBookRouter(db));


// app.get('/books', (req, res) => {
//     const query = 'SELECT * FROM books'; // Assuming 'books' is the table name

//     db.all(query, (err, rows) => {
//         if (err) {
//             return res.status(500).send(err.message);
//         }

//         res.render('book.html', { books: rows }); // Pass retrieved data to book.html using template engine (e.g., EJS, Pug)
//     });
// });

// app.use((req, res) => {
//     res.status(404).redirect('/404.html');
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

