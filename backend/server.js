const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const cors = require('cors');
app.use(cors());
app.use(express.json());

const initializeFirestore = require('./firebase');

// Initialize Firestore
initializeFirestore();

//Routes
var demo = require('./routes/demo/demo.js');
app.use('/demo', demo);

const authRouter = require('./routes/auth/auth_route.js');
app.use('/', authRouter);






app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})