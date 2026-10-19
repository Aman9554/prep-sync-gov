import React, { useState, useEffect } from 'react';
import { ExternalLink, Briefcase, Calendar, Users, Award } from 'lucide-react';
import toast from 'react-hot-toast';

function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/jobs'); // Ensure karo ki backend par GET jobs route hai
      const data = await response.json();
      if (data.success || Array.isArray(data)) {
        setJobs(data.jobs || data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Jobs load nahi ho payi!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="bg-slate-800/40 border border-slate-700 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          <span className="mr-2">📋</span> All Available Government Jobs
        </h2>
        <p className="text-slate-400 text-sm mb-6">PrepSync database mein jitni bhi active jobs hain, unki poori list yahan hai.</p>

        {loading ? (
          <div className="text-center py-12 text-slate-400">Loading live jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 text-slate-400 bg-slate-900/40 rounded-xl border border-slate-700/50">
            Koi bhi job available nahi hai. Admin panel se add karein!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {jobs.map((job) => (
              <div key={job._id || job.id} className="bg-slate-900/60 border border-slate-700 p-5 rounded-xl hover:border-blue-500 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600/20 text-blue-400 text-xs px-2.5 py-1 rounded-md border border-blue-500/30 font-semibold">{job.type || 'Central Govt'}</span>
                    <span className="text-slate-400 text-xs">Org: <strong className="text-slate-200">{job.org}</strong></span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-400 mt-2">
                    <span className="flex items-center"><Award className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Min Qual: {job.minQual}</span>
                    <span className="flex items-center"><Users className="w-3.5 h-3.5 mr-1 text-purple-400" /> Vacancies: {job.vacancies}</span>
                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-red-400" /> Last Date: {job.lastDate}</span>
                  </div>
                </div>

                <a 
                  href={job.applyLink || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all flex items-center shrink-0 shadow-md"
                >
                  Apply Now <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllJobs;