import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './patientSlice';

export const store = configureStore({
  reducer: {
    patients: patientReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['patients/createPatient/pending', 'patients/createPatient/fulfilled', 'patients/createPatient/rejected'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 