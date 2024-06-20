const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for rental form data
const rentalSchema = new Schema({
    name: { type: String, required: true }, // Name of the person renting
    email: { type: String, required: true }, // Email of the person renting
    fromDate: { type: Date, required: true }, // Start date of the rental period
    tillDate: { type: Date, required: true }, // End date of the rental period
    car: {
        title: { type: String, required: true }, // Title or model of the car being rented
        makeYear: { type: String, required: true }, // Year of manufacturing of the car
        engineType: { type: String, required: true }, // Type of engine (e.g., gasoline, diesel)
        horsePowers: { type: String, required: true }, // Power of the engine in horsepower
        torque: { type: String, required: true } // Torque produced by the engine
    }
});

// Create model based on schema
const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental; // Export the Rental model for use in other parts of the application
