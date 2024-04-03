import axios from "axios";

export default async function authUser( code: string): Promise<any> {
    try {
        const response = await axios.get(`http://finn.com/api/v1/auth/?code=${code}`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching user:', error);
        throw error;
    }
}