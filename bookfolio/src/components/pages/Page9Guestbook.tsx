"use client";
import { useState } from 'react';
import { useBookfolio } from '../../context/BookfolioContext';

export default function Page9Guestbook() {
  const { data } = useBookfolio();
  const [selectedEmoji, setSelectedEmoji] = useState('✍️');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handled in original by updating local state / DOM
    alert("Publishing to Codex...");
  };

  return (
    <div>
      <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER VI : ECHOES FROM THE LEDGER</span>
      <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">Inscribe Your Tale</h3>
      <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>

      <form onSubmit={handleSubmit} className="space-y-3 mb-4 font-body">
        <div className="grid grid-cols-2 gap-2">
          <input required type="text" placeholder="Your Name" className="w-full bg-black/5 border border-[#4E4B46]/35 rounded-lg p-2.5 text-xs text-[#1A2340] focus:outline-none focus:border-[var(--paper-primary)] placeholder-[#1A2340]/50" />
          <div className="flex items-center space-x-1 justify-around bg-black/5 border border-[#4E4B46]/35 rounded-lg px-2">
            <button type="button" onClick={() => setSelectedEmoji('✍️')} className="emoji-btn text-sm hover:scale-125 transition-transform" title="Author">✍️</button>
            <button type="button" onClick={() => setSelectedEmoji('🚀')} className="emoji-btn text-sm hover:scale-125 transition-transform" title="Rocket">🚀</button>
            <button type="button" onClick={() => setSelectedEmoji('✨')} className="emoji-btn text-sm hover:scale-125 transition-transform" title="Sparkle">✨</button>
            <button type="button" onClick={() => setSelectedEmoji('🔥')} className="emoji-btn text-sm hover:scale-125 transition-transform" title="Fire">🔥</button>
            <span className="text-xs font-mono ml-1 font-bold text-[var(--paper-primary)]">{selectedEmoji}</span>
          </div>
        </div>
        <textarea required placeholder="Type a short greeting..." rows={3} className="w-full bg-black/5 border border-[#4E4B46]/35 rounded-lg p-2.5 text-xs text-[#1A2340] focus:outline-none focus:border-[var(--paper-primary)] placeholder-[#1A2340]/50 resize-none"></textarea>
        <button type="submit" className="w-full bg-[#1A2340] text-[#F4EAD5] font-bold text-xs py-2.5 rounded-lg hover:bg-[#243054] transition-all flex items-center justify-center gap-1 shadow-md">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Publish to Codex
        </button>
      </form>
    </div>
  );
}
