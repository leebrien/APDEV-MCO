const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const winston = require('winston');
const mongoose = require('mongoose');
const User = require('./models/User')

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);
// Logger configuration
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: false,
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/signup', signupRoutes);
app.use('/signin', signinRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:27017`);
});
