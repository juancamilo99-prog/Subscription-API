const Subscriptions = require("../model/Suscription.model");
const User = require("../model/User.model");
const { deleteFiles, deleteManyImages } = require("../middleware/cloudinary/deleteFiles");

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

        const titleLower = title.trim().toLowerCase();
        
        const existe_suscripcion = await Subscriptions.findOne({
            //lo que este dentro de user.subscription  el nombre del titulo
            _id: { $in: user.subscriptions},
            title: titleLower,
        })

        //cargamos la imagen
        const upload_images = mapUploadFiles(req.files);

        if(existe_suscripcion){
            //si existe la suscripcion eliminamos la imagen de cloudinary
            await deleteManyImages(upload_images);
            return res.status(400).json({
                message: "El usuario ya tiene esta suscripcion"
            })
        }

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