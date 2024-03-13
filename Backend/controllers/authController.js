const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../Models/User');

// Register a new user
exports.register = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new User(userData);

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    await newUser.save();

    // Create a user object without the password
    const userWithoutPassword = {
      _id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    };

    // Create and send a JWT token along with the user data
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      config.jwtSecret
    );

    res.status(201).json({ message: 'Registration successful', token, user: userWithoutPassword });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(400).json({ message: 'Registration failed' });
  }
};


// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)

    // Find the user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a user object without the password
    const userWithoutPassword = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    // Create and send a JWT token along with the user data
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      config.jwtSecret
    );

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};
