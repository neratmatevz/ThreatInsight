const express = require('express');
const { validateToken } = require('../../authentication/auth');

let router = express.Router();

router.post('/', validateToken, (req, res) => {

    res.status(200).json({msg: 'hello world'});

})

module.exports = router;