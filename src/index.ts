import express from "express";
import authRoute from "./routes/auth/auth";
import testRoute from "./routes/private/testRoute";
import visitorRoute from "./routes/private/visitorRoute";

import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./controller/db";
import RoleModel from "./models/role";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

connectToDatabase().then(() => {
  initial();
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/test", testRoute);
app.use("/api/v1/visitor", visitorRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

async function initial() {
  try {
    const documentCount = await RoleModel.estimatedDocumentCount();
    if (documentCount === 0) {
      await RoleModel.create({ name: "user" });
      await RoleModel.create({ name: "admin" });
      await RoleModel.create({ name: "moderator" });
    }
  } catch (error) {
    console.error("Error initializing roles:", error);
    throw new Error("Error initializing roles");
  }
}

// Export the startServer function
// startServer()

// export {startServer}
export default app