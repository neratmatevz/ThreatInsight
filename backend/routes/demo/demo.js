const express = require('express');
let router = express.Router();

router.get('/', async (req, res) => {
    res.send("demo")
})

module.exports = router;

