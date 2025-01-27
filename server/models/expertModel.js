import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import validator from "validator"

const expertSchema = mongoose.Schema({
  expertName: { 
    type: String, 
    required: true 
  },
  expertID: { 
    type: String, 
    required: true, 
    unique: true 
  },
  expertField: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  approved : { // 3 states: true, false, pending
    type: String,
    default: "pending", // experts need to be approved by the admin to be able to answer questions
    required: true
  },
  about: {
    type: String,
    require: true
  },

//   expertRole: { type: String, required: true },
}, { timestamps: true });

// static signup method
expertSchema.statics.signup = async function (expertName, expertID, email, password, expertField, about) {

  // validation
  if (!email || !password || !expertName || !expertID || !expertField || !about) {
    throw Error('All fields must be filled')
  }

  if (!validator.isEmail(email)){
    throw Error('Email is not valid')
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough')
  }

  if (!validator.isNumeric(expertID)) {
    throw Error('ID needs to have only numbers')
  }

  // Locating expert by expertID
  const exists = await this.findOne({ expertID })

  if (exists) {
    throw Error ('ID already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const expertUser = await this.create({expertName, expertID, expertField, email, password: hash, about})

  return expertUser
}

// static login method
expertSchema.statics.login = async function (email, password) {

    // Locating expert by expertID
    const expert = await this.findOne({email})

    if (!expert) {
      throw Error('Incorrect email')
    }

    if (expert.approved === "pending") {
      throw Error('you are not approved by the admin yet')
    }

    if (expert.approved === "false") {
      throw Error('you are not approved by the admin')
    }

    const match = await bcrypt.compare(password, expert.password)

    if (!match) {
      throw Error("Incorrect password")
    }

    return expert
}


const Expert = mongoose.model('Expert', expertSchema);
export default Expert;