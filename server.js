import { server } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

server.listen(process.env.PORT, () => {
  console.log(
    `Sever is working on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode `
  );
});
