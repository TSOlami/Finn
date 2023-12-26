import express from "express";

import { connectDb } from "./config/db";
connectDb();

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World");
});

const port = process.env.PORT;

app.listen(port, () => {
	console.log("Server running on port 3000");
});
