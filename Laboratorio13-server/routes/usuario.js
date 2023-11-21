//Rutas producto
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//api/usuario
router.post('/', userController.crearUsuario);
router.post('/', userController.obtenerUsuario);

router.get('/', userController.listarUsuario);
router.get('/', userController.verUsuario);
router.put('/:id', userController.editarUsuario);
router.delete('/:id', userController.eliminarUsuario)

module.exports = router;