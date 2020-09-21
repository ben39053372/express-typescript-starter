import { createConnection, useContainer } from 'typeorm'
import config from '../config/index'
import { Container } from 'typedi'

export default async () => {

  useContainer(Container)

  console.log(`Connect to postgres://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.database}`)
  await createConnection({
    type: "postgres",
    url: `postgres://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.database}`,
    entities: [
      __dirname + "/../**/*.model{.ts,.js}"
    ],
    migrations: [
      __dirname + "/../migrations/*{.ts,.js}"
    ],
    synchronize: true
  }).then(async connection => {
    console.log('[TypeORM] Synchronize...')
    await connection.synchronize();
    console.log('[TypeORM] Synchronize finished!')
  }).catch(error => console.log(error))
}
