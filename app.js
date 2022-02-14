const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const port = 6666;
const mongoose = require('mongoose');

// dotenv.config({ path: './config/config.env' });

// Template Engine ejs
app.set('view engine', 'ejs');
// Static Files
app.use(express.static('public'));
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// for parsing cookies
app.use(cookieParser());

// MongoDB Connection
const connectDB = require('./models/connection');
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

//router
const adminRouter = require('./routes/admin');
const readerRouter = require('./routes/reader');
const authRouter = require('./routes/auth');
app.use(adminRouter);
app.use(readerRouter);
app.use(authRouter);
