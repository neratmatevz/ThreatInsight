const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const cors = require('cors');
app.use(cors());
app.use(express.json());

const {initializeFirestore} = require('./firebase');

// Initialize Firestore
initializeFirestore();

//Routes
const authRouter = require('./routes/auth/auth_route.js');
app.use('/', authRouter);

const search = require('./routes/search/search.js');
app.use('/search', search);






app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})