const { PrismaClient } = require("@prisma/client");

class StudioController {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getStudio = async (req, res) => {
    const studios = await this.prisma.studio.findMany();
    const users = await this.prisma.user.findMany();

    res.render("pages/admin/studioPage", { studios, users, user: req.user });
  };

  createNewStudio = async (req, res) => {
    try {
      const payload = req.body;
      payload.ownerId = parseInt(payload.ownerId);
      payload.room = parseInt(payload.room);
      payload.price = parseInt(payload.price);
      await this.prisma.studio.create({
        data: payload,
      });
      res.redirect(`/dashboard/studios`);
    } catch (error) {
      res.send(error.message);
    }
  };

  updateStudio = async (req, res) => {
    try {
      const payload = req.body;

      // const ownerId = parseInt(payload.ownerId);
      const studioId = parseInt(payload.studioId);
      payload.price = parseInt(payload.price);
      payload.room = parseInt(payload.room);

      await this.prisma.studio.update({
        where: {
          id: studioId,
        },
        data: {
          image: payload.image,
          name: payload.name,
          category: payload.category,
          description: payload.description,
          address: payload.address,
          price: payload.price,
          room: payload.room,
          // updatedAt: new Date()
        },
      });
      res.redirect(`/dashboard/studios`);
    } catch (error) {
      res.send(error.message);
    }
  };

  deleteStudio = async (req, res) => {
    try {
      const studioId = req.params.studioId;
      const studio = await this.prisma.studio.findUnique({
        where: { id: parseInt(studioId) },
      });

      if (!studio) {
        res.send("Studio not found");
      }

      await this.prisma.studio.delete({
        where: {
          id: parseInt(studioId),
        },
      });

      res.redirect(`/dashboard/studios`);
    } catch (error) {
      res.send(error.message);
    }
  };
}

module.exports = new StudioController();
