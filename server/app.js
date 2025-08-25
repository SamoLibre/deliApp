const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const newsRoutes = require('./routes/news');
const usersRoutes = require('./routes/users');
const panelRoutes = require('./routes/panelroutes');
const dotenv = require('dotenv').config();
const uri = process.env.MONGO_URI;
const cors = require('cors');
const MongoStore = require('connect-mongo');

mongoose.connect(uri).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.log(err);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://your-frontend.onrender.com' // your deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        touchAfter: 24 * 3600 // time period in seconds
    }),
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true on Render, false locally
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // important for cross-site cookies
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
app.use(session(sessionConfig))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Only API routes
app.use('/api/news', newsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/panel', panelRoutes);

// Auth endpoints
app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ success: false, error: 'Giriş başarısız.' });
        req.logIn(user, err => {
            if (err) return next(err);
            return res.json({ success: true, user });
        });
    })(req, res, next);
});

app.get('/api/currentUser', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

app.post('/api/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({ success: false, error: 'Çıkış başarısız.' });
    }
    res.json({ success: true, message: 'Çıkış başarılı!' });
  });
});

// Serve React build static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// For any non-API route, serve index.html
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// 404 for unknown API routes
app.all('/api/*', (req, res, next) => {
    next(new ExpressError('API Route Not Found', 404))
})

// Error handler
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).json({ error: err.message })
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})


