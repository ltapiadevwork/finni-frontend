import { z } from 'zod';

export const createPatientSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
  
  middleName: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 1, 'Middle name must be at least 1 character if provided')
    .refine((val) => !val || val.length <= 50, 'Middle name must be less than 50 characters')
    .refine((val) => !val || /^[a-zA-Z\s]+$/.test(val), 'Middle name can only contain letters and spaces'),
  
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
  
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Ignore time
      return !isNaN(date.getTime()) && date < today && today.getFullYear() - date.getFullYear() <= 120;
    }, 'Please enter a valid date of birth (must be earlier than today and age must be between 0 and 120)'),
  
  status: z.enum(['Inquiry', 'Onboarding', 'Active', 'Churned'], {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),
  
  street: z
    .string()
    .min(1, 'Street address is required')
    .min(5, 'Street address must be at least 5 characters')
    .max(100, 'Street address must be less than 100 characters')
    .regex(/^[a-zA-Z0-9\s]+$/, 'Street address can only contain letters, numbers, and spaces'),
  
  city: z
    .string()
    .min(1, 'City is required')
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'City can only contain letters and spaces'),
  
  state: z
    .string()
    .min(1, 'State is required')
    .length(2, 'State must be exactly 2 characters')
    .regex(/^[A-Z]{2}$/, 'State must be a valid 2-letter state code'),
  
  zipCode: z
    .string()
    .min(1, 'ZIP code is required')
    .regex(/^\d{5}(-\d{4})?$/, 'ZIP code must be in format 12345 or 12345-6789'),
});

export type CreatePatientFormData = z.infer<typeof createPatientSchema>;

export const validatePatientData = (data: unknown): CreatePatientFormData => {
  return createPatientSchema.parse(data);
};

export const validatePatientDataSafe = (data: unknown) => {
  return createPatientSchema.safeParse(data);
}; 