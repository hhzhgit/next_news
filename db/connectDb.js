import mongoose from "mongoose";
import News from "../db/models/News";
import User from "../db/models/User";
import Comment from "../db/models/Comment";
// Connection ready state
// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting
/**
 * @return {Promise}
 * function to connect to dataBase
 */
export default function dbconnect() {
  if (mongoose.connection.readyState == 1) {
    console.log(`dataBase already connected`);
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.DB_FULL_URL, (err) => {
      if (err) return reject(err);
      console.log(`data base connected to ${process.env.DB_NAME}`);
      return resolve();
    });
  });
}
