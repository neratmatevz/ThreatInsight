const express = require('express');
const { validateToken } = require('../../authentication/auth');
const createSearch = require('../../search/createSearch/createSearch');

let router = express.Router();

router.post('/', validateToken, async (req, res) => {

    let result
    try {
        result = await createSearch(req.body)
    } catch (error) {
        res.status(400).send(error.message);
    }
    
    res.status(200).json(result);

})

module.exports = router;