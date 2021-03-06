import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// import validator from 'validator';


const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String, required: true, unique: true, trim: true, lowercase: true,
  },
  password: {
    type: String, required: true, trim: true, minLength: 6,
  },
  isAdmin: { type: Boolean, default: false, required: true },
  tokens: [{
    token: {
      type: String,
      required: true,
    }
  }]
}, {
  timestamp: true
})

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.isAdmin;

  return userObject;
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({_id: user._id.toString()}, 'astrodev')

  user.tokens = user.tokens.concat({ token })
  await user.save();

  return token;
}


userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email})

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return user;
}


// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next();
})


const User = mongoose.model('User', userSchema)
export default User

