require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin SDK
var admin = require("firebase-admin");

var serviceAccount = require("/Users/Rudra/Downloads/bookingwebsite-Service_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});


// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.post('/book-slot', async (req, res) => {
    try {
        const { name, email, date, time } = req.body;
        if (!name || !email || !date || !time) {
            throw new Error("Missing required fields");
        }
        await db.collection('bookings').add({ name, email, date, time });
        res.status(200).send("Slot booked successfully!");
    } catch (error) {
        console.error("Booking Error:", error.message);
        res.status(500).send(error.message);
    }
});

  