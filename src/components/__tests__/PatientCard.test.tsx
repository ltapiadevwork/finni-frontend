import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import { PatientCard } from '../PatientCard';
import { BrowserRouter } from 'react-router-dom';
import { Patient } from '@/types/patient';
import '@testing-library/jest-dom';

const patient: Patient = {
  _id: '1234567890abcdef',
  firstName: 'John',
  middleName: 'A.',
  lastName: 'Doe',
  dateOfBirth: '1990-01-01',
  status: 'Active',
  street: '123 Main St',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
};

describe('PatientCard', () => {
  it('renders patient name and status', () => {
    render(
      <BrowserRouter>
        <PatientCard patient={patient} />
      </BrowserRouter>
    );
    expect(screen.getByText(/John A. Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Active/)).toBeInTheDocument();
    expect(screen.getByText(/123 Main St/)).toBeInTheDocument();
  });
}); 