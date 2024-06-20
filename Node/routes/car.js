const express = require('express');
const router = express.Router();
const Car = require('../models/Car'); // Import the Car model

// POST endpoint to create a new car
router.post('/', async (req, res) => {
    try {
        const newCar = new Car(req.body); // Create a new instance of Car model
        const savedCar = await newCar.save(); // Save the new car to MongoDB
        res.status(201).json(savedCar); // Respond with the saved car object
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
});

// GET endpoint to retrieve all cars
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find(); // Fetch all cars from MongoDB
        res.status(200).json(cars); // Respond with the list of cars
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
});

// GET endpoint to retrieve a specific car by ID
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id); // Find car by ID in MongoDB
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car); // Respond with the found car
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
});

// PUT endpoint to update a car by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true }); // Update car in MongoDB
        if (!updatedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(updatedCar); // Respond with the updated car
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
});

// DELETE endpoint to delete a car by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCar = await Car.findByIdAndDelete(id); // Delete car from MongoDB
        if (!deletedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
});

module.exports = router;
