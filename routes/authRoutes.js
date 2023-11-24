const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
// const isRole = require("../middleware/isRole");
const AuthController = require("../controllers/authController");
const passport = require("passport");

// router.get("/", UserController.getHome);
router.get("/login", AuthController.getLogin);
router.get("/register", AuthController.getRegister);
router.get("/logout", isLoggedIn, AuthController.getLogout);
// router.get("/dashboard", isLoggedIn, UserController.getDashboard);

//Route register dan Login
router.post(
  "/register",
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/auth/register",
    failureFlash: true,
    failureMessage: true
  })
);
router.get("/redirectLogin", (req, res) => {
  if (req.user.role === "OWNER") {
    // res.render("pages/admin/dashboardHome", {user: req.user});
    res.redirect("/dashboard");
  } else {
    // res.render("home", {user: req.user});
    res.redirect("/");
  }
});
router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect:"/auth/redirectLogin",
    failureRedirect: "/auth/login",
    failureFlash: true,
    failureMessage: true
  })
);

module.exports = router;