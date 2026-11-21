const Task = require("../models/Task");

const getAll = ({ search, status }) => {
  const filter = {};
  if (status) filter.status = status;
  if (search) {
    const rx = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ title: rx }, { description: rx }];
  }
  return Task.find(filter).sort({ createdAt: -1 });
};

const getById = (id) => Task.findById(id);
const create = (data) => Task.create(data);
const update = (id, data) => Task.findByIdAndUpdate(id, data, { new: true, runValidators: true });
const updateStatus = (id, status) => Task.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
const remove = (id) => Task.findByIdAndDelete(id);

module.exports = { getAll, getById, create, update, updateStatus, remove };
