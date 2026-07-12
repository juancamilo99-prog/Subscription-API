const mongoose = require('mongoose'); //importamos mongoose

//modelo usuario
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        subscriptions: [
            {
                type: mongoose.Schema.Types.ObjectId, ref: 'Subscriptions'
            }
        ]
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;