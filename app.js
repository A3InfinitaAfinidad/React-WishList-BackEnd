import express, { json } from "express";
import cors from "cors";
import wishRoutes from "./routes/wishes.js";

const app = express();
app.use(cors());
app.use(json());

app.use("/wishes", wishRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
