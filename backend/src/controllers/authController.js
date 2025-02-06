const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const authService = require('../services/authService');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    const token = authService.generateToken(user);
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Error in the server', error: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name
    });

    const token = authService.generateToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Error in the server', error: err.message });
  }
};
