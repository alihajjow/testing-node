const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const secretKey = 'your_strong_secret_key'; // Replace with a secure key

app.use(cookieParser());
app.use(cors({ origin: 'https://cors-dom.000webhostapp.com', credentials: true }));

// Dummy user database
const users = {
  'user1': {
    id: 'user1',
    name: 'John Doe',
    // Other user data...
  }
};

app.post('/login', async (req, res) => {

  const user = { id: 'user1', name: 'John Doe' }; // Replace with actual user data

  const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

  res.cookie('ssoToken', token, {
    httpOnly: true,
    secure: true, // Only send over HTTPS (recommended)
    sameSite: 'None', // Allow cross-site requests with same origin but different protocols
    maxAge: 3600000 // Set expiration time in milliseconds (1 hour)
  });
  return res.status(200).json({ success: 'valid SSO Token' });
  // res.redirect('/protected');
});

const verifySSOCookie = (req, res, next) => {
  const ssoCookie = req.cookies.ssoToken;

  if (!ssoCookie) {
    return res.status(401).json({ error: 'Unauthorized' });
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