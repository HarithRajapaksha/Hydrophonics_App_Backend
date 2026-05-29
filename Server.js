const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, push, set, get, update } = require('firebase/database');
const { getAuth} = require('firebase/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.json());

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGBmdxrZB5XeI8s1jBktpym81txAE7ODA",
  authDomain: "hydroponicmonitoring-31595.firebaseapp.com",
  databaseURL: "https://hydroponicmonitoring-31595-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hydroponicmonitoring-31595",
  storageBucket: "hydroponicmonitoring-31595.firebasestorage.app",
  messagingSenderId: "414734302006",
  appId: "1:414734302006:web:2a5c90b36e100c5e1ed197",
  measurementId: "G-HB9R9LCKP7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

// Firebase Authentication Credentials
const email = "IT21192050@my.sliit.lk";
const password = "200007901313";



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