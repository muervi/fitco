const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoute');
const appointmentRoutes = require('./routes/authRoute')
const authMiddleware = require('./middleware/authMiddleware');

const app = express();


app.use(cors());  
app.use(morgan('dev'));  
app.use(bodyParser.json()); 

// Routes
app.use('/auth', authRoutes);  // Auth routes
app.use('/appointments', authMiddleware, appointmentRoutes); 


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

module.exports = app;
