const { PrismaClient } = require("@prisma/client");
const multer = require("multer");

//This page for store all functions that controll Studio in dashboard/backsite.
class StudioController {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getStudio = async (req, res) => {
    const studios = await this.prisma.studio.findMany();
    // const users = await this.prisma.user.findMany();

    res.render("pages/admin/studioPage", { studios, user: req.user });
  };

  createNewStudio = async (req, res) => {
    try {
      let storage = multer.diskStorage({
        destination: (req, file, callback) => {
          callback(null, "./upload");
        },
        filename: (req, file, callback) => {
          let temp_file_arr = file.originalname.split(".");
          let temp_file_name = temp_file_arr[0];
          let temp_file_extension = temp_file_arr[1];
          callback(
            null,
            temp_file_name + "-" + Date.now() + "." + temp_file_extension
          );
        },
      });
    
      let upload = multer({ storage: storage }).single("image");
      upload(req, res, async (error) => {
        const payload = req.body;
        payload.ownerId = parseInt(payload.ownerId);
        payload.room = parseInt(payload.room);
        payload.price = parseInt(payload.price);
        
        if (error) {
          return res.end("Error Uploading File");
        } else {
          console.log("Body ", payload);
          console.log("File ", req.file);
          // await this.prisma.studio.create({
          //   data: {
          //     ownerId: payload.ownerId,
          //     image: req.file.filename,
          //     name: payload.name,
          //     description: payload.description,
          //     address: payload.address,
          //     price: payload.price,
          //     category: payload.category,
          //     room: payload.room,
          //   },
          // });
        }
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
        res.status(404).send("Studio not found");
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
