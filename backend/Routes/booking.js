import express from 'express'
import {authenticate} from './../auth/verifiedAuth.js'
import { getCheckoutSession } from '../Controller/bookingController.js'

const router = express.Router()

router.post('/checkout-session/:doctorId', authenticate, getCheckoutSession);

export default router;