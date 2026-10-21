import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const navigate = useNavigate(); // Login ke baad Dashboard par bhejne ke liye

  // Input fields mein type karne par state update karna
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Forgot Password button ka logic
  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error('Pehle apna email enter karo bhai! 😅');
    } else {
      toast.success(`Password reset link ${formData.email} par bhej diya gaya hai! 📧`, { duration: 4000 });
    }
  };

  // Asli Backend Login / Signup Submit Logic
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    const endpoint = isLogin ? '/api/user/login' : '/api/user/signup';
    const toastId = toast.loading(isLogin ? 'Verifying credentials... 🚀' : 'Creating your account... ✨');

    try {
      const response = await fetch(`https://apka-render-backend-url.onrender.com${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        if (isLogin) {
          toast.success('Login Successful! Welcome to PrepSync 🎉', { id: toastId });
          // Token aur user details browser mein save kar lo
          if (data.token) localStorage.setItem('token', data.token);
          if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
          
          // 1 second baad seedha Dashboard par le jao
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          toast.success('Account ban gaya! Ab login karo. ✅', { id: toastId });
          setIsLogin(true); // Signup ke baad Login tab par switch kar do
          setFormData({ name: '', email: formData.email, password: '' });
        }
      } else {
        toast.error(data.message || 'Authentication failed!', { id: toastId });
      }
    } catch (error) {
      console.error('Auth Error:', error);
      toast.error('Server se connect nahi ho paya! Backend chalu hai na?', { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl shadow-2xl w-full max-w-md backdrop-blur-sm">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 mb-2">
            PrepSync
          </h1>
          <p className="text-slate-400 text-sm">
            {isLogin ? 'Welcome back! Ready to crack the exam?' : 'Join the smartest Govt Job preparation platform.'}
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex bg-slate-900/50 p-1 rounded-xl mb-8 border border-slate-700">
          <button 
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${isLogin ? 'bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Log In
          </button>
          <button 
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${!isLogin ? 'bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLoginSubmit}>
          
          {!isLogin && (
            <div>
              <label className="block text-slate-300 text-sm mb-1">Full Name</label>
              <input 
                type="text" 
                name="name"
                required={!isLogin}
                value={formData.name}
                onChange={handleChange}
                placeholder="Aman Pandey" 
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
              />
            </div>
          )}

          <div>
            <label className="block text-slate-300 text-sm mb-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              required
              placeholder="amanpandey2@gmail.com" 
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              required
              placeholder="••••••••" 
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
            />
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={handleForgotPassword} 
                className="text-emerald-400 text-sm font-semibold hover:text-emerald-300"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] mt-4">
            {isLogin ? 'Sign In 🚀' : 'Create Account ✨'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-slate-500 text-xs hover:text-slate-300 underline">
            Skip to Dashboard (Testing)
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;