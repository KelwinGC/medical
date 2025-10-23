import { randomUUID } from 'crypto';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';
import { Appointment, CreateAppointmentDto } from '../../domain/entities/Appointment';

export class CreateAppointmentUseCase {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async execute(dto: CreateAppointmentDto): Promise<Appointment> {
    const newAppointment: Appointment = {
      id: randomUUID(),
      status: 'pending',
      // createdAt: new Date(),
      ...dto,
    };

    return await this.appointmentRepository.create(newAppointment);
  }
}