import { Pool } from 'pg';

let connection;

if (!connection) {
  connection = new Pool({
    user: process.env.ENV_LOCAL_USER,
    password: process.env.ENV_LOCAL_PASSWORD,
    host: process.env.ENV_LOCAL_HOST,
    port: process.env.ENV_LOCAL_PORT,
    database: process.env.ENV_LOCAL_DATABASE,
  });
}

export default connection;
