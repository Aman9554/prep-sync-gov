const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  org: { type: String, required: true },
  minQual: { type: String, required: true }, // '10th Pass', '12th Pass', 'Diploma', 'Graduation (Any)', 'B.Tech/B.E.', 'Post Graduation'
  maxAge: { type: Number, required: true },
  type: { type: String, required: true }, // 'Central Govt', 'State Govt', 'Banking', 'Defense', 'PSU'
  vacancies: { type: String, default: 'Multiple' },
  lastDate: { type: String, default: 'Upcoming' },
  applyLink: { type: String, default: 'https://ssc.gov.in' }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);