import express, { json } from "express";
import cors from "cors";
import wishRoutes from "./routes/wishes.js";

const app = express();
app.use(cors());
app.use(json());

app.use("/wishes", wishRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'error en el servidor' })
})


const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
