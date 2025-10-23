import { randomUUID } from 'crypto';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';
import { Appointment } from '../../domain/entities/Appointment';

export class GetAllAppointmentsUseCase {
  
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async execute(): Promise<Appointment[]> {

    return await this.appointmentRepository.findAll();
  }
}