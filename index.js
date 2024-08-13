const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const usuarios = require("./src/service-auth/routes/Users");

//*-*-*-*-*-*-*-**-*-*-*-*-*-*-**-*-*-*-*-*-*-**-*-*-*-*-*-*-*
// CONFIGURATION SERVER
const path = require("path");
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const cors = require("cors");
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  }),
);
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const morgan = require("morgan");
app.use(morgan("combined"));
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none';",
  );
  next();
});

//*-*-*-*-*-*-*-**-*-*-*-*-*-*-**-*-*-*-*-*-*-**-*-*-*-*-*-*-*
//CONNECTION TO MONGODB
const mongoose = require("mongoose");
const mongoUrl = process.env.URL_MONGO;
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
  })
  .catch((error) => {
    console.error("Error to connection, error:", error);
  });

//*-*-*-*-*-*-*-**-*-*-*-*-*-*-**-*-*-*-*-*-*-**-*-*-*-*-*-*-*
app.get("/", (req, res) => {
  res.send("Server started. version 0.0.1");
});

app.use("/api/users", usuarios);

//*-*-*-*-*-*-*-**-*-*-*-*-*-*-**-*-*-*-*-*-*-**-*-*-*-*-*-*-*
//INITIALIZATION SERVER
app.listen(PORT, () => {
  console.log(`Server started on porT ${PORT}`);
});
