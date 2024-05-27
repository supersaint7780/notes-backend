import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middleware configuration
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, origin);
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  express.json({
    limit: "32kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "32kb",
  })
);

app.use(express.static("public"));

app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import noteRouter from "./routes/note.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/notes", noteRouter);

export { app };
