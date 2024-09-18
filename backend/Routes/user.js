import express from 'express'
import {updateUser,deleteUser,getSingleUser,getAllUser, getUserProfile, getMyAppointment} from "../Controller/userConttroler.js";

import { authenticate,restrict } from '../auth/verifiedAuth.js';

const router = express.Router()

router.get('/:id',authenticate,restrict(['patient']),getSingleUser)
router.get('/',authenticate,restrict(['admin']),getAllUser)
router.post('/:id',authenticate,restrict(['patient']),updateUser)
router.delete('/:id',authenticate,restrict(['patient']),deleteUser)
router.get('/profile/me',authenticate,restrict(['patient']),getUserProfile)
router.get('/appointments/my-appointnments',authenticate,restrict(['patient']),getMyAppointment)


export default router;