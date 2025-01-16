import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"
const { Schema } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: [true,'name is required']
  },
  email: {
    type: String,
    required: [true,'email is required'],
    unique: [true, 'email already exist'],
    validate: {
        validator: validator.isEmail,
        message: 'email is invalid foo@mail.com'
    }
  },
  password: {
    type: String,
    required: [true,'password is required'],
    minLength: [5,'password minimal 5 character']
  },
  role: {
    type: String,
    enum:['user','admin'],
    default: 'user'
  }
});

userSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function(reqPassBody) {
  return await bcrypt.compare(reqPassBody, this.password)
}

const User = mongoose.model("User", userSchema)

export default User
