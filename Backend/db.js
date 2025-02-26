import { connect } from "mongoose";
import serverConfig from "./ServerConfig.js";


async function dbConnect() {
  try {
    await connect(serverConfig.dburl),
      {
        timeoutMS: 100000,
      };

    console.log("dbCOnnect successfull!!!");
  } catch (error) {
    console.log("db error", error);
  }
}
export default dbConnect;
