const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const cors = require('cors');
app.use(cors());



var demo = require('./routes/demo/demo.js');
app.use('/demo', demo);


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})