import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;

    app.on("error", (error) => {
      console.error("ERROR ", error);
      throw error;
    });

    app.listen(port, () => {
      console.log(`⚙️ Server is running at port : ${port}`);
    });
  })
  .catch((err) => {
    console.error("MONGO DB Connection Failed !!!! ", err);
  });
