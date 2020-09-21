import dotenv from "dotenv";

const env = dotenv.config();
if (env.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  database: {
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    name: 'defalut',
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    entities: [
      __dirname + "/entity/*.ts"
    ],
    synchronize: true,
  },
  email: {
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASS
    }
  }
};
