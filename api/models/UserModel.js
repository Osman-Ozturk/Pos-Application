import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    userName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    profilePicture:{type:String},
    verify:{type:Boolean}
  },
  { timestamps: true }
);
const User = mongoose.model("Users", UserSchema);

export default User;
