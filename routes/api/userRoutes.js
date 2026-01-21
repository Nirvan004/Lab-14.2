const router = require('express').Router();
const User = require('../../models/User');
const { signToken } = require('../../utils/auth');
 
// POST /api/users/register - Create a new user
router.post('/register', async (req, res) => {
  console.log('Body received:', req.body);
  try {
    const user = await User.create(req.body);
    const token = signToken(user);
    console.log('User created:', user);
    res.status(201).json({ token, user });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).json(err);
  }
});
 
// POST /api/users/login - Authenticate a user and return a token
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
 
  if (!user) {
    return res.status(400).json({ message: "Can't find this user" });
  }
 
  const correctPw = await user.isCorrectPassword(req.body.password);
 
  if (!correctPw) {
    return res.status(400).json({ message: 'Wrong password!' });
  }
 
  const token = signToken(user);
  res.json({ token, user });
});
 
module.exports = router;