import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Bell, Sparkles, User, Settings as SettingsIcon, LogOut, X, Send } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

// Saare Components Import ho rahe hain
import Dashboard from './components/Dashboard';
import Eligibility from './components/Eligibility';
import DocumentVault from './components/DocumentVault';
import Profile from './components/Profile';
import SyllabusTracker from './components/SyllabusTracker';
import AppTracker from './components/AppTracker';
import StudyHub from './components/StudyHub';
import Login from './components/Login';
import SettingsPage from './components/Settings';
import NotFound from './components/NotFound';
import AdminAddJob from './components/AdminAddJob';
import AllJobs from './components/AllJobs';

// --- LAYOUT COMPONENT ---
function Layout({ children }) {
  const location = useLocation();
  
  // States
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatInput, setChatInput] = useState('');

  // Login page par Sidebar hide karne ka logic
  if (location.pathname === '/login') {
    return <div className="bg-slate-950 min-h-screen text-white">{children}</div>;
  }

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'My Eligibility', path: '/eligibility' },
    { name: 'All Jobs', path: '/jobs' },
    { name: 'Syllabus Tracker', path: '/syllabus' },
    { name: 'App Tracker', path: '/tracker' },
    { name: 'Document Vault', path: '/vault' },
    { name: 'Study Hub', path: '/study' }
  ];
  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex">
        <div className="p-6">
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tight">
            PrepSync
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`block px-4 py-3 rounded-xl transition-all font-medium text-sm ${location.pathname === link.path ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 text-center">
            <p className="text-xs text-slate-400">PrepSync AI v1.0</p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* TOPBAR */}
        <header className="h-20 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 z-10">
          <h2 className="text-xl font-bold text-slate-100 capitalize">
            {location.pathname === '/' ? 'Dashboard' : location.pathname.replace('/', '').replace('-', ' ')}
          </h2>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <Sparkles className="w-4 h-4 text-emerald-400 mr-2" />
              <span className="text-xs font-bold text-emerald-400">AI Engine Active</span>
            </div>
            
            {/* NOTIFICATION BELL DROPDOwn (Naya Code Yahan Hai) */}
            <div className="relative">
              <button 
                className="relative text-slate-400 hover:text-white transition-colors mt-1" 
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
              </button>

              {/* Notification Menu */}
              {showNotifications && (
                <div className="absolute right-0 mt-4 w-72 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-700 flex justify-between items-center">
                    <h3 className="font-bold text-slate-100 text-sm">Notifications</h3>
                    <span className="text-xs text-blue-400 cursor-pointer hover:text-blue-300">Mark all read</span>
                  </div>
                  <div className="p-2 max-h-64 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-slate-700/50 rounded-lg cursor-pointer transition-colors mb-1">
                      <p className="text-sm text-slate-200">🚀 SSC CGL 2026 Tier 1 Admit Card Released!</p>
                      <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-slate-700/50 rounded-lg cursor-pointer transition-colors">
                      <p className="text-sm text-slate-200">✨ AI matched 3 new jobs for your profile.</p>
                      <p className="text-xs text-slate-500 mt-1">5 hours ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold border-2 border-slate-700 hover:border-slate-500 transition-all"
              >
                AP
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                  <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white" onClick={() => setShowProfileMenu(false)}>
                    <User className="w-4 h-4 mr-3" /> Profile
                  </Link>
                  <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white" onClick={() => setShowProfileMenu(false)}>
                    <SettingsIcon className="w-4 h-4 mr-3" /> Settings
                  </Link>
                  <div className="border-t border-slate-700 my-1"></div>
                  <Link to="/login" className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300" onClick={() => setShowProfileMenu(false)}>
                    <LogOut className="w-4 h-4 mr-3" /> Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN SCROLLABLE AREA */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-950 relative">
          {children}
        </main>
        
        {/* FLOATING AI BUTTON */}
        <button 
          onClick={() => setShowAIChat(true)}
          className="absolute bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:scale-110 z-40"
        >
          <Sparkles className="w-6 h-6" />
        </button>

        {/* AI CHATBOX WIDGET */}
        {showAIChat && (
          <div className="absolute bottom-24 right-8 w-80 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
            <div className="bg-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="font-bold text-slate-100">PrepSync AI</h3>
              </div>
              <button onClick={() => setShowAIChat(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-64 p-4 overflow-y-auto">
              <div className="bg-slate-700 text-sm text-slate-200 p-3 rounded-xl rounded-tl-none inline-block max-w-[85%]">
                Hi Aman! How can I help with your exam prep today?
              </div>
            </div>
            <div className="p-3 border-t border-slate-700 bg-slate-900 flex items-center">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask anything..." 
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
              <button className="ml-2 w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-500">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- MAIN APP ROUTER ---
function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/vault" element={<DocumentVault />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/syllabus" element={<SyllabusTracker />} />
          <Route path="/tracker" element={<AppTracker />} />
          <Route path="/study" element={<StudyHub />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin/add-job" element={<AdminAddJob />} />
          <Route path="/jobs" element={<AllJobs />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;