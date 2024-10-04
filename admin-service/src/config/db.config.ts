import mongoose from "mongoose";
import serverConfig from "./server.config";

// db connection
const connectToDb = async () => mongoose.connect(serverConfig.DB_URL);

export default connectToDb;
