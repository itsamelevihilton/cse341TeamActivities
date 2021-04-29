//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();

var names = [];

router.post('/addUser', (req, res, next) => {
    names.push(req.body.name);

    res.writeHead(302, {'Location': '/ta02/'});
    res.end();
});
router.post('/removeUser', (req, res, next) => {
    console.log("index: ", names.indexOf(req.body.name))
    names.splice(names.indexOf(req.body.name),1);

    res.writeHead(302, {'Location': '/ta02/'});
    res.end();
});

router.get('/',(req, res, next) => {
    res.render('pages/ta02', {
        title: 'Team Activity 02', 
        path: '/ta02', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        names: names
    });
    console.log(names)
});


module.exports = router;