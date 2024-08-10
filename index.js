const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const usuarios = require("./src/service-auth/routes/Users");

//*-*-*-*-*-*-*-**-*-*-*-*-*-*-**-*-*-*-*-*-*-**-*-*-*-*-*-*-*
// CONFIGURATION SERVER
const path = require("path");
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const morgan = require("morgan");
app.use(morgan("combined"));

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
