import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import validator from "validator"

const regularUserSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        default: "Anonymous"
    },
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true });

// static signup method
regularUserSchema.statics.signup = async function (name, email, password) {
    // validation
    if (!email || !password || !name) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    // Locating regular user by email
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error ('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const regularUser = await this.create({name, email, password: hash})

    return regularUser
}

// static login method
regularUserSchema.statics.login = async function (email, password) {

    // Locating expert by expertID
    const user = await this.findOne({ email })

    if (!user) {
        throw Error ('Incorrect ID')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect password")
    }

    return user
}


const RegularUser = mongoose.model('RegularUser', regularUserSchema);
export default RegularUser;
