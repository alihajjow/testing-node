const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const secretKey = 'your_strong_secret_key'; // Replace with a secure key

app.use(cookieParser());
app.use(cors({
  origin: ['http://127.0.0.1', 'http://localhost', "http://domain1.local", "http://domain2.local", "https://cors-dom.000webhostapp.com"],
  credentials: true
}));

app.get('/api/ssoLogin', (req, res) => {

  const user = {
    id: 'user1',
    name: 'John Doe',
  }; // Change this to match your actual user data retrieval

  const token = jwt.sign(user, secretKey, {expiresIn: '1h'});

  res.cookie('ssoToken', token, {
    httpOnly: true,
    secure: true, // Only send over HTTPS (recommended)
    sameSite: 'None', // Allow cross-site requests with same origin but different protocols
    maxAge: 36000000, // Set expiration time in milliseconds (1 hour)
  });

  return res.status(200).json({success: token});
});

const verifySSOCookie = (req, res, next) => {
  console.log('cookies', req.cookies)
  const ssoCookie = req.cookies.ssoToken;

  if (!ssoCookie) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    req.user = jwt.verify(ssoCookie, secretKey);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid SSO Token' });
  }
};

app.get('/api/getCookies', verifySSOCookie, (req, res) => {
  return res.status(200).json({success: req.user});
});
app.listen(3000, () => console.log('SSO server listening on port 3000'));