import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DriveAddEditPage = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [doses, setDoses] = useState('');
  const [classes, setClasses] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
       setIsEditing(true);
      //  Fetch drive
      const dummyDrive = { id: parseInt(id), name: 'Existing Drive', date: '2024-05-22', doses: 150, classes: '8-10' };
      setName(dummyDrive.name);
      setDate(dummyDrive.date);
      setDoses(dummyDrive.doses);
      setClasses(dummyDrive.classes);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
     if (isEditing) {
      //  Update
      console.log('Update Drive', { id, name, date, doses, classes });
    } else {
      //  Add
      console.log('Add Drive', { name, date, doses, classes });
    }
    navigate('/drives');
  };

  return (
    <div>
      <h2>{isEditing ? 'Edit Drive' : 'Add Drive'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>Doses:</label>
          <input value={doses} onChange={(e) => setDoses(e.target.value)} />
        </div>
        <div>
          <label>Classes:</label>
          <input value={classes} onChange={(e) => setClasses(e.target.value)} />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate('/drives')}>Cancel</button>
      </form>
    </div>
  );
};

export default DriveAddEditPage;