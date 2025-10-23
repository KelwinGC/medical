import { Appointment } from '../entities/Appointment';

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<number>;
  // findById(id: string): Promise<Appointment | null>;
  // findConflicts(doctorId: string, startAt: Date, endAt: Date | null): Promise<Appointment[]>;
}