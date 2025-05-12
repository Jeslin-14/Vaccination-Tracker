import React, { useEffect, useState } from 'react';
import { driveService } from '../services/api';
import { VaccinationDrive } from '../types/vaccinationDrive';
import { useNavigate } from 'react-router-dom';

const DriveListPage: React.FC = () => {
  const [drives, setDrives] = useState<VaccinationDrive[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrives = async () => {
      setLoading(true);
      const data = await driveService.getAll();
      setDrives(data);
      setLoading(false);
    };
    fetchDrives();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vaccination Drives</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate('/drives/new')}
        >
          Add New Drive
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th align="center">Vaccine</th>
              <th align="center">Date</th>
              <th align="center">Doses</th>
              <th align="center">Grades</th>
              <th align="center">Location</th>
              <th align="center">Status</th>
              <th align="center">Edit</th>
            </tr>
          </thead>
          <tbody>
            {drives.map((drive) => (
              <tr key={drive.id}>
                <td align="center">{drive.vaccineName}</td>
                <td align="center">{new Date(drive.driveDate).toLocaleDateString()}</td>
                <td align="center">{drive.availableDoses}</td>
                <td align="center">{Array.isArray(drive.applicableGrades) ? drive.applicableGrades.join(', ') : drive.applicableGrades}</td>
                <td align="center">{drive.location}</td>
                <td align="center">{drive.status}</td>
                <td align="center">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => navigate(`/drives/edit/${drive.id}`)}
                    disabled={drive.status === 'CANCELLED'}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DriveListPage; 