import React, { useEffect, useState, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StudentFormData } from '../types/student'; 
import { studentService } from '../services/api';   

const StudentEditForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<StudentFormData>({
    studentId: '',
    firstName: '',
    lastName: '',
    grade: '',
    section: '',
    dateOfBirth: '',
    parentName: '',
    contactNumber: ''
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch student data on mount
  useEffect(() => {
    const fetchStudent = async () => {
      if (id) {
        setLoading(true);
        try {
          const student = await studentService.getById(id);
          setFormData(student);
        } catch (err) {
          setError('Failed to load student data');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (id) {
        await studentService.update(id, formData);
        navigate('/students');
      }
    } catch (err) {
      setError('Failed to update student');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Student</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="studentId" className="block text-sm font-medium">Student ID</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            disabled
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="grade" className="block text-sm font-medium">Grade</label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="section" className="block text-sm font-medium">Section</label>
          <input
            type="text"
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="parentName" className="block text-sm font-medium">Parent Name</label>
          <input
            type="text"
            id="parentName"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="contactNumber" className="block text-sm font-medium">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            Save
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => navigate('/students')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentEditForm;