const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
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
        title:{
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
        images: [imageSchema]
    },
    {
        timestamps: true
    }
)

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;