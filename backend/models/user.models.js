const mongoose = require("mongoose");
const validator = require("validator");
const contactSchema = new mongoose.Schema({
     name: { type: String, required: true },
     contact: { type: Number, required: true },
});

const userSchema = new mongoose.Schema(
     {
          name: { type: String, minlength: 5 },
          email: { type: String, unique: true, lowercase: true, validate: (value) => validator.isEmail(value) },
          password: { type: String },
          contacts: { type: [contactSchema], default: [] },
     },
     { timestamps: true }
);

const UserModel = mongoose.model("Users", userSchema);

// userSchema.statics.

module.exports = { UserModel };
