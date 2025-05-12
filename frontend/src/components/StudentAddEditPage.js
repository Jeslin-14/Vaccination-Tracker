// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const StudentAddEditPage = () => {
//   const [name, setName] = useState('');
//   const [className, setClassName] = useState('');
//   const [studentId, setStudentId] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();
//   const { id } = useParams(); // Get the id from the URL

//   useEffect(() => {
//     if (id) {
//       // Fetch student data for editing
//       setIsEditing(true);
//       //  Replace this with your API call to get the student data
//       const dummyStudent = { id: parseInt(id), name: 'Existing Student', class: '11A', studentId: 'S123' };
//       setName(dummyStudent.name);
//       setClassName(dummyStudent.class);
//       setStudentId(dummyStudent.studentId);
//     }
//   }, [id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isEditing) {
//       //  Update
//       console.log('Update Student', { id, name, className, studentId });
//     } else {
//       //  Add
//       console.log('Add Student', { name, className, studentId });
//     }
//     navigate('/students'); //  Go back
//   };

//   return (
//     <div>
//       <h2>{isEditing ? 'Edit Student' : 'Add Student'}</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input value={name} onChange={(e) => setName(e.target.value)} />
//         </div>
//         <div>
//           <label>Class:</label>
//           <input value={className} onChange={(e) => setClassName(e.target.value)} />
//         </div>
//          <div>
//           <label>Student ID:</label>
//           <input value={studentId} onChange={(e) => setStudentId(e.target.value)} />
//         </div>
//         <button type="submit">Save</button>
//         <button type="button" onClick={() => navigate('/students')}>Cancel</button>
//       </form>
//     </div>
//   );
// };

// export default StudentAddEditPage;