const { PrismaClient } = require("@prisma/client");

class ReservationController {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getManageReservationPage = async (req, res) => {
    const transactions = await this.prisma.transaction.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      include: {
        reservation : {
          include: {
            user: true,
            studio: true
          }
        }
      },
    });

    console.log(transactions);
    res.render("pages/admin/manageReservationPage", {transactions, user: req.user});
  };

  updateStatusReservation = async (req, res) => {
    try {
      const payload = req.body;
      await this.prisma.reservation.update({
        where: {
          id: payload.reservationId,
        },
        data: {
          status: payload.status,
        },
      });
      res.redirect(`/dashboard/reservations`);
    } catch (error) {
      res.send(error.message);
    }
  };
}


module.exports = new ReservationController();