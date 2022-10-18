import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import { Task } from "./src/tasks/entities/task.entity";

const config: SqliteConnectionOptions = {
    name: 'default',
    type: 'sqlite',
    database: 'db',
    entities: [Task],
    synchronize: true,
}

export default config; 