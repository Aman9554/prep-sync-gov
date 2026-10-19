import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 mb-4 drop-shadow-lg">
        404
      </h1>
      <h2 className="text-3xl font-bold text-slate-200 mb-4">Oops! Page Not Found 🚀</h2>
      <p className="text-slate-400 mb-8 max-w-md text-sm">
        Lagta hai tum galat raste par aa gaye ho. Ye page exist nahi karta ya fir URL galat type ho gaya hai.
      </p>
      <Link to="/" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;