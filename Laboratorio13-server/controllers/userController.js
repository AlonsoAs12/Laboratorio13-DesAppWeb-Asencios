const jwt = require('jsonwebtoken');

const User = require("../models/User");
const config = require('../config/global');

exports.crearUsuario = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password)
    

    try {
        
        const { username, email, password } = req.body;
        const user = new User(
            {
               username,
               email,
               password
            } 
         );

         console.log(user)

        
        user.password = await user.encryptPassword(user.password)
        await user.save();

        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 60 * 60 * 24
        })
        //res.json({message: 'Received'})
        res.json({auth: true, token})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerUsuario = async (req, res) => {

    const { email, password } = req.body;
    console.log(email, password)

    try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        
        if(!user){
            return res.status(404).send("The user doesn't exists");
        }

        const validPassword = await user.validatePassword(password);

        if(!validPassword){
            return res.status(401).json({auth: false, token: null});
        }

        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 60 * 60 * 24
        });
        
        res.json({auth: true, token});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.listarUsuario = async (req, res) => {
    try {
        const usuarios = await User.find();
        res.json(usuarios);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.editarUsuario = async (req, res) => {
    try {
        const {_id, username, email, password} = new User(req, body);
        let usuarios = await User.findById(req.params.id);

        if(!usuarios) {
            res.status(404).json({ msg: 'No existe el usuario' });
        }

        usuario._id = _id;
        usuarios.username = username;
        usuarios.email = email;
        usuarios.password = password;

        console.log(usuario)

        usuarios = await User.findOneAndUpdate({ _id: req.params.id }, usuarios, { new: true });
        res.json(usuarios);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.verUsuario = async (req, res) => {
    try {
        let usuarios = await User.findById(req.params.id);

        if(!usuarios){
            res.status(404).json({ msg: 'No existe el usuario' })
        }

        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarUsuario = async (req, res) => {
    try {
        let usuarios = await User.findById(req.params.id);

        if(!usuarios){
            res.status(404).json({ msg: 'No existe el usuario' })
        }

        usuarios = await User.findOneAndRemove(req.params.id);

        res.json({ msg: 'El producto ' + usuarios.usuario + ' se ha eliminado.' })
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}