export interface User {
    id: string;
    username: string;
    role: 'ADMIN' | 'COORDINATOR';
    name: string;
    email: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
} 