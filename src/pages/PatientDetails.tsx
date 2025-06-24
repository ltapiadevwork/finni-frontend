import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPatientById, clearCurrentPatient } from '@/store/patientSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft, UserIcon, CalendarIcon, MapPinIcon, IdCardIcon } from 'lucide-react';
import { patientApi } from '@/services/api';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentPatient, loading, error } = useAppSelector(state => state.patients);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchPatientById(id));
    }
    return () => {
      dispatch(clearCurrentPatient());
    };
  }, [dispatch, id]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDelete = async () => {
    if (!currentPatient?._id) return;
    setDeleting(true);
    try {
      await patientApi.deletePatient(currentPatient._id);
      setOpen(false);
      toast({
        title: 'Patient Deleted',
        description: 'The patient was deleted successfully.',
        variant: 'default',
      });
      navigate('/');
    } catch (err) {
      alert('Failed to delete patient.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading && !currentPatient) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={() => navigate(-1)} className="text-teal-600 underline">Go Back</button>
      </div>
    );
  }

  if (!currentPatient) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-2">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 px-4 py-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 font-medium shadow-sm border border-teal-100 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>
      <Card className="shadow-xl border border-gray-100">
        <CardHeader className="flex flex-col items-center bg-gradient-to-r from-teal-50 to-white rounded-t-xl pb-6">
          <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mb-3 shadow">
            <UserIcon className="w-10 h-10 text-teal-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-teal-800 text-center">
            {currentPatient.firstName} {currentPatient.middleName} {currentPatient.lastName}
          </CardTitle>
          <div className="mt-2 flex flex-col items-center gap-2">
            <Badge className="text-base px-3 py-1 rounded-full font-semibold tracking-wide">
              {currentPatient.status}
            </Badge>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <IdCardIcon className="w-4 h-4" />
              <span>Patient ID: <span className="font-mono text-gray-700">{currentPatient._id}</span></span>
            </div>
          </div>
        </CardHeader>
        <hr className="border-t border-gray-100" />
        <CardContent className="py-8 px-6 space-y-8">
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-teal-500" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="block text-gray-500 text-sm">Date of Birth</span>
                <span className="font-medium text-gray-900">{formatDate(currentPatient.dateOfBirth)}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-sm">Status</span>
                <span className="font-medium text-gray-900">{currentPatient.status}</span>
              </div>
            </div>
          </section>
          <hr className="border-t border-gray-100" />
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-teal-500" />
              Address
            </h3>
            <div className="space-y-1">
              <div className="text-gray-900 font-medium">{[
                currentPatient.street,
                currentPatient.city,
                currentPatient.state,
                currentPatient.zipCode,
              ].filter(Boolean).join(', ') || 'N/A'}</div>
            </div>
          </section>
          <hr className="border-t border-gray-100" />
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Record Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="block text-gray-500 text-sm">Created At</span>
                <span className="font-medium text-gray-900">{formatDate(currentPatient.createdAt)}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-sm">Updated At</span>
                <span className="font-medium text-gray-900">{formatDate(currentPatient.updatedAt)}</span>
              </div>
            </div>
          </section>
          <div className="flex justify-end pt-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                >
                  Delete Patient
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Patient</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this patient? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <button className="px-4 py-2 rounded-lg border mr-2" disabled={deleting}>
                      Cancel
                    </button>
                  </DialogClose>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDetails; 
