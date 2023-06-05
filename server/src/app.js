const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { celebrate, Joi, errors, Segments } = require('celebrate');
const { auth } = require('express-oauth2-jwt-bearer');
const ReservationModel = require("./models/ReservationModel");
const formatReservation = require("./formatReservation")

const app = express();
const checkJwt = auth({
    audience: 'https://reservationizr.com',
    issuerBaseURL: `https://dev-8r4cuew5h4u0t6ck.us.auth0.com/`,
  });

app.use(cors());
app.use(express.json());

app.post(
    "/reservations", 
    checkJwt,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        partySize: Joi.number().min(0).required(),
        date: Joi.string().required(),
        userId: Joi.string().required(),
        restaurantName: Joi.string().required(),
      })
    }),
    async (req, res, next) => {
      try {
        const { body, auth } = req;
        const reservationBody = {
          createdBy: auth.payload.sub,
          ...body
        }
        const reservation = new ReservationModel(reservationBody);
        await reservation.save();
        return res.status(201).send(formatReservation(reservation));
      } catch (error) {
        
        next(error);
      }
    }
  );

app.get("/reservations", async (request, response) => {
    const reservations = await ReservationModel.find({});
    return response.status(200).send(reservations.map(formatReservation));
});

app.get("/reservations/:id", async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)){
       return res.status(400).send([{ "error": "invalid id provided" }])
    }

    const reservation = await ReservationModel.findById(id);

    if(reservation === null){
       return res.status(404).send([{ "error": "not found" }]);
    }

    res.status(200).send(formatReservation(reservation));
});

app.use(errors());

module.exports = app;
