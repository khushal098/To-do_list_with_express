const mongoose = require("mongoose");
const STATUSES = ["pending", "in-progress", "completed"];
const badStatus = (res) =>
  res.status(400).json({ success: false, message: `Status must be one of: ${STATUSES.join(", ")}` });

exports.validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ success: false, message: "Invalid task id" });
  next();
};

exports.validateCreate = (req, res, next) => {
  const { title, status } = req.body || {};
  if (typeof title !== "string" || !title.trim())
    return res.status(400).json({ success: false, message: "Title is required" });
  if (status !== undefined && !STATUSES.includes(status)) return badStatus(res);
  next();
};

exports.validateUpdate = (req, res, next) => {
  const { title, status } = req.body || {};
  if (title !== undefined && (typeof title !== "string" || !title.trim()))
    return res.status(400).json({ success: false, message: "Title cannot be empty" });
  if (status !== undefined && !STATUSES.includes(status)) return badStatus(res);
  next();
};

exports.validateStatus = (req, res, next) => {
  if (!STATUSES.includes((req.body || {}).status)) return badStatus(res);
  next();
};
