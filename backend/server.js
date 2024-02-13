const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors=require('cors');
const multer = require('multer');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;  

// Connect to MongoDB
mongoose.connect('mongodb+srv://20pa1a05e7:20pa1a05e7@cluster0.woy7bwh.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{console.log('connected to DB')});

// User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true,cookie: {
  secure: false, // Set to true if using HTTPS
  maxAge: 3600000, // Set the session expiration time in milliseconds
}, }));



const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });


// Signup Route
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body; 

  const user = await User.findOne({ email });
  if(user){
   return  res.status(400).json({ message: 'User already exist.' });

  }

  // Hash the password before saving to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email: email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    

    req.session.userId = user.id;


    res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});



app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).json({ message: 'Logout failed' });
    } else {
      res.json({ message: 'Logout successful' });
    }
  });
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({ message: 'Image uploaded successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
