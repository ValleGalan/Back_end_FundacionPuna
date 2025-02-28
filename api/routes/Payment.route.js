 import dotenv from "dotenv";
 import { paymentController } from '../controllers/Payment.controller.js'
 import { authenticate } from '../middleware/authenticate.js'
 import express from "express";

 const PaymentRoute = express.Router();
 
PaymentRoute.post('/payment', authenticate, paymentController)
export default PaymentRoute

/*
const paymentController = async (req, res) => {
  try {
    const { amount, mode, interval } = req.body;

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
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode,
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Error creating checkout session" });
  }
};

export default paymentController;

*/

