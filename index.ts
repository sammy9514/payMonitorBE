import express from "express";
import { mainApp } from "./mainApp";
import env from "dotenv";
import { dbConfig } from "./utils/dbConfig";
env.config();

const port = parseInt(process.env.PORT!);

const app = express();
app.use(express.json());
mainApp(app);
dbConfig();

app.listen(port, () => {
  console.log("server is up and running on", port);
});

// const today = new Date().getDay() + 1;
// console.log((today - 6 + 7) % 7);
const arr = [1, 2, 3, 4];
const red = arr.reduce((acc, cur) => acc + cur);
console.log(red);
