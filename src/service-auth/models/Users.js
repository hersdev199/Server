const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Counter = require("./counter");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  workerCode: {
    type: String,
  },
  position: {
    type: String,
  },
  statusUser: {
    type: String,
    default: "active",
  },
  assignedRole: {
    type: [String],
    default: ["Basic"],
  },
  password: {
    type: String,
    required: true,
  },
  nro: {
    type: Number,
    unique: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      new mongoose.Types.ObjectId("64b5f4c2f4d3a2b4c8e4d2f1"), // Asegúrate de usar un ObjectId válido
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    this.nro = counter.seq;
  }

  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Usuario", userSchema);
