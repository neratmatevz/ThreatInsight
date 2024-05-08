const express = require('express');
let router = express.Router();

router.get('/', async (req, res) => {
    //klic funkcije(daš noter json)
    res.send("demo")
})

module.exports = router;