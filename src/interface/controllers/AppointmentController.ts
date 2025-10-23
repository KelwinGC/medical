import { Request, Response, NextFunction } from 'express';
import { CreateAppointmentUseCase } from '../../aplication/useCases/CreateAppointmentUseCase';
import { CreateAppointmentDto } from '../../domain/entities/Appointment';
import { GetAllAppointmentsUseCase } from '../../aplication/useCases/GetAllAppointmentsUseCase';

export class AppointmentController {
  constructor(
    private createAppointmentUseCase: CreateAppointmentUseCase,
    private getAllAppointmentsUseCase  : GetAllAppointmentsUseCase
    ) {}

  createAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const appointmentData: CreateAppointmentDto = req.body;
      
      const newAppointment = await this.createAppointmentUseCase.execute(appointmentData);

      res.status(201).json(newAppointment);
    } catch (error) {
      next(error);
    }
  };

  getAllAppointments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // const appointmentData: CreateAppointmentDto = req.body;
      
      const Appointments = await this.getAllAppointmentsUseCase.execute();

      res.status(201).json(Appointments);
    } catch (error) {
      next(error);
    }
  };
}
