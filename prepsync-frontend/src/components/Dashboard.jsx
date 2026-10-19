import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="space-y-6 pb-10">
      {/* 1. Breaking News Ticker */}
      <div className="flex bg-blue-600/20 text-blue-400 text-sm py-2 px-4 rounded-lg border border-blue-500/30 items-center overflow-hidden">
        <span className="bg-blue-600 text-white font-bold px-2 py-1 rounded text-xs mr-3 z-10 shrink-0">BREAKING</span>
        <marquee className="font-semibold tracking-wide">
          🔥 SSC CGL 2026 Tier 1 Admit Card Released &nbsp; | &nbsp; 🚀 UPPSC RO/ARO Exam Date: 12 Nov 2026 &nbsp; | &nbsp; 📢 RRB NTPC Notification Expected Next Week
        </marquee>
      </div>

      {/* 2. NAYE QUICK STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-2xl flex items-center justify-between hover:border-emerald-500 transition-all">
          <div>
            <p className="text-slate-400 text-sm font-semibold">Active Applications</p>
            <h3 className="text-3xl font-bold text-slate-200 mt-1">02</h3>
          </div>
          <div className="text-4xl bg-slate-900 p-3 rounded-xl border border-slate-700">📝</div>
        </div>
        
        <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-2xl flex items-center justify-between hover:border-blue-500 transition-all">
          <div>
            <p className="text-slate-400 text-sm font-semibold">Vault Status</p>
            <h3 className="text-3xl font-bold text-slate-200 mt-1">4<span className="text-lg text-slate-500">/9 Docs</span></h3>
          </div>
          <div className="text-4xl bg-slate-900 p-3 rounded-xl border border-slate-700">📁</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-2xl flex items-center justify-between hover:border-purple-500 transition-all">
          <div>
            <p className="text-slate-400 text-sm font-semibold">Study Material</p>
            <h3 className="text-3xl font-bold text-slate-200 mt-1">12<span className="text-lg text-slate-500"> Saved</span></h3>
          </div>
          <div className="text-4xl bg-slate-900 p-3 rounded-xl border border-slate-700">📚</div>
        </div>
      </div>

      {/* 3. Overall Preparation Tracker */}
      <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl flex justify-between items-center">
        <div className="w-full mr-8">
          <h3 className="text-lg font-bold text-slate-200 flex items-center mb-2">
            <span className="mr-2">📈</span> Overall Preparation
          </h3>
          <p className="text-sm text-slate-400 mb-4">Based on your completed modules in Syllabus Tracker</p>
          <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-700">
            <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full w-[47%]"></div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-700 px-6 py-4 rounded-xl text-center shrink-0">
          <h2 className="text-3xl font-extrabold text-emerald-400">47%</h2>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-1">Completed</p>
        </div>
      </div>

      {/* 4. Smart Match Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-6 rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.3)] border border-indigo-400/30">
        <h3 className="text-xl font-bold text-white mb-2">Smart Match Found! 🚀</h3>
        <p className="text-blue-100 text-sm mb-4 max-w-2xl">
          Based on your <span className="font-bold text-white">Profile</span>, our AI has found <span className="font-bold text-white">3 Active Government Jobs</span> you are perfectly eligible for today.
        </p>
        <Link to="/eligibility" className="bg-white text-indigo-600 font-bold px-6 py-2 rounded-lg hover:bg-slate-100 transition-colors shadow-lg text-sm inline-block">
          View Matching Jobs →
        </Link>
      </div>

      {/* 5. Pending Actions & Deadlines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl">
          <h3 className="font-bold text-slate-200 mb-4 flex items-center"><span className="text-amber-400 mr-2">⚠️</span> Pending Actions</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center text-sm p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <span className="text-slate-300">Upload 10th Marksheet</span>
              <Link to="/vault" className="text-blue-400 hover:text-blue-300 font-bold">Go to Vault</Link>
            </li>
            <li className="flex justify-between items-center text-sm p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <span className="text-slate-300">Complete Profile Details</span>
              <Link to="/profile" className="text-blue-400 hover:text-blue-300 font-bold">Edit Profile</Link>
            </li>
          </ul>
        </div>

        <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl">
          <h3 className="font-bold text-slate-200 mb-4 flex items-center"><span className="text-red-400 mr-2">⏰</span> Upcoming Deadlines</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center text-sm p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <span className="text-slate-300 font-semibold">UPPSC RO/ARO Apply Last Date</span>
              <span className="text-red-400 font-bold text-xs bg-red-500/10 px-2 py-1 rounded">Tomorrow</span>
            </li>
            <li className="flex justify-between items-center text-sm p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <span className="text-slate-300 font-semibold">SSC CGL Tier 1 Exam</span>
              <span className="text-slate-400 text-xs font-bold">12 Nov</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;