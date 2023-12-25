import express from "express";

import { connectDb } from "./config/db";
connectDb();

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});