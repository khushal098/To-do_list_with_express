require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
const origins = (process.env.CLIENT_URL || "http://localhost:5173").split(",").map((s) => s.trim());

app.use(cors({ origin: origins }));
app.use(express.json());

// Make sure the DB is connected before handling a request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.get("/api", (req, res) => res.json({ success: true, message: "To-Do API is running" }));
app.use("/api/tasks", taskRoutes);
app.use(notFound);
app.use(errorHandler);

// Only listen locally. Vercel handles this itself.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
