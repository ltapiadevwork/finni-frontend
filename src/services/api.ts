import axios from 'axios';
import { Patient, CreatePatientRequest } from '../types/patient';
import { BASE_URL } from '../config';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    // We will refactor to use loger like sentry or rollbar
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const patientApi = {
  // Create a new patient
  createPatient: async (patientData: CreatePatientRequest): Promise<Patient> => {
    const response = await api.post<Patient>('/patients', patientData);
    return response.data;
  },

  // Get all patients
  getPatients: async (): Promise<Patient[]> => {
    const response = await api.get<Patient[]>('/patients');
    return response.data;
  },

  // Get patient by ID
  getPatientById: async (id: string): Promise<Patient> => {
    const response = await api.get<Patient>(`/patients/${id}`);
    return response.data;
  },

  // Update patient
  updatePatient: async (id: string, patientData: Partial<CreatePatientRequest>): Promise<Patient> => {
    const response = await api.put<Patient>(`/patients/${id}`, patientData);
    return response.data;
  },

  // Delete patient
  deletePatient: async (id: string): Promise<void> => {
    await api.delete(`/patients/${id}`);
  },
};

export default api; 