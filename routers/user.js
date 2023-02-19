const express = require('express');
const mongoose = require('mongoose');
const user = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mysecretkey';
const bcrypt = require('bcrypt');

// Register
user.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user with given email already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User with given email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login
user.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user with the given email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        // Send the token in the response
        res.json({
            status: "success",
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = user;
