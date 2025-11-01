import express from "express";
import { mainApp } from "./mainApp";
import env from "dotenv";
import { dbConfig } from "./utils/dbConfig";
import cors from "cors";
env.config();

const port = parseInt(process.env.PORT!);

const app = express();
app.use(cors());
app.use(express.json());
mainApp(app);
dbConfig();

app.listen(port, () => {
  console.log("server is up and running on", port);
});
