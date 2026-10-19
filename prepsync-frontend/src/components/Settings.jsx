import React from 'react';

function Settings() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <span className="mr-2">⚙️</span> Settings
        </h2>
        
        <div className="space-y-4">
          {/* Account Settings */}
          <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700 hover:border-slate-500 transition-colors">
            <h3 className="text-lg font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2">Account Security</h3>
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 text-sm font-medium">Change Password</span>
              <button className="text-emerald-400 hover:text-emerald-300 text-sm font-bold">Update</button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm font-medium">Two-Factor Authentication (2FA)</span>
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-1.5 rounded-lg text-sm transition-colors">Enable</button>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700 hover:border-slate-500 transition-colors">
            <h3 className="text-lg font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2">App Preferences</h3>
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 text-sm font-medium">Email Notifications</span>
              <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold border border-emerald-500/30">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm font-medium">Theme Mode</span>
              <span className="text-slate-300 text-sm bg-slate-800 px-3 py-1 rounded-md">Dark Mode 🌙</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Settings;