require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, push, set, get, update } = require('firebase/database');
const { getAuth } = require('firebase/auth');


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.json());

// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

// Firebase Authentication Credentials
const email = process.env.FIREBASE_AUTH_EMAIL;
const password = process.env.FIREBASE_AUTH_PASSWORD;



// Root Endpoint
app.get('/get', (req, res) => {
  res.send('Welcome to the ESP32 Data Forwarding Server!');
});


// Endpoint to get data from Firebase (GET request)
app.get('/getdata', async (req, res) => {
  try {
    const dbRef = ref(database, 'sensors');
    const snapshot = await get(dbRef); // Get all data from the 'data' node
    if (snapshot.exists()) {
      res.status(200).json(snapshot.val()); // Send data as JSON
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    console.error('Error getting data from Firebase:', error.message);
    res.status(500).json({ error: error.message });
  }
});



// Create an HTTP server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const msg = 'Hello Node!\n';
  res.end(msg);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});