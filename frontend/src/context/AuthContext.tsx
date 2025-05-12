import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    role: 'ADMIN' | 'COORDINATOR';
    username: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const login = async (credentials: { username: string; password: string }) => {
        setLoading(true);
        try {
            if (credentials.username === 'admin' && credentials.password === 'admin') {
                setUser({ username: 'admin', role: 'ADMIN' });
                setIsAuthenticated(true);
            } else {
                throw new Error('Invalid credentials');
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 