// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Student } from '../types/student';

// const StudentListPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [students, setStudents] = useState<Student[]>([]);

//   const handleEdit = (student: Student) => {
//     navigate(`/students/${student._id}`);
//   };

//   return (
//     <div>
//       {students.map(student => (
//         <div key={student._id}>
//           {/* Render student details */}
//           <button
//             className="text-blue-600 hover:underline"
//             onClick={() => handleEdit(student)}
//           >
//             Edit
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StudentListPage;
