import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendapi",
    })
    .then(() => {
      console.log("Database Connected...");
    })
    .catch((error) => {
      console.error(error);
      console.log("");
    });
};
