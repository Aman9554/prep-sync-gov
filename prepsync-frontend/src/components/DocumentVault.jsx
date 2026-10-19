import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function DocumentVault() {
  const [documents, setDocuments] = useState({
    aadhar: "", photo: "", signature: "", tenthMarksheet: "", twelfthMarksheet: "", marksheet: "",
    income: "", domicile: "", caste: ""
  });
  const [loadingDoc, setLoadingDoc] = useState(null);

  // Page khulte hi backend se saved documents fetch karna
  useEffect(() => {
    fetch('http://localhost:5001/api/user/profile')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user && data.user.documents) {
          setDocuments(data.user.documents);
        }
      })
      .catch(err => console.log("Fetch Error:", err));
  }, []);

  // Live Backend Database ke sath Document Upload API integration
  const handleUpload = async (docId, docTitle) => {
    const fileName = `${docTitle.replace(/ /g, "_")}_Aman.pdf`; 
    setLoadingDoc(docId);
    
    try {
      const response = await fetch('http://localhost:5001/api/user/upload-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docType: docId, fileName: fileName })
      });
      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setDocuments(data.documents || { ...documents, [docId]: fileName });
      } else {
        toast.error('Upload failed on server!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Server error during upload!');
    } finally {
      setLoadingDoc(null);
    }
  };

  const docList = [
    { id: 'photo', title: 'Passport Photo', icon: '📸' },
    { id: 'signature', title: 'Scanned Signature', icon: '✍️' },
    { id: 'aadhar', title: 'Aadhar Card', icon: '🪪' },
    { id: 'tenthMarksheet', title: '10th Marksheet', icon: '📜' },
    { id: 'twelfthMarksheet', title: '12th Marksheet', icon: '📜' },
    { id: 'marksheet', title: 'Graduation Degree', icon: '🎓' },
    { id: 'income', title: 'Income Certificate', icon: '💰' },
    { id: 'domicile', title: 'Domicile Certificate', icon: '🏠' },
    { id: 'caste', title: 'Caste Certificate', icon: '📄' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl shadow-xl">
        <h3 className="text-xl font-bold text-slate-200 mb-2">🔐 Secure Document Vault (Live Database)</h3>
        <p className="text-sm text-slate-400 mb-8">Apne saare zaroori documents yahan upload karo taaki 1-Click Apply kar sako.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docList.map(doc => {
            const isUploaded = documents[doc.id] !== "" && documents[doc.id] !== undefined;
            const isLoading = loadingDoc === doc.id;
            
            return (
              <div key={doc.id} className={`p-5 rounded-xl border transition-all duration-300 ${isUploaded ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-slate-900/50 border-slate-700 hover:border-slate-500'}`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl bg-slate-800 p-2 rounded-lg">{doc.icon}</span>
                    <div>
                      <h4 className={`font-semibold ${isUploaded ? 'text-emerald-400' : 'text-slate-200'}`}>{doc.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{isUploaded ? documents[doc.id] : 'Not uploaded yet'}</p>
                    </div>
                  </div>
                  
                  {isUploaded ? (
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1.5 rounded-full border border-emerald-500/30 flex items-center">
                      <span className="mr-1">✓</span> Verified
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleUpload(doc.id, doc.title)} 
                      disabled={isLoading}
                      className="bg-blue-600/20 text-blue-400 text-xs px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition border border-blue-500/30 cursor-pointer"
                    >
                      {isLoading ? 'Uploading...' : 'Upload'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DocumentVault;