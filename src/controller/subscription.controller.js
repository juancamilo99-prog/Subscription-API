const Subscriptions = require("../model/Suscription.model");
const User = require("../model/User.model");
const { deleteFiles } = require("../middleware/cloudinary/deleteFiles");

const mapUploadFiles = (files = []) => {
    return files.map((file) => ({
        url: file.path,
        publicId: file.filename
    }));
}

// metodo crear subscripcion

const create_subscripcion = async(req, res) => {
    console.log("entrando al controlador")
    try {
        const { title, price, billingCycle, active, userId } = req.body;

        if(!title || price === undefined || !billingCycle || active === undefined || !userId){
            return res.status(400).json({
                message: "Los datos son obligatorios"
            });
        }

        //cargamos el usuario
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        //cargamos la imagen
        const upload_images = mapUploadFiles(req.files);

        //creamos la nueva suscripcion
        const new_subscription = await Subscriptions.create({
            title,
            price: Number(price),
            billingCycle,
            active,
            images: upload_images
        });

        user.subscriptions.push(new_subscription._id);
        await user.save();

        return res.status(201).json({
            message: "Suscripcion creada correctamente",
            subscription: new_subscription,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error al crear la subscripcion"
        })
    }
}

//obtener suscripciones

const get_subscription = async(req,res) => {
    try {
        const subscription = await Subscriptions.find().sort({ createdAt:-1});
        return res.status(200).json(subscription);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener los productos"
        })
    }
}

module.exports = {
    create_subscripcion,
    get_subscription
}