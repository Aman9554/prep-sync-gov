const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/User');
const Job = require('./models/Job');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();

app.use(cors()); 
app.use(express.json()); 

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Database Connected Successfully!'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err.message));

// 1. Profile Save API
app.post('/api/user/profile', async (req, res) => {
  console.log("👉 Frontend se data yahan tak aaya:", req.body);
  try {
    const { dob, qualification } = req.body;
    let user = await User.findOne({ name: "Aman Pandey" });
    if (user) {
      user.dob = dob;
      user.qualification = qualification;
      await user.save();
    } else {
      user = new User({ name: "Aman Pandey", dob, qualification });
      await user.save();
    }
    res.status(200).json({ success: true, message: "Profile safely stored in Vault!", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Profile Fetch API
app.get('/api/user/profile', async (req, res) => {
  try {
    const user = await User.findOne({ name: "Aman Pandey" });
    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. AI Job Matcher API (Safe & Debugged)
app.get('/api/jobs', async (req, res) => {
  try {
    let jobs = await Job.find();
    
    // Agar database khali hai, toh jobs insert karo
    if (jobs.length === 0) {
      const initialJobs = [
        { title: 'UPSC Civil Services (IAS/IPS)', org: 'UPSC', minQual: 'Graduation (Any)', maxAge: 32, type: 'Central Govt', vacancies: '1056 Posts', lastDate: '25 Nov 2026', applyLink: 'https://upsconline.nic.in' },
        { title: 'SSC CGL Tier-1 Examination', org: 'SSC', minQual: 'Graduation (Any)', maxAge: 30, type: 'Central Govt', vacancies: '17,727 Posts', lastDate: '15 Nov 2026', applyLink: 'https://ssc.gov.in' },
        { title: 'UPPSC RO / ARO Samiksha Adhikari', org: 'UP Govt', minQual: 'Graduation (Any)', maxAge: 40, type: 'State Govt', vacancies: '411 Posts', lastDate: '30 Nov 2026', applyLink: 'https://uppsc.up.nic.in' },
        { title: 'RRB Junior Engineer (JE) & DMS', org: 'Railways', minQual: 'Diploma', maxAge: 36, type: 'Central Govt', vacancies: '7,951 Posts', lastDate: '10 Dec 2026', applyLink: 'https://indianrailways.gov.in' },
        { title: 'SSC Junior Engineer (Civil/Mech/Elec)', org: 'SSC', minQual: 'Diploma', maxAge: 32, type: 'Central Govt', vacancies: '1,765 Posts', lastDate: '05 Dec 2026', applyLink: 'https://ssc.gov.in' },
        { title: 'IBPS Specialist Officer (IT Officer Scale-I)', org: 'IBPS', minQual: 'B.Tech/B.E.', maxAge: 30, type: 'Banking', vacancies: '896 Posts', lastDate: '20 Nov 2026', applyLink: 'https://ibps.in' },
        { title: 'GATE / PSU Executive Trainee (CS/IT)', org: 'NTPC / ONGC', minQual: 'B.Tech/B.E.', maxAge: 28, type: 'PSU', vacancies: '2,500+ Posts', lastDate: '12 Dec 2026', applyLink: 'https://gate2026.iitr.ac.in' },
        { title: 'SBI Probationary Officer (PO)', org: 'SBI', minQual: 'Graduation (Any)', maxAge: 30, type: 'Banking', vacancies: '2,000 Posts', lastDate: '18 Nov 2026', applyLink: 'https://sbi.co.in' },
        { title: 'RRB NTPC (Undergraduate Level)', org: 'Railways', minQual: '12th Pass', maxAge: 33, type: 'Central Govt', vacancies: '3,445 Posts', lastDate: '22 Nov 2026', applyLink: 'https://indianrailways.gov.in' },
        { title: 'UP Police Constable Recruitment', org: 'UPPRPB', minQual: '12th Pass', maxAge: 25, type: 'State Govt', vacancies: '60,244 Posts', lastDate: '28 Nov 2026', applyLink: 'https://uppbpb.gov.in' },
        { title: 'SSC GD Constable (CAPFs / NIA / SSF)', org: 'SSC', minQual: '10th Pass', maxAge: 23, type: 'Defense', vacancies: '39,481 Posts', lastDate: '14 Dec 2026', applyLink: 'https://ssc.gov.in' },
        { title: 'UGC NET / JRF & Assistant Professor', org: 'NTA', minQual: 'Post Graduation', maxAge: 35, type: 'Central Govt', vacancies: 'Lectureship', lastDate: '19 Dec 2026', applyLink: 'https://ugcnet.nta.ac.in' }
      ];
      jobs = await Job.insertMany(initialJobs);
      console.log('✅ 12 Govt Jobs MongoDB mein auto-seed ho gayi hain!');
    }
    
    res.json({ success: true, jobs });
  } catch (error) {
    console.error('❌ Error fetching/seeding jobs:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Save Job API
app.post('/api/user/save-job', async (req, res) => {
  try {
    const { jobTitle } = req.body;
    let user = await User.findOne({ name: "Aman Pandey" });
    
    if (user) {
      if (!user.savedJobs.includes(jobTitle)) {
        user.savedJobs.push(jobTitle);
        await user.save();
      }
      res.status(200).json({ success: true, message: `${jobTitle} saved to Tracker! 📌` });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. Get Saved & Applied Jobs API
app.get('/api/user/saved-jobs', async (req, res) => {
  try {
    const user = await User.findOne({ name: "Aman Pandey" });
    if (user) {
      res.status(200).json({ success: true, savedJobs: user.savedJobs, appliedJobs: user.appliedJobs });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 6. Remove Job API (Updated to remove from both saved and applied lists)
app.post('/api/user/remove-job', async (req, res) => {
  try {
    const { jobTitle } = req.body;
    let user = await User.findOne({ name: "Aman Pandey" });
    
    if (user) {
      user.savedJobs = user.savedJobs.filter(job => job !== jobTitle);
      user.appliedJobs = user.appliedJobs.filter(job => job !== jobTitle);
      await user.save();
      res.status(200).json({ success: true, message: `${jobTitle} removed successfully!` });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 7. APPLY JOB API
app.post('/api/user/apply-job', async (req, res) => {
  try {
    const { jobTitle } = req.body;
    let user = await User.findOne({ name: "Aman Pandey" });
    
    if (user) {
      user.savedJobs = user.savedJobs.filter(job => job !== jobTitle);
      if (!user.appliedJobs.includes(jobTitle)) {
        user.appliedJobs.push(jobTitle);
      }
      await user.save();
      res.status(200).json({ success: true, message: `Successfully applied for ${jobTitle}!` });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 8. SYLLABUS TRACKER API
app.post('/api/user/update-syllabus', async (req, res) => {
  try {
    const { moduleName, isCompleted, totalModules } = req.body;
    let user = await User.findOne({ name: "Aman Pandey" });
    
    if (user) {
      if (isCompleted) {
        if (!user.completedModules.includes(moduleName)) {
          user.completedModules.push(moduleName);
        }
      } else {
        user.completedModules = user.completedModules.filter(m => m !== moduleName);
      }
      
      const calculatedProgress = Math.round((user.completedModules.length / totalModules) * 100);
      user.overallProgress = calculatedProgress;
      
      await user.save();
      
      res.status(200).json({ 
        success: true, 
        progress: user.overallProgress, 
        completed: user.completedModules 
      });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 9. UPLOAD DOCUMENT API
app.post('/api/user/upload-doc', async (req, res) => {
  try {
    const { docType, fileName } = req.body;
    let user = await User.findOne({ name: "Aman Pandey" });
    
    if (user) {
      if (!user.documents) user.documents = {};
      user.documents[docType] = fileName; 
      await user.save();
      
      res.status(200).json({ success: true, message: `${fileName} safely locked in Vault 🔐`, documents: user.documents });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}); 

// 10. SECURE SIGNUP API
app.post('/api/user/signup', async (req, res) => {
  try {
    let { name, email, password } = req.body;
    email = email.toLowerCase().trim(); 
    
    console.log(`\n--- SIGNUP TRY ---`);
    console.log(`Naya Email ban raha hai: '${email}'`);

    let user = await User.findOne({ email });
    if (user) {
      console.log(`❌ ERROR: Email pehle se hai!`);
      return res.status(400).json({ success: false, message: "Email is already registered! Please login." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();
    console.log(`✅ SUCCESS: Account save ho gaya!`);
    res.status(201).json({ success: true, message: "Account created successfully! 🚀" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 11. SECURE LOGIN API
app.post('/api/user/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase().trim();

    console.log(`\n--- LOGIN TRY ---`);
    console.log(`Email aaya: '${email}'`);

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`❌ ERROR: Ye email database mein mila hi nahi!`);
      return res.status(400).json({ success: false, message: "Invalid email or password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`❌ ERROR: Email mil gaya, par Password match nahi hua!`);
      return res.status(400).json({ success: false, message: "Invalid email or password!" });
    }

    console.log(`✅ SUCCESS: Login pass ho gaya!`);
    const token = jwt.sign({ id: user._id }, 'prepsync_secret_key', { expiresIn: '1d' });

    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});
// 12. ADMIN ADD JOB API
app.post('/api/admin/add-job', async (req, res) => {
  try {
    const { title, org, minQual, maxAge, type, vacancies, lastDate, applyLink } = req.body;
    
    const newJob = new Job({
      title,
      org,
      minQual,
      maxAge,
      type,
      vacancies,
      lastDate,
      applyLink
    });

    await newJob.save();
    console.log(`✅ Nayi Job Add Ho Gayi: ${title}`);
    res.status(201).json({ success: true, message: "Job successfully added to database! 🚀", job: newJob });
  } catch (error) {
    console.error("Add Job Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});
// TEMPORARY: Database saaf karne ka route
app.get('/api/reset-db', async (req, res) => {
  try {
    await User.deleteMany({});
    res.send("<h1>Database ekdum saaf ho gaya! 🧹 Ab tum Signup kar sakte ho.</h1>");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

// Test Route
app.get('/', (req, res) => {
  res.send('PrepSync Backend Engine is Running! 🚀');
});

// ❌ TRAP (Hamesha saare routes ke baad aur app.listen se theek pehle hona chahiye)
app.use((req, res) => {
  console.log("❌ Frontend ne is raste par data bheja jo backend me nahi hai:", req.method, req.url);
  res.status(404).json({ success: false, message: `Route not found: ${req.url}` });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is perfectly running on port ${PORT}`);
});