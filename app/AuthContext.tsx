import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store'; // Import SecureStore
import axios from 'axios';
import { ThemedText } from '../components/ThemedText';
import { apiLogin } from './db-service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
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
            } catch (error) {
                console.error("Error checking auth:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (userData) => {
        console.log(userData);

        try {
            // ... (API login request) ...
            const { accessToken, refreshToken } = await apiLogin(userData); // Example


            await SecureStore.setItemAsync('user', JSON.stringify(userData)); // Store user data
            await SecureStore.setItemAsync('accessToken', accessToken); // Store access token
            // ... (store refresh token if needed - using SecureStore)

            setUser(userData); // Or fetch actual user data
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
            // ... (delete refresh token if stored)
            setUser(null);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    if (isLoading) {
        return <ThemedText>Loading</ThemedText>; // Or similar
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

// // ... In your components:
// const MyComponent = () => {
//     const { user } = useContext(AuthContext);

//     return (
//         { user?<UserDashboard /> : <LoginScreen />
// }
//   );
// };