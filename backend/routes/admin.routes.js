import express from 'express'
import appointmentModel from '../models/appointment.model.js';
import {allAppointments,operationAppointment } from '../controllers/adminController.js';
const router= express.Router();

router.get('/appointments',allAppointments)


router.put("/appointments/:id",operationAppointment );


export default router