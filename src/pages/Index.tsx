import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PatientForm } from '@/components/PatientForm';
import { PatientList } from '@/components/PatientList';
import { UserPlus, Users, Heart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-transparent">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full glass shadow-lg border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-indigo-400 rounded-xl flex items-center justify-center shadow">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Finni Health</h1>
            <p className="text-base text-gray-500 font-medium">Patient Management Dashboard</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-2 bg-transparent">
        <div className="w-full max-w-5xl mx-auto glass p-8 md:p-12 mt-8 mb-8 shadow-xl">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-10 rounded-full bg-teal-50 p-1 shadow-inner">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2 rounded-full px-6 py-2 text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-indigo-400 data-[state=active]:text-white data-[state=active]:shadow">
                <Users className="w-5 h-5" />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="add-patient" className="flex items-center space-x-2 rounded-full px-6 py-2 text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-indigo-400 data-[state=active]:text-white data-[state=active]:shadow">
                <UserPlus className="w-5 h-5" />
                <span>Add Patient</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-6">
              <PatientList />
            </TabsContent>
            
            <TabsContent value="add-patient" className="flex justify-center">
              <PatientForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
