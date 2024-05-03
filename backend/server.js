const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const cors = require('cors');
app.use(cors());

// imports
const { getFirestore } = require('firebase-admin/firestore');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');


// vzpostavitev Firebase
var serviceAccount = require("./serviceAccountKey.json");
initializeApp({
    credential: cert(serviceAccount)
  });
const db = getFirestore();


app.post("/test", async (req,res) => {
    try {
      const result = await db.collection("test").add({
        test: "prvi",
        test2: "drugi",
      });
  
      console.log("Dokument ID:", result.id);
  
      res
        .status(200)
        .json({ message: "Dokument uspešno dodan", documentId: result.id });
    } catch (error) {
      console.error("Napaka pri dodajanju dokumenta:", error);
      res.status(500).json({ error: "Napaka notranjega strežnika," });
    }
  });

//

var demo = require('./routes/demo/demo.js');
app.use('/demo', demo);







app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})