const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const ReservationController = require("../controllers/reservationController");

router.get("/", isLoggedIn, ReservationController.getManageReservationPage);
router.post("/updateStatusReservation", isLoggedIn, ReservationController.updateStatusReservation);

module.exports = router;