import expressLoader from "./express.loader";
import databaseLoader from './database.loader';
import emailLoader from './email.loader'
import { Express } from "express";

export default async ({
  expressApp,
}: {
  expressApp: Express;
}): Promise<void> => {
  try {
    // start
    console.log(`<====================================>`)

    console.log(`[Server] Server start loading ...`)
    console.log(`<====================================>`)

    // Email
    console.log(`[Server] Email Client start loading ...`)
    await emailLoader()
    console.log(`[Server] Email Client loaded!`)
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
    console.log("<====================================>")

    // finish
    console.log(`[Server] Loading Finish! `)
    console.log("<====================================>")
  } catch (err) {
    throw err
  }

};
