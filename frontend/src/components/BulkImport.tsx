import React, { useState } from 'react';
import { Button, Card, Alert, ProgressBar } from 'react-bootstrap';
import axios from 'axios';

interface ImportResult {
    message: string;
    imported: number;
    errors: number;
    errorDetails: Array<{ row: any; error: string }>;
}

const BulkImport: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<ImportResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.type === 'text/csv') {
            setFile(selectedFile);
            setError(null);
        } else {
            setError('Please select a valid CSV file');
            setFile(null);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file first');
            return;
        }

        setUploading(true);
        setError(null);
        setResult(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post<ImportResult>(
                'http://localhost:8080/api/students/bulk-import',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setResult(response.data);
        } catch (err: any) {
            setError(err.message || 'An error occurred during upload');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Card className="mb-4">
            <Card.Header>
                <h4>Bulk Import Students</h4>
            </Card.Header>
            <Card.Body>
                <div className="mb-3">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="form-control"
                        disabled={uploading}
                    />
                    <small className="text-muted">
                        Upload a CSV file with student details. Required columns: studentId, firstName, lastName, grade, section, dateOfBirth, parentName, contactNumber
                    </small>
                </div>

                {error && (
                    <Alert variant="danger" className="mb-3">
                        {error}
                    </Alert>
                )}

                {result && (
                    <Alert variant={result.errors === 0 ? 'success' : 'warning'} className="mb-3">
                        <h5>{result.message}</h5>
                        <p>Successfully imported: {result.imported} students</p>
                        {result.errors > 0 && (
                            <>
                                <p>Errors: {result.errors}</p>
                                <div className="mt-2">
                                    <h6>Error Details:</h6>
                                    <ul>
                                        {result.errorDetails.map((detail, index) => (
                                            <li key={index}>
                                                Row: {JSON.stringify(detail.row)} - Error: {detail.error}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </Alert>
                )}

                <Button
                    variant="primary"
                    onClick={handleUpload}
                    disabled={!file || uploading}
                >
                    {uploading ? 'Uploading...' : 'Upload CSV'}
                </Button>

                {uploading && (
                    <ProgressBar className="mt-3" animated now={100} />
                )}
            </Card.Body>
        </Card>
    );
};

export default BulkImport; 