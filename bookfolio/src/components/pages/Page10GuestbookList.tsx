"use client";
import { guestbookEntries } from '../../data/mockData';

export default function Page10GuestbookList() {
  return (
    <div>
      <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER VI : ECHOES FROM THE LEDGER</span>
      <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">The Scroll of Greetings</h3>
      <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>

      <div className="h-80 overflow-y-auto page-scroll space-y-2 pr-1">
        {guestbookEntries.map((entry, idx) => (
          <div key={idx} className="p-3 bg-white/40 rounded-xl border border-[#4E4B46]/10 text-[#1A2340] text-xs font-body shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold flex items-center gap-1.5 font-headline text-sm text-[#1A2340]">
                {entry.emoji} {entry.name}
              </span>
              <span className="text-[9px] font-mono opacity-60 uppercase">{entry.date}</span>
            </div>
            <p className="opacity-90 leading-relaxed italic">{entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
