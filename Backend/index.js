import express from "express";
import path from "path";
import serverConfig from "./ServerConfig.js";
import publicRouter from "./routes/public/publicRouter.js";
import { authmiddleware } from "./utils/JwtToken.js";
import protectedRouter from "./routes/protected/protectedRouter.js";
import dbConnect from "./db.js";
import createSuperAdmin from "./utils/Superadmin.js";

const app = express();
const port = serverConfig.port;

app.use(express.json());
const dir = path.resolve();

app.use(express.static(path.join(dir, "../frontend")));

//api
app.use("/api/public", publicRouter);
app.use("/api/protected", authmiddleware, protectedRouter);

try {
  await dbConnect();
  app.listen(port, () => {
    console.log(`app listinig at http://localhost:${port}`);
    createSuperAdmin();
  });
} catch (error) {
  console.log(error);
}
