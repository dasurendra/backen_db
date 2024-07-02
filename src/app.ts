import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import DynamoddbRoute from "./routes/DynamodbRoute";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors());

// Routes

app.use("/", DynamoddbRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
