const express = require("express");
const app = express();
const port = process.env.PORT || 3005; // Use an environment variable for port
const cors = require("cors");
const db = require("./models");
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
app.use(cors({origin: "http://localhost:3000"}));

// Use specific prefixes for routes
app.use("/restaurants", require("./routes/restaurantsroutes"));
app.use("/customers", require("./routes/customersroutes"));
app.use("/bookings", require("./routes/bookingroutes"));
app.use("/slots", require("./routes/slotsroutes"));
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running at localhost:${port}`);
    });
});
