import express, { Application } from 'express';
import { configureDependencies } from './infrastructure/config/dependencies';
import { createAppointmentRoutes } from './interface/routes/appointmentRoutes';
import { errorHandler } from './interface/middlewares/errorHandler';
import dotenv from 'dotenv'
dotenv.config()

export const createApp = (): Application => {
  const app = express();

  // Middlewares
  app.use(express.json());

  // Dependencies
  const { appointmentController } = configureDependencies();

  // Routes
  app.use('/api', createAppointmentRoutes(appointmentController));

  // Error handler
  app.use(errorHandler);

  return app;
};