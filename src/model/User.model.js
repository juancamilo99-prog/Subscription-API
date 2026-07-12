const mongoose = require('mongoose'); //importamos mongoose
const bcrypt = require('bcrypt');

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
                type: mongoose.Schema.Types.ObjectId, ref: 'Subscription'
            }
        ]
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function(){
    //this.password contiene la contraseña en el texto plano
    this.password = await bcrypt.hashSync(this.password, 10) // 10 = nivel del coste
});

const User = mongoose.model("User", userSchema);

module.exports = User;