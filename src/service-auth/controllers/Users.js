const Usuario = require("../models/Users");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require("jsonwebtoken");

const jwtOptions = require("../config/config-passport");

//*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-
//CREATE NEW USER

exports.signup = async (req, res) => {
  const {
    username,
    password,
    name,
    workerCode,
    department,
    position,
    assignedRole,
  } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await Usuario.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "El nombre de usuario ya está en uso",
      });
    }

    // Crear un nuevo usuario
    const user = new Usuario({
      username,
      name,
      workerCode,
      department,
      position,
      assignedRole,
      password,
    });

    // Guardar el usuario en la base de datos
    await user.save();

    res.status(201).json({
      success: true,
      data: {
        nro: user.nro,
        username: user.username,
        message: "Usuario creado exitosamente",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Error del servidor",
    });
  }
};

//*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-
//LOGIN
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Usuario.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      const payload = { id: user._id, username: user.username };
      const token = jwt.sign(payload, jwtOptions.secretOrKey, {
        expiresIn: "1h",
      });

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      }); // Configura las opciones de seguridad aquí

      res.json({
        message: "Inicio de sesión exitoso",
        token: token,
      });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};
//*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-
//Logout
exports.logout = async (req, res) => {
  try {
    // Elimina la cookie 'jwt'
    res.clearCookie("jwt");
    res.json({ message: "Has cerrado sesión exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al cerrar sesión" });
  }
};
