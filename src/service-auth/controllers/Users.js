const Usuario = require("../models/Users");

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

