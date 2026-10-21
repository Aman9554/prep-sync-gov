import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

function AppTracker() {
  const [trackedJobs, setTrackedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Database se user ki applied/tracked jobs fetch karna
  const fetchTrackedJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/api/user/saved-jobs`);
      const data = await response.json();
      if (data.success) {
        // Saved aur Applied dono ko combine karke table ke liye prepare karte hain
        const saved = (data.savedJobs || []).map(title => ({ title, status: 'Saved For Later', date: 'Upcoming', type: 'Saved' }));
        const applied = (data.appliedJobs || []).map(title => ({ title, status: 'Applied Successfully', date: 'Recently', type: 'Applied' }));
        setTrackedJobs([...saved, ...applied]);
      }
    } catch (error) {
      console.error('Error fetching tracker:', error);
      toast.error('Tracker data load nahi ho paya!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackedJobs();
  }, []);

  // Job ko tracker se remove karne ka function (Instant UI update ke sath)
  const handleRemove = async (jobTitle) => {
    try {
      const response = await fetch(`${API_URL}/api/user/remove-job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle })
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        // Turant table se hatane ke liye state update karo
        setTrackedJobs(prevJobs => prevJobs.filter(job => job.title !== jobTitle));
        fetchTrackedJobs(); // Sync with DB
      } else {
        toast.error('Remove nahi ho paya!');
      }
    } catch (error) {
      console.error('Remove error:', error);
      toast.error('Server error during removal!');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-2 flex items-center">
            <span className="mr-2">🎯</span> Application Tracker (Live Database)
          </h2>
          <p className="text-purple-100 text-sm">
            Apne bhare hue ya saved saare Govt forms ka live status ek jagah track karo.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-white text-xs font-bold">
          Total Tracked Jobs: <span className="text-emerald-300 text-sm">{trackedJobs.length}</span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/60 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
                <th className="py-4 px-6">Exam Name</th>
                <th className="py-4 px-6">Status Type</th>
                <th className="py-4 px-6">Current Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-slate-200 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-slate-400">
                    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    Loading tracked jobs from database...
                  </td>
                </tr>
              ) : trackedJobs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-slate-500">
                    Koi job track nahi ki gayi hai. Eligibility page se jobs Save ya Apply karo! 📌
                  </td>
                </tr>
              ) : (
                trackedJobs.map((job, index) => (
                  <tr key={index} className="hover:bg-slate-800/60 transition-colors">
                    <td className="py-4 px-6 font-bold text-white">{job.title}</td>
                    <td className="py-4 px-6">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        job.type === 'Applied' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {job.type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full font-semibold">
                        {job.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => handleRemove(job.title)}
                          className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/50 px-3 py-1 rounded-lg text-xs font-bold transition-all"
                        >
                          Remove 🗑️
                        </button>
                        <span className="text-purple-400 hover:text-purple-300 text-xs font-bold cursor-pointer">
                          View Details →
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default AppTracker;