const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require('./routes/user.routes');
const errorHandler = require("./middleware/error.middleware");


const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AngularHub Backend Running",
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

/*
404 Route
*/

app.use((req, res) => {
  res.status(404).json({
    success: false,

    message: "Route Not Found",
  });
});

/*
Global Error Handler
*/

app.use(errorHandler);

module.exports = app;
