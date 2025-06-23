import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Patient } from '@/types/patient';
import { CalendarIcon, MapPinIcon, UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard = ({ patient }: PatientCardProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Inquiry':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Onboarding':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Churned':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getFullName = () => {
    return `${patient.firstName} ${patient.middleName ? patient.middleName + ' ' : ''}${patient.lastName}`;
  };

  const getFullAddress = () => {
    const { street, city, state, zipCode } = patient;
    const parts = [street, city, state, zipCode].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'No address provided';
  };

  const handleClick = () => {
    if (patient._id) {
      navigate(`/patients/${patient._id}`);
    }
  };

  return (
    <Card
      className="w-full hover:shadow-lg transition-shadow duration-200 border border-gray-200 cursor-pointer"
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${getFullName()}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center aspect-square overflow-hidden">
              <UserIcon className="w-7 h-7 text-teal-600" style={{ objectFit: 'contain' }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{getFullName()}</h3>
              <p className="text-sm text-gray-500">ID: {patient._id?.slice(0, 8) || 'N/A'}</p>
            </div>
          </div>
          <Badge className={getStatusColor(patient.status)}>
            {patient.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-gray-600">
          <CalendarIcon className="w-4 h-4" />
          <span className="text-sm">Born: {formatDate(patient.dateOfBirth)}</span>
        </div>
        
        <div className="flex items-start space-x-2 text-gray-600">
          <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{getFullAddress()}</span>
        </div>
        
        <div className="pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            Added: {patient.createdAt ? formatDate(patient.createdAt) : 'N/A'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
