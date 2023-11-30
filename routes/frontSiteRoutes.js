const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const FrontSiteController = require("../controllers/frontSiteController");

router.get("/", FrontSiteController.getHome);
router.get("/studios", FrontSiteController.getAllListStudio);
router.get("/studios2", FrontSiteController.getAllListStudio2);
router.get("/studios3", FrontSiteController.getAllListStudio3);
router.get("/studios/detail-studio/:studioId", FrontSiteController.getDetailStudio);
router.get("/dashboard", isLoggedIn, FrontSiteController.getDashboard);
router.get("/my-reservations", FrontSiteController.getHistoryReservations);
router.get("/success-payment", FrontSiteController.getSuccessPayment);

router.post("/detail-reservation", FrontSiteController.getReservationPage);
router.get("/detail-ticket/:reservationId", FrontSiteController.getDetailTiketPage);
router.post("/create-reservation", FrontSiteController.createReservation);
// router.get("/payment", FrontSiteController.createReservation);
router.get("/payment/:transactionId", FrontSiteController.getPaymentPage);
router.post("/payment", FrontSiteController.createPayment);
router.post("/completeReservationbyCustomer", FrontSiteController.completeReservation);

module.exports = router;