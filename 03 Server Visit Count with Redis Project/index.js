const express = require("express");
const redis = require("redis");
const app = express();
const process = require('process')

const client = redis.createClient({
  url: "redis://redis:6379", // Use the service name as hostname
});

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to Redis");

    // Initialize visits if not exists
    const visits = await client.get("visits");
    if (visits === null) {
      await client.set("visits", 0);
    }

    app.get("/", async (req, res) => {
      process.exit(0)
      const visits = await client.get("visits");
      res.send("Number of visits " + visits);
      await client.set("visits", parseInt(visits) + 1);
    });

    app.listen(4001, () => {
      console.log("listening on port 4001");
    });
  } catch (err) {
    console.error("Error connecting to Redis:", err);
    process.exit(1);
  }
}

startServer().catch(console.error);