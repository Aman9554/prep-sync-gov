import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function Profile() {
  const [profile, setProfile] = useState({
    name: "Aman Pandey", 
    email: "aman@example.com",
    phone: "",
    dob: "",
    category: "General",
    address: ""
  });

  useEffect(() => {
    // Backend se user data fetch karne ka logic (abhi ke liye dummy data)
    fetch('http://localhost:5001/api/user/profile')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user) {
          setProfile(prev => ({ ...prev, ...data.user }));
        }
      })
      .catch(err => console.log("Fetch Error:", err));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Yahan aage chal kar backend par data save karne ka API lagega
    toast.success("Profile Updated Successfully! 🚀");
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl shadow-lg">
        
        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-8 border-b border-slate-700 pb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            {profile.name ? profile.name.charAt(0) : 'U'}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-200">My Profile</h3>
            <p className="text-sm text-slate-400">Apni personal details manage karo 1-Click apply ke liye.</p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-slate-300 text-sm mb-1">Full Name</label>
              <input type="text" name="name" value={profile.name} onChange={handleChange} 
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
            
            {/* Email (Read Only - Kyunki login isse hota hai) */}
            <div>
              <label className="block text-slate-300 text-sm mb-1">Email Address</label>
              <input type="email" name="email" value={profile.email} readOnly 
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-500 cursor-not-allowed" />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-slate-300 text-sm mb-1">Phone Number</label>
              <input type="tel" name="phone" value={profile.phone} onChange={handleChange} 
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
                placeholder="+91 9876543210" />
            </div>

            {/* DOB */}
            <div>
              <label className="block text-slate-300 text-sm mb-1">Date of Birth</label>
              <input type="date" name="dob" value={profile.dob} onChange={handleChange} 
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>

            {/* Category */}
            <div>
              <label className="block text-slate-300 text-sm mb-1">Category</label>
              <select name="category" value={profile.category} onChange={handleChange} 
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                <option value="General">General (UR)</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-slate-300 text-sm mb-1">Permanent Address</label>
              <textarea name="address" value={profile.address} onChange={handleChange} rows="3" 
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
                placeholder="Apna pura pata yahan likhein..."></textarea>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-700 flex justify-end">
            <button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-2.5 px-8 rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              Save Profile ✨
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Profile;