const app = require("./app");
const connectDatabase = require("./db/Database");

//Handling Uncaught Exception

process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Shutting down the server for handling uncaught exception");
});

//cors middlewar=we will write the cors config here but let try to see the problem fist

// config

if (process.env.NODE_ENV != "production") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// create server

const server = app.listen(process.env.PORT, () => {
  console.log(
    "server listening on http://localhost:" + process.env.PORT + " port"
  );
});

//unhandled promise rejection

process.on("unhandledRejection", (error) => {
  console.log(`Shutting down the server for ${error.message}`);
  console.log(`Shutting down the server for unhandled promise rejection.`);

  server.close(() => {
    process.exist(1);
  });
});

// connect Database
connectDatabase();
