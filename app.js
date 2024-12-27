
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = "MYNAMEISA$ITYA"; 

// Middleware
app.use(bodyParser.json());
app.use(cors()); 

// Mock database file path
const USERS_DB = path.join(__dirname, 'users.json');
const RIDES_DB = path.join(__dirname, 'rides.json');

const readJSON = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const writeJSON = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Initialize mock databases if they don't exist
if (!fs.existsSync(USERS_DB)) {
    writeJSON(USERS_DB, []);
}
if (!fs.existsSync(RIDES_DB)) {
    writeJSON(RIDES_DB, [
        { id: "1", distance: "10 km", fare: "$15", details: "Ride from A to B" },
        { id: "2", distance: "20 km", fare: "$25", details: "Ride from C to D" },
        { id: "3", distance: "15 km", fare: "$20", details: "Ride from E to F" },
    ]);
}


// Register User
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    const users = readJSON(USERS_DB);

    if (users.find(user => user.username === username)) {
        return res.status(409).json({ error: 'Username already exists.' });
    }

    users.push({ username, password });
    writeJSON(USERS_DB, users);

    // Return success response
    res.status(201).json({ message: 'User registered successfully.' });
});

// List Rides
app.get('/rides', (req, res) => {
    const rides = readJSON(RIDES_DB);
    res.json(rides); 
});

// Ride Details
app.get('/rides/:id', (req, res) => {
    const { id } = req.params;
    const rides = readJSON(RIDES_DB);

    const ride = rides.find(r => r.id === id);

    if (!ride) {
        return res.status(404).json({ error: 'Ride not found.' });
    }

    res.json(ride);
});

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token.' });
        req.user = user;
        next();
    });
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const users = readJSON(USERS_DB);
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

