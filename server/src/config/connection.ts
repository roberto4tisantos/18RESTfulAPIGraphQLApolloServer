import mongoose from 'mongoose';

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

// Update the URI with your database name
const connectionString = 'mongodb://127.0.0.1:27017/googlebooks'; 
// Wrap Mongoose around local connection to MongoDB
mongoose.connect(connectionString);

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully!');
});
  
mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

// Export the URI so it can be used in your main server file
// export default connectionString; 

// Export connection 
export default mongoose.connection;
