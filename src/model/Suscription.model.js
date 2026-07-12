const mongoose = require('mongoose');

const imageScheman = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        }
    },
    {
        _id: true,
        timestamps: false
    }
);


const subscriptionSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        billingCycle: {
            type: String,
            enum: ["Mes", "Anual", "Trimestral"],
            required: true
        },
        active: {
            type: Boolean,
            default: true
        },
        images: [imageScheman]
    },
    {
        timestamps: true
    }
)

const Subscription = mongoose.model("Subscription", suscriptionSchema);

module.exports = Subscription;