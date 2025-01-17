// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Post = require('./models/Post');
const multer = require('multer'); 
const { mongoURI, jwtSecret } = require('./config');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json()); // Use built-in body-parser middleware for JSON
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); 
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
app.get('/api/posts', async (req, res) => {
  try {
      const posts = await Post.find().sort({ timestamp: -1 });
      res.json(posts);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
app.post('/api/posts', upload.single('photo'), async (req, res) => {
  try {
    const { description, username } = req.body;
    if (!description || !username) {
      return res.status(400).json({ message: 'Description and username are required' });
    }

    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = new Post({
      description,
      photo,
      username,
    });

    await newPost.save();
    res.json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      username,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use(express.json()); // Use built-in body-parser middleware for JSON
app.use(express.urlencoded({ extended: true }));
app.use(cors());
