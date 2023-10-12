const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const isRole = require('../middleware/isRole');
const UserController = require('../controllers/userController');
const userController = require('../controllers/userController');


router.get("/login", UserController.getLogin);
router.get("/register", UserController.getRegister);

//Route register dan Login
router.post(
    "/register",
passport.authenticate("local-signup", {
    successRedirect: "/home",
    failureRedirect: "/register",
    failureFlash: true,
    })
);
router.post(
    "/login",
    passport.authenticate("local-login", {
        successRedirect: (req, res) => {
        if (req.user.role === 1) {
            return '/admin-dashboard';
        } else {
            return '/home';
        }
        },
    failureRedirect: "/login",
    failureFlash: true,
    })
);
//Logout user
router.get("/logout", isLoggedIn, UserController.logout);
//deleted user
router.post("../user-database", isLoggedIn, isRole, userController.deleteUser);
