import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const API_BASE_URL = 'http://192.168.1.112:5000/api';

/**
 * Get all users from users database
 */
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        console.log(response.data); // The user data from the database
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

/**
 * Create a new user in the users database
 * @param name users full name
 * @param email users email address
 * @param phoneNo users phone number
 */
export const createUser = async (name: Text, email: Text, phoneNo: Number) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, { name, email, phoneNo });
        console.log(response.data); // Success message and user ID
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

export const apiLogin = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, userData); // Your Express route

        if (response.status === 200) {  // Or appropriate success code
            const { accessToken, refreshToken, user } = response.data; // Assuming your API sends these

            if (!accessToken || !refreshToken || !user) {
                throw new Error("Invalid response from API. Missing tokens or user data.");
            }

            // 1. Store tokens securely:
            await SecureStore.setItemAsync('accessToken', accessToken);
            await SecureStore.setItemAsync('refreshToken', refreshToken);
            await SecureStore.setItemAsync('user', JSON.stringify(user)); // Store user object


            // 2. Return user data (or just the tokens if you prefer to fetch user data later):
            return { accessToken, refreshToken, user }; // or just { accessToken, refreshToken }

        } else {
            // Handle API errors (e.g., incorrect credentials)
            const errorMessage = response.data.message || 'Login failed'; // Extract error message from API response
            throw new Error(errorMessage); // Re-throw the error to be caught by the calling function
        }
    } catch (error) {

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("API Error:", error.response.data); // Log the error details from the server
            throw new Error(error.response.data.message || "Login failed"); // Re-throw the error with a user-friendly message
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.error("Request Error:", error.request);
            throw new Error("No response from server"); // Re-throw the error
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Setup Error:", error.message);
            throw new Error("Login request failed"); // Re-throw the error
        }
    }
}

//Get all routes from routes database
export const getRoutes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/routes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

/**
 * Create a new route in the routes database
 * @param name name of the route
 * @param distance distance (in miles) of the route
 * @param pace pace of the route (should be in format 00:00)
 * @param lat latitude of route start location
 * @param long longitude of route start location
 * @param hostname Username of route host
 */
export const createRoute = async (name: Text, distance: Number, pace: Text, lat: Number, long: Number, hostname: Text) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/routes`, { name, distance, pace, lat, long, hostname });
        console.log(response.data); // Success message and route ID
    } catch (error) {
        console.error("Error creating user:", error);
    }
};