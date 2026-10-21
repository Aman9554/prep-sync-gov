import React, { useState } from 'react';
import toast from 'react-hot-toast';

function AdminAddJob() {
  const [formData, setFormData] = useState({
    title: '',
    org: '',
    minQual: 'Graduation (Any)',
    maxAge: '',
    type: 'Central Govt',
    vacancies: '',
    lastDate: '',
    applyLink: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://apka-render-backend-url.onrender.com/api/admin/add-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setFormData({
          title: '',
          org: '',
          minQual: 'Graduation (Any)',
          maxAge: '',
          type: 'Central Govt',
          vacancies: '',
          lastDate: '',
          applyLink: ''
        });
      } else {
        toast.error('Job add nahi ho payi!');
      }
    } catch (error) {
      console.error('Error adding job:', error);
      toast.error('Server error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-slate-800/40 border border-slate-700 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          <span className="mr-2">🛠️</span> Admin: Post New Government Job
        </h2>
        <p className="text-slate-400 text-sm mb-6">Yahan se nayi job details bharo taaki wo seedha PrepSync database mein live ho jaye.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Job Title / Exam Name</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                required 
                placeholder="e.g. UPSC CSE 2026" 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Organization / Board</label>
              <input 
                type="text" 
                name="org" 
                value={formData.org} 
                onChange={handleChange} 
                required 
                placeholder="e.g. UPSC / SSC" 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Minimum Qualification</label>
              <select 
                name="minQual" 
                value={formData.minQual} 
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="10th Pass">10th Pass</option>
                <option value="12th Pass">12th Pass</option>
                <option value="Diploma">Diploma</option>
                <option value="Graduation (Any)">Graduation (Any)</option>
                <option value="B.Tech/B.E.">B.Tech/B.E.</option>
                <option value="Post Graduation">Post Graduation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Maximum Age Limit</label>
              <input 
                type="number" 
                name="maxAge" 
                value={formData.maxAge} 
                onChange={handleChange} 
                required 
                placeholder="e.g. 30" 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Job Type</label>
              <select 
                name="type" 
                value={formData.type} 
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Central Govt">Central Govt</option>
                <option value="State Govt">State Govt</option>
                <option value="Banking">Banking</option>
                <option value="PSU">PSU</option>
                <option value="Defense">Defense</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Vacancies</label>
              <input 
                type="text" 
                name="vacancies" 
                value={formData.vacancies} 
                onChange={handleChange} 
                required 
                placeholder="e.g. 1,500 Posts" 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Last Date</label>
              <input 
                type="text" 
                name="lastDate" 
                value={formData.lastDate} 
                onChange={handleChange} 
                required 
                placeholder="e.g. 15 Dec 2026" 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Official Apply Link</label>
              <input 
                type="url" 
                name="applyLink" 
                value={formData.applyLink} 
                onChange={handleChange} 
                required 
                placeholder="https://..." 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg text-sm cursor-pointer mt-4"
          >
            {loading ? 'Publishing Job...' : 'Publish Job to Database 🚀'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAddJob;