import { AppointmentController } from "../../interface/controllers/AppointmentController";
import { DynamoDBAppointmentRepository } from "../database/DynamoDBAppointmentRepository";
import {  GetAllAppointmentsUseCase } from '../../aplication/useCases/GetAllAppointmentsUseCase';
import {  CreateAppointmentUseCase } from '../../aplication/useCases/CreateAppointmentUseCase';

export const configureDependencies = () => {
  // Repositories
  const appointmentRepository = new DynamoDBAppointmentRepository(
    process.env.AWS_REGION || 'us-east-1',
    process.env.DYNAMODB_TABLE || 'appointments'
  );

  // Use Cases
  const createAppointmentUseCase = new CreateAppointmentUseCase(appointmentRepository);
  const getAllAppointmentsUseCase = new GetAllAppointmentsUseCase(appointmentRepository);

  // Controllers
  const appointmentController = new AppointmentController(createAppointmentUseCase,getAllAppointmentsUseCase);

  return {
    appointmentController,
    createAppointmentUseCase,
    getAllAppointmentsUseCase,
  };
};