import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@mui/material';

// Updated interface to match new report structure
interface ReportItem {
  studentId: string;
  name: string;
  grade: string;
  section: string;
  vaccinated: string; // "Yes" or "No"
  vaccinesReceived: string[];
  status: string;
}

const ReportPage: React.FC = () => {
  const [report, setReport] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<ReportItem[]>('http://localhost:8080/api/report')
      .then(res => {
        setReport(res.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading report...</div>;

  return (
    <div style={{ maxWidth: 1000, margin: "40px auto" }}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        style={{ fontWeight: 700, marginTop: 32 }}
      >
        Vaccination Report
      </Typography>
      <TableContainer component={Paper} style={{ marginTop: 24 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><b>Student ID</b></TableCell>
              <TableCell align="center"><b>Name</b></TableCell>
              <TableCell align="center"><b>Grade</b></TableCell>
              <TableCell align="center"><b>Section</b></TableCell>
              <TableCell align="center"><b>Vaccinated</b></TableCell>
              <TableCell align="center"><b>Vaccines Received</b></TableCell>
              <TableCell align="center"><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map(student => (
              <TableRow key={student.studentId}>
                <TableCell align="center">{student.studentId}</TableCell>
                <TableCell align="center">{student.name}</TableCell>
                <TableCell align="center">{student.grade}</TableCell>
                <TableCell align="center">{student.section}</TableCell>
                <TableCell align="center">{student.vaccinated}</TableCell>
                <TableCell align="center">
                  {student.vaccinesReceived.length > 0
                    ? student.vaccinesReceived.join(', ')
                    : '-'}
                </TableCell>
                <TableCell align="center">{student.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReportPage;
