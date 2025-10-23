export interface Appointment {
  id: string;
  insureId?: string;
  scheduleId?: number;
  // createdAt: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface CreateAppointmentDto {
  insureId?: string;
  scheduleId?: number;
  countryISO?: 'PE|CL';
}