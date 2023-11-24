const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const FrontSiteController = require("../controllers/frontSiteController");

router.get("/", FrontSiteController.getHome);
router.get("/studios", FrontSiteController.getAllListStudio);
router.get("/studios2", FrontSiteController.getAllListStudio2);
router.get("/studios3", FrontSiteController.getAllListStudio3);
router.get("/studios/detail-studio/:studioId", FrontSiteController.getDetailStudio);
router.get("/dashboard", isLoggedIn, FrontSiteController.getDashboard);

router.post("/detail-reservation", FrontSiteController.getReservationPage);
router.post("/create-reservation", FrontSiteController.createReservation);
// router.get("/payment", FrontSiteController.createReservation);
router.get("/payment/:transactionId", FrontSiteController.getPaymentPage);
router.post("/payment", FrontSiteController.createPayment);

module.exports = router;