import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DriveListPage = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //  Fetch drives
    const dummyDrives = [
      { id: 1, name: 'Drive 1', date: '2024-05-20', doses: 100, classes: 'All' },
      { id: 2, name: 'Drive 2', date: '2024-06-15', doses: 200, classes: '5-7' },
    ];
    setTimeout(() => {
      setDrives(dummyDrives);
      setLoading(false);
    }, 500);

  }, []);

  if (loading) {
    return <div>Loading Drives...</div>;
  }

  return (
    <div>
      <h2>Vaccination Drives</h2>
      <Link to="/drives/add">Add Drive</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Doses</th>
            <th>Classes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drives.map((drive) => (
            <tr key={drive.id}>
              <td>{drive.name}</td>
              <td>{drive.date}</td>
              <td>{drive.doses}</td>
              <td>{drive.classes}</td>
              <td>
                <Link to={`/drives/edit/${drive.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriveListPage;