import express from "express";
import cors from "cors";
import MahasiswaRoute from "./routes/MahasiswaRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(MahasiswaRoute);

app.listen(5000, () => console.log("Server running on port 500"));
