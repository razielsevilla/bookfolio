"use client";
import { useState } from 'react';

export default function Page11ContactForm() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div>
      <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER VII : LETTERS TO THE HORIZON</span>
      <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">Dispatch an Envoy</h3>
      <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>

      <form onSubmit={handleSubmit} className="space-y-3 font-body">
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-[var(--paper-primary)] mb-1 font-bold">Email Address</label>
          <input required type="email" className="w-full bg-black/5 border border-[#4E4B46]/35 rounded-lg p-2 text-xs text-[#1A2340] focus:outline-none focus:border-[var(--paper-primary)]" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-[var(--paper-primary)] mb-1 font-bold">Nature of Inquiry</label>
          <select className="w-full bg-black/5 border border-[#4E4B46]/35 rounded-lg p-2 text-xs text-[#1A2340] focus:outline-none focus:border-[var(--paper-primary)]">
            <option>System Architecture</option>
            <option>3D Interface Commission</option>
            <option>Speaking &amp; Lectures</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-[var(--paper-primary)] mb-1 font-bold">Project Details</label>
          <textarea required rows={3} className="w-full bg-black/5 border border-[#4E4B46]/35 rounded-lg p-2 text-xs text-[#1A2340] focus:outline-none focus:border-[var(--paper-primary)] resize-none"></textarea>
        </div>
        <button type="submit" className="w-full bg-[#1A2340] text-[#F4EAD5] font-bold text-xs py-2 rounded-lg hover:bg-[#243054] transition-all flex items-center justify-center gap-1.5 shadow-md">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-4a2 2 0 011.78 0l8 4A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
          </svg>
          Send Transmit Envelope
        </button>
      </form>

      {success && (
        <div className="animate-fade-in p-4 bg-emerald-800/10 border border-emerald-800/35 rounded-xl text-center mt-3">
          <svg className="w-8 h-8 text-emerald-800 mx-auto mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs font-bold text-emerald-900">Transmission Dispatched!</p>
          <p className="text-[10px] text-[#1A2340]/70 mt-1">Your envelope was folded, parsed, and logged.</p>
        </div>
      )}
    </div>
  );
}
