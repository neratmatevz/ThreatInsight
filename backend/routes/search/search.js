const express = require('express');
const { validateToken } = require('../../authentication/auth');
const createSearch = require('../../search/createSearch/createSearch');
const getSearch = require('../../search/getSearch/getSearch');
const updateSearch = require('../../search/updateSearch/updateSearch');

let router = express.Router();

/** 
* This document handles all the requests that deal with search:
*   - POST(creates a new search)
*   - GET(fetches the final structured response of the search)
*   - PUT(updates name and notes of the search)
*/

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

router.put('/', validateToken, async (req, res) => {

    try {
        const userUID = req.body.userUID;
        const searchUID = req.body.searchUID;
        const name = req.body.name;
        const notes = req.body.notes;

        const updateStatus = await updateSearch(userUID, searchUID, name, notes);

        res.status(200).json(updateStatus)

    } catch (error) {

        res.status(400).json({ message: error.message });

    }

})

module.exports = router;