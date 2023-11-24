const { PrismaClient } = require("@prisma/client");

class ReservationController {
  constructor(){
    this.prisma = new PrismaClient();
  }

  // getReservationPage = (req, res) => {


  //   res.render("reservationPage", {user: req.user});
  // };

}


module.exports = new ReservationController();