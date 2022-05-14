//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get('/:search',(req, res, next) => {
    let localitems = [];
    try {
        const data = fs.readFileSync('./public/scripts/items.json', 'utf8');
        localitems = JSON.parse(data);
    } catch(err) {
        console.error("Error reading json file", err);
    }
    res.render('pages/ta03', { 
        title: 'Team Activity 03', 
        path: '/ta03', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        items: localitems.filter((item) => {
            let match =item.tags.filter(tag => tag.includes(req.params.search)).length;
            if (match > 0) {
                return true;
            }
            else return false;
        })
    });
});

router.get('/',(req, res, next) => {
    let localitems = [];
    try {
        const data = fs.readFileSync('./public/scripts/items.json', 'utf8');
        localitems = JSON.parse(data);
    } catch(err) {
        console.error("Error reading json file", err);
    }
    res.render('pages/ta03', { 
        title: 'Team Activity 03', 
        path: '/ta03', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        items: localitems
    });
});

module.exports = router;