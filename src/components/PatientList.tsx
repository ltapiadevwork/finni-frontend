import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PatientCard } from './PatientCard';
import { PatientStatus, PATIENT_STATUSES } from '@/types/patient';
import { Search, Filter, Loader2, RefreshCw, Users } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPatients } from '@/store/patientSlice';
import { Button } from '@/components/ui/button';

export const PatientList = () => {
  const dispatch = useAppDispatch();
  const { patients, loading, error } = useAppSelector((state) => state.patients);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PatientStatus | 'All'>('All');

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchPatients());
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.middleName && patient.middleName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => {
    const counts = PATIENT_STATUSES.reduce((acc, status) => {
      acc[status] = patients.filter(p => p.status === status).length;
      return acc;
    }, {} as Record<PatientStatus, number>);
    return counts;
  };

  const statusCounts = getStatusCounts();

  if (loading && patients.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-teal-600" />
          <p className="text-gray-600">Loading patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Header and Stats */}
      <Card className="bg-gradient-to-r from-teal-50 to-indigo-50 border-0 shadow-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-extrabold text-teal-700 flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-400" /> Patient Dashboard
            </CardTitle>
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              disabled={loading}
              className="flex items-center gap-2 border-teal-200 bg-white hover:bg-teal-50 shadow"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-6" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {PATIENT_STATUSES.map(status => (
              <div key={status} className="text-center p-4 rounded-xl bg-white shadow-sm border border-teal-100">
                <div className="text-3xl font-extrabold text-gray-700">{statusCounts[status]}</div>
                <div className="text-sm text-gray-500 font-semibold tracking-wide uppercase mt-1">{status}</div>
              </div>
            ))}
          </div>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search patients by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-full border-teal-200 shadow-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as PatientStatus | 'All')}>
                <SelectTrigger className="w-40 rounded-full border-teal-200 shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  {PATIENT_STATUSES.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Grid */}
      {filteredPatients.length === 0 ? (
        <Card className="bg-white/80 border-0 shadow-md flex flex-col items-center py-16">
          <CardContent className="flex flex-col items-center">
            <img src="/public/placeholder.svg" alt="No patients" className="w-32 h-32 mb-6 opacity-60" />
            <div className="text-gray-400 text-lg font-medium mb-2">
              {patients.length === 0 ? 'No patients added yet' : 'No patients match your search criteria'}
            </div>
            <div className="text-gray-400 text-sm">Try adding a new patient or adjusting your search/filter.</div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPatients.map(patient => (
            <div key={patient._id} className="transition-transform duration-200 hover:scale-[1.03]">
              <PatientCard patient={patient} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
