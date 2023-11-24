const { PrismaClient } = require("@prisma/client");

class AuthController {
  constructor() {
    this.prisma = new PrismaClient();
  }

  // getHome = (req, res) => {
  //   res.render("home", {user: req.user});
  // };

  // getDashboard = (req, res) => {
  //   res.render("pages/admin/dashboardHome", {user: req.user});
  // };

  getLogin = (req, res) => {
    // res.render("login");
    res.render("authPage");
  };

  getRegister = (req, res) => {
    // res.render("register");
    res.render("authPage");
  };

  getLogout = (req, res) => {
    req.logout(function (err) {
      if (err) {
        throw err;
      }
      res.redirect("/");
    });
  };

  // deleteUser = async (res, req) => {
  //   const userId = req.params.id;
  //   try {
  //     await prisma.user.delete({
  //       where: { id: userId },
  //     });
  //     res.redirect("/admin-dashboard/user-database");
  //   } catch (error) {
  //     res.send(error.message);
  //   }
  // };
}

module.exports = new AuthController();
