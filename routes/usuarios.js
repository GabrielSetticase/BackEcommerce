const Usuarios = require("../src/models/usuarios")
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');



router.post('/registro', async (req, res) => {
  try {
    const { nombre, password, direccion, email } = req.body;

    const existingUser = await Usuarios.findOne({ where: { nombre } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await Usuarios.create({ nombre, password: hashedPassword, direccion, email });

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


router.post('/login', async (req, res) => {

  try {
    const nombre = req.body.nombre
    const password = req.body.password

    const user = await Usuarios.findOne({ where: { nombre: nombre } })

    if (!user) {
      return res.status(401).json({ message: 'usuario no registrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'el password es incorrecto' });
    }

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      dataUser: {
        name: user.nombre,
        isAdmin: user.isAdmin,
        direccion: user.direccion,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;