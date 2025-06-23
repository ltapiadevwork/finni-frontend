/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/__tests__/PatientForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PatientForm } from '../PatientForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import patientReducer from '@/store/patientSlice';
import { PatientStatus } from '@/types/patient';

// --- 🔔 MOCK useToast hook ---
const toastMock = jest.fn();
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: toastMock }),
}));

// --- 🛠 MOCK createPatient thunk ---
import * as patientSlice from '@/store/patientSlice';

jest.spyOn(patientSlice, 'createPatient').mockImplementation(() => {
  const promise: any = Promise.resolve({
    type: 'patients/createPatient/fulfilled',
    payload: {},
  });
  promise.unwrap = () => Promise.resolve({});
  return () => promise;
});

// Add the missing static properties for Redux Toolkit
(patientSlice.createPatient as any).pending = { type: 'patients/createPatient/pending' };
(patientSlice.createPatient as any).fulfilled = { type: 'patients/createPatient/fulfilled' };
(patientSlice.createPatient as any).rejected = { type: 'patients/createPatient/rejected' };

// --- 🧪 RENDER HELPER ---
function renderWithStore() {
  const store = configureStore({
    reducer: { patients: patientReducer },
  });

  return render(
    <Provider store={store}>
      <PatientForm />
    </Provider>
  );
}

// --- ✅ TEST CASES ---
describe('PatientForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form fields', () => {
    renderWithStore();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street Address/i)).toBeInTheDocument();
  });

  it('shows validation error if required fields are missing', async () => {
    renderWithStore();

    fireEvent.click(screen.getByRole('button', { name: /create patient/i }));

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Validation Error',
          description: expect.stringMatching(/Please fix the errors in the form/i),
          variant: 'destructive',
        })
      );
    });
  });

  it('shows success toast on valid submit', async () => {
    renderWithStore();

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText(/Street Address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText(/State/i), { target: { value: 'NY' } });
    fireEvent.change(screen.getByLabelText(/ZIP Code/i), { target: { value: '10001' } });
    // Assuming status defaults to "Inquiry"

    fireEvent.click(screen.getByRole('button', { name: /create patient/i }));

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Success',
          description: expect.stringMatching(/Patient created successfully/i),
        })
      );
    });
  });
});
