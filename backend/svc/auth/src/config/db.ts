import mongoose from "mongoose";

/**
 * Connect to the MongoDB database.
 */
export const connectDb = async (): Promise<void> => {
	try {
		// Decode base64-encoded secrets
		const mongoUri = Buffer.from(process.env.MONGO_URI as string, 'base64').toString('utf-8');

		// Attempt to connect to the MongoDB cluster
		const conn = await mongoose.connect(mongoUri);
		
		// Log a success message if the connection is successful
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error: any) {
		// Log an error message if the connection fails
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
}
