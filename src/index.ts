import express from "express";
import indexRoute from "./routes/index";

import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./controller/db";
import RoleModel from "./models/role";
import { StateModel } from "./models/state";
import { saveStates } from "./controller/stateDataEntry";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3001;

connectToDatabase().then(() => {
  initial();
});

app.use("/api/v1", indexRoute);

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
    const stateCount = await StateModel.estimatedDocumentCount();
    if(stateCount === 0){
      await saveStates()
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