const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  // 👇 NAYE FIELDS JO MISSING THE 👇
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // 👆 YAHAN ADD KIYA 👆

  dob: { type: String },
  qualification: { type: String },
  savedJobs: { type: [String], default: [] },
  appliedJobs: { type: [String], default: [] },
  completedModules: { type: [String], default: [] },
  overallProgress: { type: Number, default: 0 },
  
  // Document Vault ke liye (10th, 12th added)
  documents: {
    aadhar: { type: String, default: "" },
    photo: { type: String, default: "" },
    signature: { type: String, default: "" },
    tenthMarksheet: { type: String, default: "" },
    twelfthMarksheet: { type: String, default: "" },
    marksheet: { type: String, default: "" }
  }
});

module.exports = mongoose.model('User', userSchema);