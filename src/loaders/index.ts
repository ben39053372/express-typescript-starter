import expressLoader from "./express.loader";
import databaseLoader from './database.loader';
import { Express } from "express";

export default async ({
  expressApp,
}: {
  expressApp: Express;
}): Promise<void> => {
  try {
    console.log(`<====================================>`)
    console.log(`[Server] Server start loading ...`)

    console.log(`<====================================>`)
    // database
    console.log(`[Server] Database loading ...`)
    await databaseLoader()
    console.log("[Server] Database loaded!")

    console.log("<====================================>")

    // express
    console.info("[Server] Express loading...");
    await expressLoader({ app: expressApp });
    console.info("[Server] Express loaded!");

    console.log(`[Server] Loading Finish! `)
    console.log("<====================================>")
  } catch (err) {
    throw err
  }

};
