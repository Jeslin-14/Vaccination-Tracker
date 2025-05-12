import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import BulkImport from '../components/BulkImport';

const Students: React.FC = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    
    return (
        <div className="container mt-4">
            <h2>Students</h2>
            
            <BulkImport />
            
            <div className="mb-3">
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                    Add New Student
                </Button>
            </div>
        </div>
    );
};

export default Students; 