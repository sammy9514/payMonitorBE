import { connect } from "mongoose";
import env from "dotenv";
env.config();

const dbURI: any = process.env.DATABASE_STRING;

export const dbConfig = async () => {
  try {
    await connect(dbURI);
    console.log("db is connected successfully");
  } catch (error) {
    console.log("unable to connect to db");
  }
};
