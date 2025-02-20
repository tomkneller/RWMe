import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { ThemedText } from '../components/ThemedText';
import { apiLogin } from './db-service';
import { UserAccount } from "@/app/models/index";

interface AuthContextType {
    user: UserAccount | null;
    login: (userData: any) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => { },
    logout: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState({ name: '', password: '' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const storedUser = await SecureStore.getItemAsync('user');

                if (storedUser) {
                    const userData = JSON.parse(storedUser); // Parse the stored JSON
                    setUser(userData);

                    const accessToken = await SecureStore.getItemAsync('accessToken');

                    if (accessToken) {
                        const res = await axios.get('/api/user', {
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });
                        setUser(res.data);
                    }

                }
            } catch (error: any) {
                console.error("Error checking auth:", error.response.data);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (userData: { name: string, password: string }) => {
        console.log(userData);

        try {
            //API login request
            const { accessToken, refreshToken } = await apiLogin(userData);


            await SecureStore.setItemAsync('user', JSON.stringify(userData)); // Store user data
            await SecureStore.setItemAsync('accessToken', accessToken); // Store access token
            // ... (store refresh token if needed - using SecureStore)

            setUser(userData);
        }
        catch (error) {
            console.error("Login Error: ", error);
            throw error;

        }
    };

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('user');
            await SecureStore.deleteItemAsync('accessToken');
            // ... (delete refresh token when stored)
            setUser({ name: '', password: '' });
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    if (isLoading) {
        return <ThemedText>Loading</ThemedText>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;