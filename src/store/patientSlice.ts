import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Patient, CreatePatientRequest } from '../types/patient';
import { patientApi } from '../services/api';

export interface PatientState {
  patients: Patient[];
  currentPatient: Patient | null;
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  createError: string | null;
}

const initialState: PatientState = {
  patients: [],
  currentPatient: null,
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
};

// Async thunks
export const createPatient = createAsyncThunk(
  'patients/createPatient',
  async (patientData: CreatePatientRequest, { rejectWithValue }) => {
    try {
      const response = await patientApi.createPatient(patientData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create patient');
    }
  }
);

export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await patientApi.getPatients();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch patients');
    }
  }
);

export const fetchPatientById = createAsyncThunk(
  'patients/fetchPatientById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await patientApi.getPatientById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch patient');
    }
  }
);

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.createError = null;
    },
    clearCurrentPatient: (state) => {
      state.currentPatient = null;
    },
    resetCreateState: (state) => {
      state.createLoading = false;
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    // Create patient
    builder
      .addCase(createPatient.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createPatient.fulfilled, (state, action: PayloadAction<Patient>) => {
        state.createLoading = false;
        state.patients.push(action.payload);
        state.currentPatient = action.payload;
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload as string;
      });

    // Fetch patients
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action: PayloadAction<Patient[]>) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch patient by ID
    builder
      .addCase(fetchPatientById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientById.fulfilled, (state, action: PayloadAction<Patient>) => {
        state.loading = false;
        state.currentPatient = action.payload;
      })
      .addCase(fetchPatientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentPatient, resetCreateState } = patientSlice.actions;
export default patientSlice.reducer; 