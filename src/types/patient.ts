export interface Patient {
  _id?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  status: PatientStatus;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface CreatePatientRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  status: PatientStatus;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export type PatientStatus = 'Inquiry' | 'Onboarding' | 'Active' | 'Churned';

export const PATIENT_STATUSES: PatientStatus[] = ['Inquiry', 'Onboarding', 'Active', 'Churned'];
