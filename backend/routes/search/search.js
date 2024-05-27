const express = require('express');
const { validateToken } = require('../../authentication/auth');
const createSearch = require('../../search/createSearch/createSearch');
const getSearch = require('../../search/getSearch/getSearch');

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

router.get('/', validateToken, async (req, res) => {

    try {
        let userUID = req.body.userUID;
        let searchUID = req.body.searchUID;

        let scanData = await getSearch(userUID, searchUID);

        res.status(200).json(scanData);

    } catch (error) {

        if (error.message === "Scan data for this search not found!") {

            res.status(404).json({ message: error.message });

        }

        res.status(400).json({ message: "Bad request!" });

    }
})

module.exports = router;