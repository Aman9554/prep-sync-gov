import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function SyllabusTracker() {
  const [syllabus, setSyllabus] = useState([
    { id: 1, title: 'Quantitative Aptitude (Maths)', total: 25, completed: 12 },
    { id: 2, title: 'Reasoning Ability', total: 20, completed: 15 },
    { id: 3, title: 'General English', total: 15, completed: 5 },
    { id: 4, title: 'General Awareness (GK)', total: 30, completed: 10 },
  ]);
  const [loading, setLoading] = useState(false);

  // Backend se user ka saved progress fetch karna (Optional agar user profile mein save ho)
  useEffect(() => {
    fetch('http://localhost:5001/api/user/profile')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user && data.user.completedModules) {
          // Agar database mein completed modules hain toh unke counts update kar sakte hain
          console.log("User progress loaded:", data.user.completedModules);
        }
      })
      .catch(err => console.log('Profile fetch error:', err));
  }, []);

  // Progress update karne ka function (Database integration ke sath)
  const handleUpdateProgress = async (subTitle, currentCompleted, total) => {
    // Increment completion by 1, or reset to 0 if full
    const newCompleted = currentCompleted >= total ? 0 : currentCompleted + 1;
    const isCompleted = newCompleted > currentCompleted;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/user/update-syllabus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleName: subTitle,
          isCompleted: isCompleted,
          totalModules: total
        })
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success(`${subTitle} progress updated! 📈`);
        // Local state update karo taaki UI turant badle
        setSyllabus(prev => prev.map(sub => 
          sub.title === subTitle ? { ...sub, completed: newCompleted } : sub
        ));
      } else {
        toast.error('Progress update nahi ho payi!');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Server error during update!');
    } finally {
      setLoading(false);
    }
  };

  const totalTopics = syllabus.reduce((acc, curr) => acc + curr.total, 0);
  const totalCompleted = syllabus.reduce((acc, curr) => acc + curr.completed, 0);
  const overallProgress = Math.round((totalCompleted / totalTopics) * 100);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          <span className="mr-2">📈</span> Syllabus Tracker (Live Database)
        </h2>
        <p className="text-slate-400 text-sm mb-6">Track your preparation progress for upcoming Govt Exams in real-time.</p>

        {/* Overall Progress Bar */}
        <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700 mb-8 shadow-inner">
          <div className="flex justify-between items-end mb-2">
            <span className="text-slate-300 font-semibold">Overall Preparation</span>
            <span className="text-emerald-400 font-bold text-xl">{overallProgress}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3">
            <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-3 rounded-full transition-all duration-500" style={{ width: `${overallProgress}%` }}></div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {syllabus.map((sub) => {
            const progress = Math.round((sub.completed / sub.total) * 100);
            return (
              <div key={sub.id} className="bg-slate-800/60 border border-slate-600 p-5 rounded-xl hover:border-blue-500 transition-colors">
                <h3 className="text-lg font-bold text-slate-200 mb-3">{sub.title}</h3>
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>{sub.completed} / {sub.total} Topics Done</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5 mb-4">
                  <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
                <button 
                  onClick={() => handleUpdateProgress(sub.title, sub.completed, sub.total)}
                  disabled={loading}
                  className="w-full bg-slate-700/50 hover:bg-blue-600 text-slate-300 hover:text-white py-2 rounded-lg transition-colors text-sm font-semibold border border-slate-600 cursor-pointer"
                >
                  {loading ? 'Updating...' : '+ Advance 1 Topic 🚀'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default SyllabusTracker;