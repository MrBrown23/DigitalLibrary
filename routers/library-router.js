const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
});

router.get('/', (req, res) => {
    console.log(req.session.user.username)
    if (req.session.user.username === 'admin') {
        res.render('admin', { user: req.session.user });
    } else {
        res.render('library', { user: req.session.user });
    }
});

// router.get('/library', (req, res) => {
//     if (req.session.user.username !== 'admin') {
//         res.render('library', { user: req.session.user });
//     } else {
//         res.redirect('/admin');
//     }
// });

module.exports = router;
