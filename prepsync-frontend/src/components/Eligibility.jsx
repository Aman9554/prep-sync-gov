import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

function Eligibility() {
  const [age, setAge] = useState('');
  const [qualification, setQualification] = useState('Graduation (Any)');
  const [category, setCategory] = useState('General');
  const [searched, setSearched] = useState(false);
  
  // MongoDB se aane wali jobs ke liye state
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Page khulte hi Backend (MongoDB) se saari Sarkari Jobs le aao
  useEffect(() => {
    fetch(`${API_URL}/api/jobs`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAllJobs(data.jobs);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Jobs fetch error:', err);
        toast.error('Backend se jobs load nahi ho payi!');
        setLoading(false);
      });
  }, []);

  // Job Save karne ka function
  const handleSaveJob = async (jobTitle) => {
    try {
      const res = await fetch(`${API_URL}/api/user/save-job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error('Save nahi ho paya!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error!');
    }
  };

  // Job Apply karne ka function
  const handleApplyJob = async (jobTitle) => {
    try {
      const res = await fetch(`${API_URL}/api/user/apply-job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error('Apply nahi ho paya!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error!');
    }
  };

  // Smart Qualification Ranking
  const getQualLevel = (q) => {
    if (q === '10th' || q === '10th Pass') return 1;
    if (q === '12th' || q === '12th Pass') return 2;
    if (q === 'Diploma') return 3;
    if (q === 'Graduation' || q === 'Graduation (Any)' || q === 'B.Tech/B.E.') return 4;
    if (q === 'Post Graduation') return 5;
    if (q === 'Ph.D') return 6;
    return 0;
  };

  // Eligibility Check Logic
  const getEligibleJobs = () => {
    if (!age) return [];
    const userAge = parseInt(age);
    
    let ageRelaxation = 0;
    if (category === 'OBC') ageRelaxation = 3;
    if (category === 'SC' || category === 'ST') ageRelaxation = 5;

    return allJobs.filter(job => {
      const isAgeValid = userAge <= (job.maxAge + ageRelaxation);
      
      let isQualValid = getQualLevel(qualification) >= getQualLevel(job.minQual);
      
      if (job.minQual === 'B.Tech/B.E.' && qualification === 'Graduation (Any)') {
        isQualValid = false;
      }

      return isAgeValid && isQualValid;
    });
  };

  const handleCheck = (e) => {
    e.preventDefault();
    if (age) {
      setSearched(true);
      toast.success('AI Eligibility Scan Complete! 🎯');
    }
  };

  const results = getEligibleJobs();

  return (
    <div className="space-y-6">
      
      {/* Header Box */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-2 flex items-center">
            <span className="mr-2">🎯</span> Smart Eligibility Checker (Live DB)
          </h2>
          <p className="text-blue-100 text-sm">
            Apni details dalo aur dekho tum aaj kin sarkari naukariyon ke liye eligible ho!
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-white text-xs font-bold">
          Total Active Jobs in DB: <span className="text-emerald-300 text-sm">{allJobs.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Check Form */}
        <div className="lg:col-span-1 bg-slate-800/40 border border-slate-700 p-6 rounded-2xl h-fit">
          <h3 className="text-lg font-bold text-slate-200 mb-4">Your Details</h3>
          <form onSubmit={handleCheck} className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-1">Your Age</label>
              <input type="number" required value={age} onChange={(e) => setAge(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="e.g. 22" />
            </div>
            
            <div>
              <label className="block text-slate-400 text-sm mb-1">Highest Qualification</label>
              <select value={qualification} onChange={(e) => setQualification(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                <option value="10th Pass">10th Pass (Matriculation)</option>
                <option value="12th Pass">12th Pass (Intermediate)</option>
                <option value="Diploma">Diploma (Polytechnic / ITI)</option>
                <option value="Graduation (Any)">Any Graduation (B.A / B.Com / B.Sc)</option>
                <option value="B.Tech/B.E.">B.Tech / B.E. (Engineering)</option>
                <option value="Post Graduation">Post Graduation (M.Tech / M.A / M.Sc / MBA)</option>
                <option value="Ph.D">Ph.D / Doctorate</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 text-sm mb-1">Category (For Relaxation)</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                <option value="General">General (UR)</option>
                <option value="OBC">OBC (+3 Yrs)</option>
                <option value="SC">SC (+5 Yrs)</option>
                <option value="ST">ST (+5 Yrs)</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-all mt-2">
              Find Matching Jobs 🔍
            </button>
          </form>
        </div>

        {/* Right Side: Results */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="bg-slate-800/40 border border-slate-700 p-10 rounded-2xl flex flex-col items-center justify-center h-full text-center">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-400">Loading Govt Jobs from MongoDB...</p>
            </div>
          ) : !searched ? (
            <div className="bg-slate-800/40 border border-slate-700 p-10 rounded-2xl flex flex-col items-center justify-center h-full text-center">
              <span className="text-5xl mb-4">🧐</span>
              <h3 className="text-xl font-bold text-slate-300">Ready to Scan {allJobs.length} Govt Exams</h3>
              <p className="text-slate-500 mt-2">Left side mein apni age aur padhai daalkar search karo.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-200">
                ✅ You are eligible for <span className="text-emerald-400">{results.length}</span> Active Jobs
              </h3>
              
              {results.length === 0 ? (
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-red-400 text-center">
                  Sorry! Is criteria ke hisaab se abhi koi job available nahi hai.
                </div>
              ) : (
                results.map(job => (
                  <div key={job._id || job.id} className="bg-slate-800/60 border border-slate-700 p-5 rounded-xl hover:border-blue-500 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="bg-slate-700 text-slate-300 text-[10px] px-2.5 py-0.5 rounded uppercase font-bold">{job.org}</span>
                        <span className="bg-blue-500/20 text-blue-400 text-[10px] px-2.5 py-0.5 rounded uppercase font-bold">{job.type}</span>
                        {job.vacancies && (
                          <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2.5 py-0.5 rounded font-bold">
                            🔥 {job.vacancies}
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-white">{job.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Min. Qual: <span className="text-slate-200">{job.minQual}</span> | Max Age: <span className="text-slate-200">{job.maxAge} Yrs</span> | Last Date: <span className="text-amber-400">{job.lastDate}</span>
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <button 
                        onClick={() => handleSaveJob(job.title)}
                        className="bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-white border border-amber-500/50 px-3 py-2 rounded-lg text-xs font-bold transition-all"
                      >
                        Save ⭐
                      </button>
                      <button 
                        onClick={() => handleApplyJob(job.title)}
                        className="bg-purple-500/20 hover:bg-purple-500 text-purple-300 hover:text-white border border-purple-500/50 px-3 py-2 rounded-lg text-xs font-bold transition-all"
                      >
                        Mark Applied 🚀
                      </button>
                      <a 
                        href={job.applyLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-4 py-2 rounded-lg font-bold hover:bg-emerald-500 hover:text-white transition-colors text-center text-sm"
                      >
                        Apply Now ↗
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Eligibility;