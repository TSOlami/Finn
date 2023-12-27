import express from "express";
import dotenv from 'dotenv';
dotenv.config();

import { connectDb } from "./config/db";
connectDb();
import { authRoutes } from "./routes/authRoutes";

const app = express();

const apiVersion = process.env.API_VERSION || 'v1';
app.use(`/api/${apiVersion}/auth`, authRoutes);

app.get("/", (req, res) => {
	res.send("Hello World");
});

const port = process.env.PORT || '3000';
const host = process.env.HOST || "0.0.0.0";

app.listen(parseInt(port, 10), host, () => {
	console.log("Server running on port 3000");
});
