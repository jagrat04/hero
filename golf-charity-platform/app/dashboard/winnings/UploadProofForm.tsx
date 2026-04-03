"use client";

import { useState } from 'react';
import { UploadCloud, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { uploadWinningProof } from '@/app/actions/winnings';

export default function UploadProofForm({ winningId }: { winningId: string }) {
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setStatus('idle');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('winningId', winningId);

    const result = await uploadWinningProof(formData);

    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
    setIsUploading(false);
  }

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-8 text-center animate-in zoom-in duration-300">
        <CheckCircle className="mx-auto text-emerald-500 mb-2" size={32} />
        <p className="text-sm font-bold text-emerald-900">Verification Submitted!</p>
        <p className="text-xs text-emerald-700 mt-1">An admin will review your scorecard shortly.</p>
      </div>
    );
  }

  return (
    <label className={`block border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer group ${
      status === 'error' ? 'border-red-300 bg-red-50' : 'border-amber-300 bg-white/50 hover:bg-white'
    }`}>
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileChange}
        disabled={isUploading}
      />
      
      {isUploading ? (
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin text-amber-500 mb-2" size={32} />
          <p className="text-sm font-medium text-amber-900">Uploading scorecard...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <UploadCloud className={`mb-2 transition-transform ${status === 'error' ? 'text-red-500' : 'text-amber-500 group-hover:-translate-y-1'}`} size={32} />
          <p className="text-sm font-medium text-amber-900">
            {status === 'error' ? 'Upload failed. Try again?' : 'Click to upload scorecard'}
          </p>
          <p className="text-xs text-amber-700 mt-1 italic">PNG or JPG preferred</p>
        </div>
      )}
    </label>
  );
}