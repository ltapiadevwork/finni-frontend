import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PatientStatus, PATIENT_STATUSES } from '@/types/patient';
import { useToast } from '@/hooks/use-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createPatient, resetCreateState } from '@/store/patientSlice';
import { validatePatientDataSafe, CreatePatientFormData } from '@/lib/validation';
import { CreatePatientRequest } from '@/types/patient';
import { Loader2, UserPlus, MapPinIcon, CalendarIcon } from 'lucide-react';

export const PatientForm = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { createLoading, createError } = useAppSelector((state) => state.patients);
  
  const [formData, setFormData] = useState<CreatePatientRequest>({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    status: 'Inquiry',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Reset form state when component unmounts or when create is successful
  useEffect(() => {
    return () => {
      dispatch(resetCreateState());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous validation errors
    setValidationErrors({});

    // Validate form data
    const validationResult = validatePatientDataSafe(formData);
    
    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      validationResult.error.errors.forEach((error) => {
        const field = error.path.join('.');
        errors[field] = error.message;
      });
      setValidationErrors(errors);
      
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive"
      });
      return;
    }

    try {
      await dispatch(createPatient(formData)).unwrap();
      
      // Reset form on success
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        status: 'Inquiry',
        street: '',
        city: '',
        state: '',
        zipCode: ''
      });

      toast({
        title: "Success",
        description: "Patient created successfully!",
      });
    } catch (error) {
      // Error is handled by Redux slice
      console.error('Failed to create patient:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const getFieldError = (field: string) => {
    return validationErrors[field];
  };

  return (
    <Card className="w-full max-w-2xl glass shadow-xl border-0">
      <CardHeader className="flex flex-col items-center bg-gradient-to-r from-teal-50 to-indigo-50 rounded-t-xl pb-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-indigo-400 flex items-center justify-center mb-2 shadow">
          <UserPlus className="w-7 h-7 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-teal-800 text-center">Add New Patient</CardTitle>
      </CardHeader>
      <CardContent className="py-8 px-6 space-y-8">
        {createError && (
          <Alert className="mb-6" variant="destructive">
            <AlertDescription>{createError}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Fields */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-teal-500" /> Patient Name
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                  className={getFieldError('firstName') ? 'border-red-500' : ''}
                />
                {getFieldError('firstName') && (
                  <p className="text-sm text-red-500">{getFieldError('firstName')}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange('middleName', e.target.value)}
                  placeholder="Enter middle name"
                  className={getFieldError('middleName') ? 'border-red-500' : ''}
                />
                {getFieldError('middleName') && (
                  <p className="text-sm text-red-500">{getFieldError('middleName')}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                  className={getFieldError('lastName') ? 'border-red-500' : ''}
                />
                {getFieldError('lastName') && (
                  <p className="text-sm text-red-500">{getFieldError('lastName')}</p>
                )}
              </div>
            </div>
          </section>
          <hr className="border-t border-gray-100" />
          {/* Date of Birth and Status */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-teal-500" /> Patient Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className={getFieldError('dateOfBirth') ? 'border-red-500' : ''}
                />
                {getFieldError('dateOfBirth') && (
                  <p className="text-sm text-red-500">{getFieldError('dateOfBirth')}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label id="status-label" htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger id="status" aria-labelledby="status-label" className={getFieldError('status') ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select patient status" />
                  </SelectTrigger>
                  <SelectContent>
                    {PATIENT_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {getFieldError('status') && (
                  <p className="text-sm text-red-500">{getFieldError('status')}</p>
                )}
              </div>
            </div>
          </section>
          <hr className="border-t border-gray-100" />
          {/* Address Fields */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-teal-500" /> Address Information
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address *</Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  placeholder="Enter street address"
                  className={getFieldError('street') ? 'border-red-500' : ''}
                />
                {getFieldError('street') && (
                  <p className="text-sm text-red-500">{getFieldError('street')}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Enter city"
                    className={getFieldError('city') ? 'border-red-500' : ''}
                  />
                  {getFieldError('city') && (
                    <p className="text-sm text-red-500">{getFieldError('city')}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value.toUpperCase())}
                    placeholder="e.g., NY"
                    maxLength={2}
                    className={getFieldError('state') ? 'border-red-500' : ''}
                  />
                  {getFieldError('state') && (
                    <p className="text-sm text-red-500">{getFieldError('state')}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="e.g., 10001"
                    className={getFieldError('zipCode') ? 'border-red-500' : ''}
                  />
                  {getFieldError('zipCode') && (
                    <p className="text-sm text-red-500">{getFieldError('zipCode')}</p>
                  )}
                </div>
              </div>
            </div>
          </section>
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full py-4 text-lg font-bold bg-gradient-to-r from-teal-400 to-indigo-400 hover:from-teal-500 hover:to-indigo-500 rounded-full shadow-lg transition"
              disabled={createLoading}
            >
              {createLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Patient...
                </>
              ) : (
                'Create Patient'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
