import { Router } from 'express';
import { AppointmentController } from '../controllers/AppointmentController';

export const createAppointmentRoutes = (controller: AppointmentController): Router => {
  const router = Router();
  
  router.post('/appointments', controller.createAppointment);
  router.get('/appointments', controller.getAllAppointments);
  
  return router;
};