// const express = require('express');
// const cookieParser = require('cookie-parser');
//
// const app = express();
// app.use(cookieParser());
//
// // Middleware to set cookies for both domains
// app.use('/set-cookies', (req, res, next) => {
//   // Set cookie for domain1.local
//   res.cookie('cookie_domain1', 'value1', { domain: '.domain1.local', httpOnly: true, secure: true, sameSite: 'None' });
//
//   // Set cookie for domain2.local
//   res.cookie('cookie_domain2', 'value2', { domain: '.domain2.local', httpOnly: true, secure: true, sameSite: 'None' });
//
//   next();
// });
//
// // Route to handle the request
// app.get('/set-cookies', (req, res) => {
//   res.send('Cookies set successfully');
// });
//
// // Start the server
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });



















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

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

// Dummy user database
// const users = {
//   'user1': {
//     id: 'user1',
//     name: 'John Doe',
//     // Other user data...
//   }
// };

// app.post('/login', async (req, res) => {
//   // const { username, password } = req.body;
//
//   // Implement your user authentication logic here (replace this)
//   // Assuming successful login:
//   const user = {
//     id: 'user1',
//     name: 'John Doe',
//   }; // Change this to match your actual user data retrieval
//
//   const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
//
//   res.cookie('ssoToken', token, {
//     httpOnly: true,
//     secure: false, // Only send over HTTPS (recommended)
//     sameSite: 'None', // Allow cross-site requests with same origin but different protocols
//     maxAge: 3600000, // Set expiration time in milliseconds (1 hour)
//   });
//
//   return res.status(200).json({ success: token });
// });

// const verifySSOCookie = (req, res, next) => {
//   console.log('cookies', req.cookies)
//   const ssoCookie = req.cookies.ssoToken;
//
//   if (!ssoCookie) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }
//
//   try {
//     const decoded = jwt.verify(ssoCookie, secretKey);
//     const user = users[decoded.id];
//     if (!user) {
//       throw new Error('User not found');
//     }
//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: 'Invalid SSO Token' });
//   }
// };

// app.get('/protected', verifySSOCookie, (req, res) => {
//   res.json({ message: `Welcome ${req.user.name} to the protected route!` });
// });

// app.get('/server/api/ssoLogin',(req, res) => {
//   console.log(req.cookies['auth._token.local']);
//   if (req.cookies['auth._token.local']) {
//     res.cookie('cookie_domain2', req.cookies['auth._token.local'], {  httpOnly: true, secure: false, sameSite: 'None' });
//   }
//   res.cookie('not_auth', 'value2', {  httpOnly: true, secure: false, sameSite: 'None' });
//   // res.cookie('auth._token.local', 'test.jwt', {  httpOnly: true, secure: false, sameSite: 'None' });
//   res.json({
//     user: req.cookies['auth._token.local']
//   });
// });


app.get('/api/ssoLogin',(req, res) => {
  const user = {
    id: 'user1',
    name: 'John Doe',
  }; // Change this to match your actual user data retrieval

  const token = "jwt.token.test";

  res.cookie('ssoToken', token, {
    httpOnly: true,
    secure: true, // Only send over HTTPS (recommended)
    sameSite: 'None', // Allow cross-site requests with same origin but different protocols
    maxAge: 36000000, // Set expiration time in milliseconds (1 hour)
  });

  return res.status(200).json({ success: token });
});

app.get('/api/getCookies',(req, res) => {
  return res.status(200).json({ success: req.cookies });
});
app.listen(3000, () => console.log('SSO server listening on port 3000'));