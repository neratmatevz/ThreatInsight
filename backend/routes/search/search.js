const express = require('express');
const { validateToken } = require('../../authentication/auth');

let router = express.Router();

router.post('/', validateToken, async (req, res) => {

    try {
        await createSearch(req.body)
    } catch (error) {
        res.status(400).send(error.message);
    }
    
    res.status(200).json(test);

})

module.exports = router;