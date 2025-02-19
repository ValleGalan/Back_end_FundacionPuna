//USAR nodemailer es mas escalable que https://web3forms.com/
//nodemailer es ilimitado
//https://web3forms.com/ usa un sevridor externo con 250 mensajes al mes
import express from 'express'

import { Contact } from '../controllers/Contact.controller.js'

const contactRoutes = express.Router()

contactRoutes.post('/send', Contact)

export default contactRoutes



