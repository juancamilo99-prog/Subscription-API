const mongoose = require('mongoose');

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
            enum: ["Mes", "Anual"],
            required: true
        },
        active: {
            type: Boolean,
            default: true
        },
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
)

const Subscription = mongoose.model("Subscription", suscriptionSchema);

module.exports = Subscription;