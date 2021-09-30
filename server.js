require("dotenv").config();
// Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");

// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));
app.use(methodOverride("_method"));

// Database Configuration
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Routes / Controllers

//Users Create action --> Register a new user
const userController = require("./controllers/users");
app.use("/users", userController);
//Sessions Create action ---> Creates cookie, logs a user in
const sessionsController = require("./controllers/sessions");
app.use("/sessions", sessionsController);

// Temporary root route. Please remove me when you add views:
// app.get("/", (req, res) => {
//     res.send("Root route");
//   });

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));
