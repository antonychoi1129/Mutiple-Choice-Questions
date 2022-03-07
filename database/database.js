import { Pool } from "../deps.js";
import "https://deno.land/x/dotenv/load.ts";

const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
  // add your database configuration here
  hostname: Deno.env.get("POSTGRESQL_HOSTNAME"),
  database: Deno.env.get("POSTGRESQL_DATABASE"),
  user: Deno.env.get("POSTGRESQL_USER"),
  password: Deno.env.get("POSTGRESQL_PASSWORD"),
  port: 5432,
}, CONCURRENT_CONNECTIONS);
const executeQuery = async (query, ...args) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, ...args);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    try {
      await client.release();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };