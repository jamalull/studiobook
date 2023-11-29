const { PrismaClient } = require("@prisma/client");

class ReservationController {
  constructor(){
    this.prisma = new PrismaClient();
  }

  // getReservationPage = async (req, res) => {
  //   const reservations = await this.prisma.user.findMany();

  //   res.render("pages/client/reservationPage", {user: req.user});
  // };

}


module.exports = new ReservationController();