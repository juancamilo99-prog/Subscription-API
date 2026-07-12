const { cloudinary } = require("../../config/cloudinary");

const deleteManyImages = async(images = []) => {
    if(!images.length) return

    await Promise.all(
        images.map((image) => cloudinary.uploader.destroy(image))
    )
};

module.exports = { deleteManyImages }