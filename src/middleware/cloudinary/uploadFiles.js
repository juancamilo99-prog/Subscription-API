const multer = require('multer');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../../config/cloudinary");

//formateo del nombre de la imagen
const formatFileName = (__filename) => {
    const nameWhitoutExtension = __filename.split(".").slice(0,-1).join("."); //quita la externsion del archivo split separa despues del punto y slice coge todos los elementos excepto el ultimo
    //join vuelve a unirlos con un punto
    const lowerCaseName = nameWhitoutExtension.toLowerCase(); //convertimos el nombre en minusculas
    const cleanName = lowerCaseName.replace(/[^a-z0-9]/g, "-"); //reemplazamos caracteres no permitidos
    // ^dentro de [] -> todo lo que no sea eso, a-z cualquier letra y 0-9 cualquier numero, g -> buscar todas las coincidencias
    const finalName = cleanName.replace(/-+/g, "-");//para evitar varios guiones seguidos.
    return finalName
}

//
const storage = new CloudinaryStorage({
    cloudinary,
    params: async(req,file) =>{

        const uniqueFilename = `${Date.now()}-${formatFileName(file.originalname)}`

        return {
            folder: "subscription",
            allowed_formats: ["jpg", "jpeg", "png", "webp"],
            public_id: uniqueFilename
        }
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = upload;