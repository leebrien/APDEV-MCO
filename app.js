const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const winston = require('winston');
const mongoose = require('mongoose');

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

app.get('/', (req, res) => {
  res.render('login', { layout: false });
});

app.post('/signup', async (req, res) => {
  const { firstName, lastName, username, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !username || !password || password !== confirmPassword) {
    return res.status(400).json({ error: 'Please fill all fields correctly and make sure passwords match.' });
  }

  if (users[username]) {
    return res.status(400).json({ error: 'Username already exists.' });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    users[username] = { firstName, lastName, username, password: hashedPassword };

    logger.debug('New user registered:', { username }); // Log username only
    res.json({ message: 'Sign-up successful', user: { username } });
  } catch (error) {
    logger.error('Error hashing password:', error);
    res.status(500).json({ error: 'Server error during sign-up.' });
  }
});

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Please fill all fields.' });
  }

  const user = users[username];
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  logger.debug(`User ${username} signed in successfully`); // Log username only
  res.json({ message: 'Sign-in successful', user: { username } });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
