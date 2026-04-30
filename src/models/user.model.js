const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is require for creating a user"],
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: [true, "Email already Exists."]
    },
    name: {
        type: String,
        required: [true, "Name is require for creating an Account.,"],
    },
    password: {
        type:String,
        required: [true, "Password is require for creating an Account.,"],
        minlength: [8, "password should contain more then 8 character"],
        select: false
    }
}, { timestamps: true })


userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return
    }

    const hash = await bcrypt.hash(this.password, 10)

    this.password = hash

    return
})

userSchema.methods.comparePassword = async function (password) {
    const bcryptHashRegex = /^\$2[aby]\$\d{2}\$/
    const isHashedPassword = bcryptHashRegex.test(this.password)

    if (isHashedPassword) {
        return await bcrypt.compare(password, this.password)
    }

    // Legacy support: old records may still have plain text password.
    // Accept once, then upgrade it to bcrypt hash.
    if (password === this.password) {
        this.password = password
        await this.save()
        return true
    }

    return false
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;