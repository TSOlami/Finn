import axios from 'axios';

// Function to fetch user details from the gateway
export async function validateUser(): Promise<any> {
    try {
        const response = await axios.get('http://finn.com/api/v1/auth/user');
        return response.data;
    } catch (error: any) {
        console.error('Error fetching user:', error.response);
        throw error;
    }
}