import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Session middleware configuration
app.use(
  session({
    secret: "Bloodlife Heroes", // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if you're using HTTPS
  })
);





export { app };
