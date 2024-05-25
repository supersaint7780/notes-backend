import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// middleware configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

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

const app = express();

export { app };
