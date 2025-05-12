import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Event as EventIcon,
    Assessment as AssessmentIcon,
    ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

export const Navigation: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Vaccination Tracker
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        color="inherit"
                        startIcon={<DashboardIcon />}
                        onClick={() => navigate('/dashboard')}
                    >
                        Dashboard
                    </Button>
                    <Button
                        color="inherit"
                        startIcon={<PeopleIcon />}
                        onClick={() => navigate('/students')}
                    >
                        Students
                    </Button>
                    <Button
                        color="inherit"
                        startIcon={<EventIcon />}
                        onClick={() => navigate('/drives')}
                    >
                        Drives
                    </Button>
                    <Button
                        color="inherit"
                        startIcon={<AssessmentIcon />}
                        onClick={() => navigate('/reports')}
                    >
                        Reports
                    </Button>
                    <IconButton color="inherit" onClick={handleLogout}>
                        <ExitToAppIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}; 