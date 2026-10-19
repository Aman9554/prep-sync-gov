import React, { useState } from 'react';
import toast from 'react-hot-toast';

function StudyHub() {
  const [activeModal, setActiveModal] = useState(null); // { type: 'test' | 'video', item: null }
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  const materials = [
    { id: 1, title: 'SSC CGL Previous Year (2025)', type: 'PDF', icon: '📄', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30', actionText: 'Download', url: '#' },
    { id: 2, title: 'Daily Current Affairs - Oct', type: 'Video', icon: '🎥', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30', actionText: 'Watch Now', videoId: 'dQw4w9WgXcQ' }, // Sample video ID
    { id: 3, title: 'UP Police Full Mock Test', type: 'Test', icon: '⏱️', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30', actionText: 'Start Test' },
    { id: 4, title: 'Quantitative Aptitude Tricks', type: 'Notes', icon: '📝', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30', actionText: 'Download', url: '#' },
    { id: 5, title: 'RRB NTPC GK Capsule', type: 'PDF', icon: '📄', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30', actionText: 'Download', url: '#' },
    { id: 6, title: 'English Grammar Rules', type: 'Notes', icon: '📝', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30', actionText: 'Download', url: '#' }
  ];

  const mockQuestions = [
    { id: 1, question: "Bharat ki rajdhani (Capital) kya hai?", options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"], correct: 1 },
    { id: 2, question: "National Science Day kab manaya jata hai?", options: ["28 February", "15 August", "2 October", "26 January"], correct: 0 },
    { id: 3, question: "RBI ka headquarter kahan sthit hai?", options: ["New Delhi", "Bengaluru", "Mumbai", "Kolkata"], correct: 2 }
  ];

  const handleAction = (item) => {
    if (item.type === 'Test') {
      setActiveModal({ type: 'test', item });
      setTestSubmitted(false);
      setSelectedAnswers({});
    } else if (item.type === 'Video') {
      setActiveModal({ type: 'video', item });
    } else {
      toast.success(`Downloading ${item.title}... 📥`);
    }
  };

  const handleOptionSelect = (qIndex, optIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [qIndex]: optIndex });
  };

  const submitTest = () => {
    setTestSubmitted(true);
    toast.success("Mock Test submitted successfully! 🎉");
  };

  return (
    <div className="space-y-6 relative">
      <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          <span className="mr-2">📚</span> Study Hub
        </h2>
        <p className="text-slate-400 text-sm mb-8">Free study materials, interactive mock tests, aur video lectures aapki preparation ke liye.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {materials.map((item) => (
            <div key={item.id} className="bg-slate-900/50 border border-slate-700 p-5 rounded-xl hover:border-blue-500 hover:bg-slate-800/80 transition-all flex justify-between items-center group shadow-sm">
              <div className="flex items-center space-x-4">
                <span className={`text-2xl p-3 rounded-xl border ${item.bg}`}>{item.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">{item.title}</h3>
                  <span className={`text-xs font-bold uppercase tracking-wider ${item.color}`}>{item.type}</span>
                </div>
              </div>
              <button 
                onClick={() => handleAction(item)}
                className="bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all border border-slate-600 hover:border-blue-500 hover:shadow-lg cursor-pointer"
              >
                {item.actionText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- INTERACTIVE MODAL PLAYER / VIEWER --- */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center">
                <span className="mr-2">{activeModal.type === 'test' ? '⏱️' : '🎥'}</span> 
                {activeModal.item.title}
              </h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-white font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* VIDEO PLAYER MODAL */}
              {activeModal.type === 'video' && (
                <div className="space-y-4">
                  <div className="aspect-video bg-black rounded-xl overflow-hidden border border-slate-700 flex items-center justify-center">
                    <iframe 
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/ScMzIvxBSi4" 
                      title="Study Lecture"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="text-slate-400 text-xs text-center">Yahan live video lecture chal raha hai. Aap isko full-screen bhi dekh sakte hain.</p>
                </div>
              )}

              {/* MOCK TEST MODAL */}
              {activeModal.type === 'test' && (
                <div className="space-y-6">
                  {!testSubmitted ? (
                    <div className="space-y-6">
                      {mockQuestions.map((q, qIdx) => (
                        <div key={q.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                          <p className="text-sm font-semibold text-white mb-3">Q{qIdx + 1}. {q.question}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {q.options.map((opt, optIdx) => (
                              <button
                                key={optIdx}
                                onClick={() => handleOptionSelect(qIdx, optIdx)}
                                className={`text-left px-4 py-2.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                                  selectedAnswers[qIdx] === optIdx 
                                    ? 'bg-blue-600 text-white border-blue-500 shadow-md' 
                                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}

                      <button 
                        onClick={submitTest}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg text-sm cursor-pointer"
                      >
                        Submit Test & View Score 🚀
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-4">
                      <div className="text-5xl">🏆</div>
                      <h4 className="text-xl font-bold text-white">Test Submitted Successfully!</h4>
                      <p className="text-slate-400 text-sm">Aapne mock test successfully complete kar liya hai. Apni performance analyze karne ke liye dashboard check karein.</p>
                      <button 
                        onClick={() => setActiveModal(null)}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all cursor-pointer"
                      >
                        Close Modal
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyHub;