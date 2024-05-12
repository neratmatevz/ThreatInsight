const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const cors = require('cors');
app.use(cors());
app.use(express.json());
// imports
const { getFirestore } = require('firebase-admin/firestore');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');


// vzpostavitev Firebase
var serviceAccount = require("./serviceAccountKey.json");
initializeApp({
    credential: cert(serviceAccount)
  });
const db = getFirestore();


//

var demo = require('./routes/demo/demo.js');
app.use('/demo', demo);

const authRouter = require('./routes/auth/auth_route.js');
app.use('/', authRouter);






app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})