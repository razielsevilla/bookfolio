"use client";
import { useBookfolio } from '../../context/BookfolioContext';

const EMBLEMS: Record<string, React.ReactNode> = {
  '✍️': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
  '🚀': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
  '✨': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  '🔥': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 7.104 9.001c.01 0 .02.001.03.001a5.98 5.98 0 004.866-3.5C12.062 5.498 12.094 5.5 12.125 5.5a5.98 5.98 0 016.532 11.157z" /></svg>,
  '🛡️': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
};

export default function Page10GuestbookList() {
  const { data } = useBookfolio();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER VI : ECHOES FROM THE LEDGER</span>
        <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">The Scroll of Greetings</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-6"></div>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto page-scroll pr-1 pb-2">
        <div className="p-3 bg-[var(--paper-primary)]/10 rounded-xl border border-[var(--paper-primary)]/30 mb-4 text-xs leading-relaxed text-[#1A2340]/90 font-body relative overflow-hidden shrink-0">
          <div className="absolute top-0 left-0 w-1 h-full bg-[var(--paper-primary)]/50"></div>
          <strong>Leave Your Mark:</strong> The Codex is open to fellow travelers. Select an emblem, share your name, and inscribe a brief greeting on the previous page to be recorded here in the ledger.
        </div>

        {(!data.guestbook || data.guestbook.length === 0) ? (
          <div className="flex-1 flex flex-col items-center justify-center opacity-50 text-center font-body text-xs px-4 pb-10">
            <svg className="w-10 h-10 mb-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            <p>The scroll is currently blank.</p>
            <p className="mt-1">Be the first to inscribe a tale on the previous page.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {data.guestbook.map((entry, idx) => (
              <div key={idx} className="p-3 bg-white/40 rounded-xl border border-[#4E4B46]/10 text-[#1A2340] text-xs font-body shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold flex items-center gap-1.5 font-headline text-sm text-[#1A2340]">
                    <span className="text-[var(--paper-primary)]">{EMBLEMS[entry.emoji] || entry.emoji}</span> {entry.name}
                  </span>
                  <span className="text-[9px] font-mono opacity-60 uppercase">{entry.date}</span>
                </div>
                <p className="opacity-90 leading-relaxed italic">{entry.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
