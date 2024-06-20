// Import necessary packages
const express = require('express'); // Framework for building web applications
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const mongoose = require('mongoose'); // MongoDB object modeling tool
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing

// Initialize express application
const app = express();
const port = 8080; // Port on which the server will run

// Middleware setup
app.use(bodyParser.json()); // Parse incoming request bodies in JSON format
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// MongoDB Atlas connection string
const connectionString = 'mongodb+srv://maheshp2802:M%40hesh%4002@nodeproj.a4m1w4b.mongodb.net/nodeproj?retryWrites=true&w=majority&appName=nodeproj';

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'DELETE'], // Include DELETE method
    allowedHeaders: ['Content-Type'],
};

// Enable CORS with options
app.use(cors(corsOptions));

// Allow preflight requests for all routes
app.options('*', cors(corsOptions));

// Connect to MongoDB Atlas
mongoose.connect(connectionString).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Define mongoose schema and model
const rentalSchema = new mongoose.Schema({
    name: String,
    email: String,
    fromDate: Date,
    tillDate: Date,
    carTitle: String,
    makeYear: String,
    engineType: String,
    horsePowers: String,
    torque: String,
});

const Rental = mongoose.model('Rental', rentalSchema);

// Routes

// POST a new rental
app.post('/api/submitForm', async (req, res) => {
    try {
        // Destructure request body
        const { name, email, fromDate, tillDate, carTitle, makeYear, engineType, horsePowers, torque } = req.body;
        
        // Create new rental instance
        const newRental = new Rental({ name, email, fromDate, tillDate, carTitle, makeYear, engineType, horsePowers, torque });
        
        // Save new rental to MongoDB
        await newRental.save();
        
        // Respond with success message and created rental object
        res.status(201).json({ message: 'Rental created successfully', rental: newRental });
    } catch (error) {
        // Handle errors and respond with error message
        console.error('Error creating rental:', error);
        res.status(500).json({ error: 'Failed to create rental' });
    }
});

// GET all rentals
app.get('/api/rentals', async (req, res) => {
    try {
        // Fetch all rentals from MongoDB
        const rentals = await Rental.find();
        
        // Respond with list of rentals
        res.status(200).json(rentals);
    } catch (error) {
        // Handle errors and respond with error message
        console.error('Error fetching rentals:', error);
        res.status(500).json({ error: 'Failed to fetch rentals' });
    }
});

// DELETE a rental by ID
app.delete('/api/rentals/:id', async (req, res) => {
    const { id } = req.params; // Extract rental ID from request parameters
    
    try {
        // Attempt to find and delete rental by ID
        const deletedRental = await Rental.findByIdAndDelete(id);
        
        // If rental not found, respond with error message
        if (!deletedRental) {
            return res.status(404).json({ error: 'Rental not found' });
        }
        
        // Respond with success message and deleted rental object
        res.status(200).json({ message: 'Rental deleted successfully', deletedRental });
    } catch (error) {
        // Handle errors and respond with error message
        console.error('Error deleting rental:', error);
        res.status(500).json({ error: 'Failed to delete rental' });
    }
});

// Start server and listen on specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
