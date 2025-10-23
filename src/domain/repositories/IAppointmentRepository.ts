import { Appointment } from "../entities/Appointment";

export interface IAppointmentRepository {
  create(appointment: Appointment): Promise<Appointment>;
  findById(id: string): Promise<Appointment | null>;
  findAll(): Promise<Appointment[] | []>;
}