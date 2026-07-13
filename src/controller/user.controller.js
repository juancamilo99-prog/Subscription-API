const User = require("../model/User.model");
const Subscriptions = require("../model/Suscription.model");
const bcrypt = require('bcrypt');
const { generateToken } = require("../../utils/jwtokens/tokenUser");
const { deleteManyImages } = require("../middleware/cloudinary/deleteFiles");

//registrar usuarios
const registerUser = async(req, res) => {
    try {
        const user_existe = await User.findOne({email: req.body.email});

        if(user_existe){
            return res.status(400).json({ error: "Usuario ya existe"})
        }

        //si no existe el usuario, lo creamos y lo guardamos
        const user = new User(req.body);
         if(req.file){
            user.imgUrl = req.file.path;
            user.imgId = req.file.path;
        }
        const user_saved = await user.save();
        res.status(200).json(user_saved);

    } catch (error) {
        res.status(400).json({error: "Error al registrar usuario"})
        console.log(error)
    }
}

//obtener usuarios

const getUser = async(req, res) => {
    try {
        const user = await User.find().populate("subscriptions");
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json ({error: "Error al obtener las peliculas"})
    }
}

//login usuario
const login_user = async(req,res) => {
    try {
        //buscamos al usuario por su email
        const user = await User.findOne({email: req.body.email});

        //preguntamos si no existe para devovler el error
        if(!user){
            return res.status(400).json("contraseña o usuario incorrectos");
        }

        const validar_password = bcrypt.compareSync(req.body.password, user.password);

        if(!validar_password){
            return res.status(400).json("Contraseña no valida")
        }

        //generamos un token JWT si la contraseña es valida
        const token = generateToken(user._id, user.email);

        //devolvemos el token
        console.log("Inicio de sesion exitoso!")
        return res.status(200).json({token, user});
    } catch (error) {
        res.status(400).json({error: "Error al intentar logear usuario"})
    }
}

//actualizar roll usuarios

const update_user_rol = async(req, res) => {
    try {
        const { id } = req.params
        const { role } = req.body;

        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        if(role !== undefined) user.role = role;

        await user.save();
        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el rol del usuario"
        })
    }
}

//eliminar usuario
const user_delete = async(req, res, next) => {
    try {
        const { id } = req.params

        if(req.user.role !== "admin" && req.user._id.toString() !== id){
            return res.status(500).json({
                message: "No tienes permisos para eliminar este usuario"
            })
        }
        

        //buscamos al usuario
        const user = await User.findById(id).populate("subscriptions");

        if(!user){
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        //buscamos las suscripciones relacionadas con sus ids
        const subscription = await user.subscriptions.map((subscription) => subscription._id);

        //elminamos la subscripcion
        await Subscriptions.deleteMany({
            //operador mongo -> "que este dentro de: subscription"
            _id: { $in: subscription}
        })
        //eliminamos las imagenes de cloudinary
        for (const subscriptionIMG of user.subscriptions) {
            await deleteManyImages(subscriptionIMG.images);
            console.log("imagenes eliminadas")
        }

        //eliminamos al usuario
        await User.findByIdAndDelete(id);

        if(!subscription){
            return res.status(404).json({
                message: "subscripcion no encontrada"
            });
        }

        return res.status(200).json({
            message: "Usuario eliminado",
            deleteUser: user,
            deleteSub: user.subscriptions
        });

        next();
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Error en la eliminacion del usuario"
        })
    }
}

module.exports = {
    registerUser,
    getUser,
    update_user_rol,
    login_user,
    user_delete
}