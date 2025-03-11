const redis = require("redis");

const client = redis.createClient({
  password: "GJskx5A4PxizAz7nJ3lTpr9QQz77Bk0E",
  host: "redis-18157.c321.us-east-1-2.ec2.redns.redis-cloud.com",
  port: 18157,
});

client.on("connect", () => {
  console.log("Client connected to Redis");
});

client.on("ready", () => {
  console.log("Client connected to Redis and ready to use...");
});

client.on("error", (err) => {
  console.log("Redis Client Error", err);
});

client.on("end", () => {
  console.log("Client disconnected from Redis");
});

process.on("SIGINT", () => {
  client.quit();
});

module.exports = client;
