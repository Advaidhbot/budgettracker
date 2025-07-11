const mongoose = require("mongoose");
const bcrypt=require("bcrypt")

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  resetOTP: { type: String },
  resetOTPExpiry: { type: Date },
},
  {timestamps:true}
);

//Hash password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password"))return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


//Compare passwords
UserSchema.methods.comparePassword = async function (CandidatePassword) {
  return await bcrypt.compare(CandidatePassword, this.password);
};
module.exports = mongoose.model("User", UserSchema);