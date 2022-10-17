import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const config: SqliteConnectionOptions = {
    name: 'default',
    type: 'sqlite',
    database: 'db',
    entities: ['src/**/*.entity{.ts,.js}'],
    synchronize: true,
}

export default config; 