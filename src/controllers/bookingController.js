const router = require("express").Router();
const {
  getAllBooking,
  createBooking,
  addVehicle,
  addSlot,
  getAllSlots,
  getVehicle,
  deleteBooking,
} = require("../services/bookingService");
const { validateToken } = require("../utils/jwt");

router.get("/all", validateToken, (req, res) => {
  try {
    getAllBooking(req, res);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", validateToken, (req, res) => {
  try {
    createBooking(req, res);
  } catch (error) {
    console.log(error);
  }
});
router.post("/add-vechicle", validateToken, (req, res) => {
  try {
    addVehicle(req, res);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add-slot", validateToken, (req, res) => {
  try {
    addSlot(req, res);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/allSlots", validateToken, (req, res) => {
  try {
    getAllSlots(req, res);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/getVehicle", validateToken, (req, res) => {
  try {
    getVehicle(req, res);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.delete("/:id", validateToken, (req, res) => {
  try {
    const bookingId = req.params.id;
    deleteBooking(req, res, bookingId);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.delete("/vehicle/:id", validateToken, (req, res) => {
  try {
    const vehicleId = req.params.id;
    removeVehicle(req, res, vehicleId);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
