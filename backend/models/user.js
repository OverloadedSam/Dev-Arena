const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const SALT = require("config").get("salt");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please provide a name!"],
            minLength: 2,
            maxLength: 128,
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            require: [true, "Please provide email address!"],
            unique: [true, "This email is already registered!"],
            minLength: 4,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            require: [true, "Password can not be empty!"],
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcryptjs.genSalt(parseInt(SALT));
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
