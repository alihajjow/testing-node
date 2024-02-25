const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'your_strong_secret_key'; // Replace with a secure key

app.use(cookieParser());

// Dummy user database
const users = {
  'user1': {
    id: 'user1',
    name: 'John Doe',
    // Other user data...
  }
};

app.get('/', async (req, res) => {
  const authCookie = req.cookies['ssoToken'];
  if (!authCookie) {
    return res.status(401).json({ error: 'Unauthorizjed' });
  }

  try {
    const decoded = jwt.verify(authCookie, secretKey);
    const user = users[decoded.id];
    if (!user) {
      throw new Error('User not found');
    }
    res.json({ message: `Welcome ${user.name}!` });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid SSO Token' });
  }
});

app.post('/login', async (req, res) => {
  // const { username, password } = req.body;

  // Validate user credentials (replace with your logic)
  // ...

  const user = { id: 'user1', username: 'user1' }; // Replace with actual user data

  const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

  res.cookie('ssoToken', token, {
    httpOnly: true,
    secure: true, // Only send over HTTPS (recommended)
    sameSite: 'None', // Allow cross-site requests with same origin but different protocols
    maxAge: 3600000 // Set expiration time in milliseconds (1 hour)
  });
  return res.status(401).json({ error: 'Invalid SSO Token' });
  // res.redirect('/protected');
});

const verifySSOCookie = (req, res, next) => {
  const ssoCookie = req.cookies.ssoToken;

  if (!ssoCookie) {
    return res.status(401).json({ error: 'Unauthorizeddd' });
  }

  try {
    const decoded = jwt.verify(ssoCookie, secretKey);
    const user = users[decoded.id];
    if (!user) {
      throw new Error('User not found');
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid SSO Token' });
  }
};

app.post('/protected', verifySSOCookie, (req, res) => {
  res.json({ message: `Welcome ${req.user.name} to the protected route!` });
});

app.listen(3000, () => console.log('SSO server listening on port 3000'));