//const stripe = require("../config/stripe"); 
//const userModel = require('../models/user.model')


import dotenv from "dotenv";
import Stripe from "stripe";
import userModel from "../models/user.model.js"

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const paymentController = async (req, res) => {
    try {
      console.log("Cuerpo de la petición:", req.body); // <--- Agrega esto

      const { amount, mode, interval, userId } = req.body;// Monto, tipo de pago y frecuencia (si es suscripción)

      if (!amount || !mode) {
        return res.status(400).json({ error: "Amount and mode are required" });
      }
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" }); // <--- Asegura que userId esté presente
      }
      // Buscar el usuario, tiene que loguearse para donar
      const user = await userModel.findById(userId);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }
      // Crear un objeto de precio para Stripe
      const priceData = {
        currency: "usd",
        product_data: {
          name: mode === "subscription" ? `Donation (${interval})` : "One-time Donation",
        },
        unit_amount: Math.round(amount * 100), // Convierte dólares a centavos
      };
  
      if (mode === "subscription") {
        priceData.recurring = { interval };
      }
  
      const price = await stripe.prices.create(priceData);
  
      // Crear una sesión de pago en Stripe
      const params = {
        submit_type: 'donate',
        mode,
        payment_method_types: ['card'],
        customer_email: user.email,
        metadata: {
            userId: user._id.toString(), //request.userId
        },
        line_items: [{
            price: price.id,
            quantity: 1
        }],
        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };
    const session = await stripe.checkout.sessions.create(params);

    res.status(200).json({ url: session.url });

    } catch (error) {
      console.error("Stripe Error:", error);
      res.status(500).json({ error: "Error creating checkout session" });
    }
  };
   