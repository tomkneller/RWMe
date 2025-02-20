import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { UserAccount, Route } from "@/app/models/index";

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
 * @param password users chosen password
 */
export const createUser = async (name: string, email: string, phoneNo: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/register`, { name, email, phoneNo, password });
        console.log(response.data); // Success message and user ID
    } catch (error: any) {
        console.error("Error creating user:", error.response.data);
    }
};

export const apiLogin = async (userData: UserAccount) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, userData); // Your Express route

        if (response.status === 200) {  // Or appropriate success code
            const { accessToken, refreshToken, user } = response.data; // Assuming your API sends these

            if (!accessToken || !refreshToken || !user) {
                throw new Error("Invalid response from API. Missing tokens or user data.");
            }

            //Store tokens securely
            await SecureStore.setItemAsync('accessToken', accessToken);
            await SecureStore.setItemAsync('refreshToken', refreshToken);
            await SecureStore.setItemAsync('user', JSON.stringify(user)); // Store user object


            //Return user data
            return { accessToken, refreshToken, user };

        } else {
            // Handle API errors (e.g., incorrect credentials)
            const errorMessage = response.data.message || 'Login failed';
            throw new Error(errorMessage);
        }
    } catch (error: any) {
        if (error.response) {
            console.error("API Error:", error.response.data);
            throw new Error(error.response.data.message || "Login failed");
        } else if (error.request) {
            console.error("Request Error:", error.request);
            throw new Error("No response from server");
        } else {
            console.error("Setup Error:", error.message);
            throw new Error("Login request failed");
        }
    }
}

//Get all routes from routes database
export const getRoutes = async () => {

    console.log("Fetching Routes");

    try {
        const response = await axios.get(`${API_BASE_URL}/routes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching routes:', error);
    }
};


//Get specific route details using routeID
export const getSpecificRoute = async (routeId: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/routes/${routeId}`);
        return response.data;
    } catch (error) {
        console.error("error fetching specified route", error);
        return null;
    }
}

/**
 * Create a new route in the routes database
 * @param name name of the route
 * @param distance distance (in miles) of the route
 * @param pace pace of the route (should be in format 00:00)
 * @param lat latitude of route start location
 * @param long longitude of route start location
 * @param dateTime Start date and time of event (format: YYYY-MM-DD HH:MM:SS)
 * @param hostname Username of route host
 * @param additionalDetails additional details about the route that the user can provide
 * @param fileContent gpx file data contents
 */
export const createRoute = async (name: String, distance: Number, pace: String, lat: Number, long: Number, dateTime: String, hostname: String, additionalDetails: string, fileContent: string) => {

    try {
        const response = await axios.post(`${API_BASE_URL}/routes/create`, { name, distance, pace, lat, long, dateTime, hostname, additionalDetails, fileContent });
        console.log(response.data); // Success message and route ID
    } catch (error) {
        console.error("Error creating routes:", error);
    }
};
