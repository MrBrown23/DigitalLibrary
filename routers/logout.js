const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.render(path.join(__dirname, '../views/login'), { errorMessage: '' }); 
       
});
});

module.exports = router;
