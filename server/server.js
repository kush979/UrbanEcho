import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import registerRouter from "./src/routes/registerRoute.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", registerRouter);

app.get("/", (req, res) => {
  res.send("UrbanEcho backend is running 🚀");
});

app.listen(5000, () => console.log("Server running on port 5000"));
