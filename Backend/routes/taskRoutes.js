const router = require("express").Router();
const c = require("../controllers/taskController");
const v = require("../middleware/validate");

router.route("/").get(c.getTasks).post(v.validateCreate, c.createTask);
router.patch("/:id/status", v.validateId, v.validateStatus, c.updateStatus);
router
  .route("/:id")
  .all(v.validateId)
  .get(c.getTask)
  .put(v.validateUpdate, c.updateTask)
  .delete(c.deleteTask);

module.exports = router;
