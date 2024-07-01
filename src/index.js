import connectDB from "./db/index.js";

import { app } from "./app.js";
import { RegionRouter } from "./router/regionRouter.js";
import { DonorRouter } from "./router/donorRouter.js";
import { jwtRouter } from "./router/JwtRouter.js";
import { lastDonationDate } from "./router/lastDonationDateRouter.js";
import { AuthRouter } from "./router/authRouter.js";
import { FilterRouter } from "./router/filterRouter.js";



const startServer = (port) => {
  return app.listen(port);
};

const tryStartServer = (port) => {
  const server = startServer(port);
  server.on("listening", () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} is already in use. Trying a different port...`);
      tryStartServer(port + 1); // Try the next port
    } else {
      console.error("Error starting the server:", err);
      process.exit(1);
    }
  });
};

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
  app.use("/api",jwtRouter)
  
    app.use("/api",RegionRouter)
    app.use("/api",DonorRouter)
    app.use("/api",lastDonationDate)

    app.use("/api",AuthRouter)
    app.use("/api",FilterRouter)

    // end router call
    app.get("/", (req, res) => {
      res.send(`Server is running at http://localhost:${PORT}`);
    });

    tryStartServer(PORT);
  })
  .catch((err) => {
    console.log("Failed to start the server:", err);
  });
