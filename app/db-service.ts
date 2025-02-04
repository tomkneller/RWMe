import axios from 'axios';

/**
 * Get all users from users database
 */
export const getUsers = async () => {
    try {
        const response = await axios.get('http://192.168.1.112:5000/api/users');
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
export const createUser = async (name: String, email: String, phoneNo: Number) => {
    try {
        const response = await axios.post('http://192.168.1.112:5000/api/users', { name, email, phoneNo });
        console.log(response.data); // Success message and user ID
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

//Get all routes from routes database
export const getRoutes = async () => {
    try {
        const response = await axios.get('http://192.168.1.112:5000/api/routes');
        return response.data;
    } catch (error) {
        console.error('Error fetching routes:', error);
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
export const createRoute = async (name: String, distance: Number, pace: String, lat: Number, long: Number, hostname: String) => {
    try {
        const response = await axios.post('http://192.168.1.112:5000/api/routes', { name, distance, pace, lat, long, hostname });
        console.log(response.data); // Success message and route ID
    } catch (error) {
        console.error("Error creating routes:", error);
    }
};