import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardStats, VaccinationDrive } from '../types/vaccinationDrive';
import { dashboardService, driveService } from '../services/api';

export const DashboardPage: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [upcomingDrives, setUpcomingDrives] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, upcomingDrives] = await Promise.all([
                    dashboardService.getStats(),
                    driveService.getUpcoming(),
                ]);
                setStats({
                    totalStudents: statsData.totalStudents,
                    vaccinatedStudents: statsData.vaccinatedStudents,
                    vaccinationRate: statsData.vaccinationRate,
                    upcomingDrives: upcomingDrives
                });
            } catch (err) {
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        const fetchDrives = async () => {
            try {
                const drives = await driveService.getUpcoming();
                setUpcomingDrives(drives);
            } catch (err) {
                // handle error
            }
        };

        fetchData();
        fetchDrives();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Total Students</h3>
                                <div className="mt-2 text-3xl font-semibold text-gray-900">
                                    {stats?.totalStudents || 0}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Vaccinated Students</h3>
                                <div className="mt-2 text-3xl font-semibold text-gray-900">
                                    {stats?.vaccinatedStudents || 0}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Pending Vaccinations</h3>
                                <div className="mt-2 text-3xl font-semibold text-gray-900">
                                    {(stats?.totalStudents || 0) - (stats?.vaccinatedStudents || 0)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link
                            to="/students"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        >
                            View All Students
                        </Link>
                    </div>

                    {/* Upcoming Drives Section */}
                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">Upcoming Vaccination Drives (Next 30 Days)</h2>
                        {upcomingDrives.length === 0 ? (
                            <div>No upcoming drives.</div>
                        ) : (
                            <ul>
                                {upcomingDrives.map((drive) => (
                                    <li key={drive._id || drive.id} className="mb-2 p-4 bg-white rounded shadow">
                                        <div><strong>{drive.vaccineName || drive.name}</strong></div>
                                        <div>Date: {new Date(drive.driveDate).toLocaleDateString()}</div>
                                        <div>Location: {drive.location}</div>
                                        {/* Add more details as needed */}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Quick Navigation Links */}
                    <div className="mt-8 flex gap-4">
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            onClick={() => window.location.href = '/drives'}
                        >
                            Vaccination Drives
                        </button>
                        <button
                            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                            onClick={() => window.location.href = '/reports'}
                        >
                            Reports
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}; 