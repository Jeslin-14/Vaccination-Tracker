import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import StudentFormPage from './pages/StudentFormPage';
import { useAuth } from './context/AuthContext';
import StudentList from './components/StudentList';
import StudentVaccinationRecords from './pages/StudentVaccinationRecords';
import { Container } from '@mui/material';
import DriveListPage from './pages/DriveListPage';
import DriveAddEditPage from './pages/DriveAddEditPage';
import ReportPage from './pages/ReportPage';
import StudentEditForm from './components/StudentEditForm';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { driveId } = useParams();

  useEffect(() => {
    if (driveId) {
      // fetch the drive by driveId and set form state
    }
  }, [driveId]);

  return (
      <Container>
        <Routes>
        <Route path="/" element={isAuthenticated ? <DashboardPage /> : <LoginPage />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/:studentId/vaccination-records" element={<StudentVaccinationRecords />} />
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <DashboardPage />} />
          <Route path="/students/new" element={isAuthenticated ? <StudentFormPage /> : <LoginPage />} />
          <Route path="/students/:id" element={<StudentFormPage />} />
          <Route path="/students/:id/edit" element={<StudentEditForm />} />
          <Route path="/drives" element={<DriveListPage />} />
          <Route path="/drives/new" element={<DriveAddEditPage />} />
          <Route path="/drives/edit/:driveId" element={<DriveAddEditPage />} />
          <Route path="/reports" element={<ReportPage />} />
        </Routes>
      </Container>
  );
};

export default App; 