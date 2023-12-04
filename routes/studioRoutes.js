const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const StudioController = require("../controllers/studioController");

router.get("/", isLoggedIn, StudioController.getStudio);
router.post("/createStudio", isLoggedIn, StudioController.createNewStudio);
router.post("/updateStudio", isLoggedIn, StudioController.updateStudio);
router.get("/deleteStudio/:studioId", isLoggedIn, StudioController.deleteStudio);

router.get("/manageRoom", isLoggedIn, StudioController.getRoomStudio);
router.post("/manageRoom", isLoggedIn, StudioController.createRoomStudio);
router.post("/updateAvailabilityRoom", isLoggedIn, StudioController.updateAvailabilityRoom);

module.exports = router;