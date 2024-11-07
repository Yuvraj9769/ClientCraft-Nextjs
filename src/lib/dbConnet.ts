/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

const connectDB = async (): Promise<void> => {
  try {
    if (connection?.isConnected) {
      console.log("Database is already connected");
      return;
    }

    const db = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DB_NAME}`
    );

    connection.isConnected = db.connections[0].readyState;

    console.log(db.connections[0].readyState);
    console.log("Database connected");
  } catch (error: any) {
    console.log("Database connection failed");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
