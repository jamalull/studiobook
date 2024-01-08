const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

class FrontSiteController {
  constructor(){
    this.prisma = new PrismaClient();
  }

  getHome = (req, res) => {
    res.render("home", {user: req.user});
  };

  getAboutUs = (req, res) => {
    res.render("pages/client/aboutUsPage", {user: req.user});
  };

  getDashboard = (req, res) => {
    res.render("pages/admin/dashboardHome", {user: req.user});
  };

  getSuccessPayment = (req, res) => {
    res.render("pages/client/successPaymentPage", {user: req.user});
  };

  getHistoryReservations = async (req, res) => { 
    const reservations = await this.prisma.reservation.findMany({
      include: {
        studio : true
      },
    });
    // console.log({reservations});
    return res.render("pages/client/myReservations", {reservations ,user: req.user});
  };

  getDetailTiketPage = async (req, res) => { 
    const id = req.params.reservationId;
    const transaction = await this.prisma.transaction.findFirst({
      where : {reservationId : id},
      include: {
        user        : true,
        reservation : {
          include : {
            studio : true
          }
        },
      },
    });
    console.log({transaction});
    return res.render("pages/client/detailTiket", {transaction ,user: req.user});
  };

  getReservationPage = async (req, res) => {
    try {
      // const studioId = req.params.studioId;
      const payload = req.body;
      const studioId = payload.studioId;
      console.log({payload});
      
      const studio = await this.prisma.studio.findUnique({
        where: { id: parseInt(studioId) },
      });

      if (!studio) {
        return res.status(404).send("Studio Not Found !");
        // return res.send("Studio Not Found !");
      }
    
      res.render("pages/client/reservationPage", {payload, studio, user: req.user});
    } catch (error) {
      res.send(error.message);
    }
  };

  getPaymentPage = async (req,res) => {
    const transactionId = req.params.transactionId;

    const transaction = await this.prisma.transaction.findUnique({
      where : {id : transactionId}
    });
    
    if (!transaction) {
      return res.status(404).send("Transaction data not found");
    }

    res.render("pages/client/paymentPage", {transaction, user: req.user});
  }

  createPayment = async (req, res) => {
    try {
      let storage = multer.diskStorage({
        destination: (req, file, callback) => {
          callback(null, "./public/upload/images/payment");
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
    
      let upload = multer({ storage: storage }).single("photoPayment");
      upload(req, res, async (error) => {
        const payload = req.body;
        payload.userId = parseInt(payload.userId);
        
        if (error) {
          return res.end("Error Uploading File");
        } else {
          console.log("Body ", payload);
          console.log("File ", req.file);
          
          await this.prisma.transaction.update({
            where: {
              id: payload.id
            },
            data: {
              photoPayment : req.file.filename,
              bank : payload.bank,
              sender : payload.sender,
              // id : id,
              // reservationId : payload.reservationId,
              // userId : payload.userId,
              // fee : fee,
              // totalPayment : total,
            },
          });
        }
      });
      
      res.redirect("/success-payment");
    } catch (error) {
      res.send(error.message);
    }
  };

  createReservation = async (req, res) => {
    try {
      const reservationId = uuidv4();
      const transactionId = uuidv4();
      const payload = req.body;
      payload.userId = parseInt(payload.userId);
      payload.studioId = parseInt(payload.studioId);
      payload.rentDate = new Date(payload.rentDate);
      payload.duration = parseInt(payload.duration);
      payload.room = parseInt(payload.room);
      payload.totalPayment = parseInt(payload.totalPayment);

      const fee = payload.totalPayment * 0.1; //tax fee 10%
      const total = payload.totalPayment + fee;

      await this.prisma.reservation.create({
        // data: payload,
        data: {
          id : reservationId,
          userId : payload.userId,
          studioId : payload.studioId,
          duration : payload.duration,
          room : payload.room,
          rentDate : payload.rentDate,
          notes : payload.notes,
        },
      });

      await this.prisma.transaction.create({
        // data: payload,
        data: {
          id : transactionId,
          reservationId : reservationId,
          userId : payload.userId,
          // photoPayment : payload.photoPayment,
          // bank : payload.bank,
          // sender : payload.sender,
          fee : fee,
          totalPayment : total,
        },
      });
      // res.render("pages/client/paymentPage", {payload, user: req.user});
      res.redirect("/payment/"+ transactionId);
    } catch (error) {
      res.send(error.message);
    }
  };

  
  completeReservation = async (req, res) => {
    try {
      const payload = req.body;
      await this.prisma.reservation.update({
        where: {
          id: payload.reservationId,
        },
        data: {
          status: "SELESAI",
        },
      });
      res.redirect(`/my-reservations`);
    } catch (error) {
      res.send(error.message);
    }
  };

  getAllListStudio = async (req, res) => {
    const studios = await this.prisma.studio.findMany();
    // const users = await this.prisma.user.findMany();

    res.render("pages/client/listStudioPage", { studios, user: req.user });
  };
  // getAllListStudio2 = async (req, res) => {
  //   const studios = await this.prisma.studio.findMany();
  //   // const users = await this.prisma.user.findMany();

  //   res.render("pages/client/listStudioPage2", { studios, user: req.user });
  // };
  // getAllListStudio3 = async (req, res) => {
  //   const studios = await this.prisma.studio.findMany();
  //   // const users = await this.prisma.user.findMany();

  //   res.render("pages/client/listStudioPage3", { studios, user: req.user });
  // };
  getDetailStudio = async (req, res) => {
    try {
      const studioId = req.params.studioId;
      const studio = await this.prisma.studio.findUnique({
        where: { id: parseInt(studioId) },
      });

      if (!studio) {
        return res.status(404).send("Studio Not Found !");
        // return res.send("Studio Not Found !");
      }

      res.render("pages/client/detailStudioPage", { studio, user: req.user });
    } catch (error) {
      res.send(error.message);
    }
  };

}


module.exports = new FrontSiteController();