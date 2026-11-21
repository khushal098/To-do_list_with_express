const mongoose = require("mongoose");

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) throw new Error("Mongo connection string is not set in environment variables");

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((m) => m);
  }
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.conn;
};

module.exports = connectDB;
