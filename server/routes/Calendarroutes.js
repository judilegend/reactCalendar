const router = require("express").Router();
const {
  getAll,
  createEvent,
  DeleteEvent,
  updateEvent,
} = require("../controllers/calendarController");

router.get("/get-event", getAll);
router.post("/create-event", createEvent);
router.delete("/delete-event/:id", DeleteEvent);
router.put("/update-event/:id", updateEvent);
module.exports = router;
