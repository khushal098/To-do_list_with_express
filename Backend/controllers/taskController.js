const service = require("../services/taskService");

const pick = ({ title, description, status }) => {
  const out = {};
  if (title !== undefined) out.title = title;
  if (description !== undefined) out.description = description;
  if (status !== undefined) out.status = status;
  return out;
};

const notFound = (res) => res.status(404).json({ success: false, message: "Task not found" });

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await service.getAll(req.query);
    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (e) { next(e); }
};

exports.getTask = async (req, res, next) => {
  try {
    const task = await service.getById(req.params.id);
    if (!task) return notFound(res);
    res.json({ success: true, data: task });
  } catch (e) { next(e); }
};

exports.createTask = async (req, res, next) => {
  try {
    const task = await service.create(pick(req.body));
    res.status(201).json({ success: true, data: task });
  } catch (e) { next(e); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await service.update(req.params.id, pick(req.body));
    if (!task) return notFound(res);
    res.json({ success: true, data: task });
  } catch (e) { next(e); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const task = await service.updateStatus(req.params.id, req.body.status);
    if (!task) return notFound(res);
    res.json({ success: true, data: task });
  } catch (e) { next(e); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await service.remove(req.params.id);
    if (!task) return notFound(res);
    res.json({ success: true, message: "Task deleted" });
  } catch (e) { next(e); }
};
