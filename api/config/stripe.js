//configuracion de la pasarela de pago: donar

const Stripe = require('stripe')

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

module.exports = stripe