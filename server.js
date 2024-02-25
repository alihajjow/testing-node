const express = require('express');
const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');

const app = express();
// const secretKey = 'your_strong_secret_key'; // Replace with a secure key

app.use(cookieParser());
app.get('/', async (req, res) => {
  res.json({ message: ' successful' });
})
// app.get('/login', async (req, res) => {
//   // const { username, password } = req.body;
//
//   // Validate user credentials (replace with your logic)
//   // ...
//
//   const user = { id: 1, username: 'user1' }; // Replace with actual user data
//
//   const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
//
//   res.cookie('auth_token', token, {
//     httpOnly: true,  // Protect against client-side JavaScript access
//     secure: true,    // Only transmit over HTTPS
//     sameSite: 'Lax', // Mitigate CSRF risks
//     domain: '.testing-node-production.up.railway.app .cors-dom.000webhostapp.com', // Set appropriate domain if needed
//     path: '/'         // Make cookie accessible across paths
//   });
//
//   res.json({ message: 'Login successful' });
// });

app.listen(3000, () => console.log('SSO server listening on port 3000'));