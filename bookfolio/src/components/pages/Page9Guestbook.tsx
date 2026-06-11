"use client";
import { useState } from 'react';
import { useBookfolio } from '../../context/BookfolioContext';

const EMBLEMS: Record<string, React.ReactNode> = {
  '✍️': <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
  '🚀': <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
  '✨': <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  '🔥': <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 7.104 9.001c.01 0 .02.001.03.001a5.98 5.98 0 004.866-3.5C12.062 5.498 12.094 5.5 12.125 5.5a5.98 5.98 0 016.532 11.157z" /></svg>,
  '🛡️': <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
};

export default function Page9Guestbook() {
  const { data, addGuestbookEntry, nextPage } = useBookfolio();
  const [selectedEmoji, setSelectedEmoji] = useState('✍️');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.target as HTMLFormElement;
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    const messageInput = form.elements.namedItem('message') as HTMLTextAreaElement;

    const name = nameInput.value;
    const message = messageInput.value;
    
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, emoji: selectedEmoji }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to publish');
      }

      const now = new Date();
      const dateString = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      // Add to local state instantly
      addGuestbookEntry({
        name,
        message,
        emoji: selectedEmoji,
        date: dateString,
      });

      setSuccess(true);
      form.reset();
      
      // Flip to next page automatically after short delay
      setTimeout(() => {
        nextPage();
        setSuccess(false); // reset for next time they come back
      }, 1500);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER VI : ECHOES FROM THE LEDGER</span>
        <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">Inscribe Your Tale</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-3"></div>
      </div>

      <div className="flex-1 flex flex-col justify-center pb-2">
        {error && (
          <div className="p-2 mb-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-600 font-body">
            {error}
          </div>
        )}

        {success && (
          <div className="p-2 mb-3 bg-green-500/10 border border-green-500/30 rounded-lg text-xs text-green-700 font-body font-bold text-center">
            Inscribed successfully! Turning page...
          </div>
        )}

        <form onSubmit={handleSubmit} className={`flex-1 flex flex-col space-y-3 font-body transition-opacity duration-300 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
          <div>
            <label className="text-[9px] uppercase tracking-widest text-[var(--paper-primary)] font-bold block mb-1">Your Name</label>
            <input required name="name" type="text" placeholder="Type your name..." className="w-full bg-black/5 border border-[#4E4B46]/20 rounded-lg p-2.5 text-xs text-[#1A2340] focus:outline-none focus:border-[var(--paper-primary)] placeholder-[#1A2340]/40" />
          </div>

          <div>
            <label className="text-[9px] uppercase tracking-widest text-[var(--paper-primary)] font-bold block mb-1">Select Emblem</label>
            <div className="flex items-center space-x-2 bg-black/5 border border-[#4E4B46]/20 rounded-lg p-1.5">
              {Object.keys(EMBLEMS).map(emoji => (
                <button 
                  key={emoji}
                  type="button" 
                  onClick={() => setSelectedEmoji(emoji)} 
                  className={`emoji-btn flex-1 py-1.5 rounded-md transition-all duration-200 text-[#1A2340] ${selectedEmoji === emoji ? 'bg-white/50 scale-105 drop-shadow-sm opacity-100 ring-1 ring-[var(--paper-primary)]/30 text-[var(--paper-primary)]' : 'opacity-40 hover:opacity-70 hover:bg-black/5'}`}
                >
                  {EMBLEMS[emoji]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <label className="text-[9px] uppercase tracking-widest text-[var(--paper-primary)] font-bold block mb-1">Your Message</label>
            <textarea required name="message" placeholder="Write a short greeting..." className="w-full flex-1 bg-black/5 border border-[#4E4B46]/20 rounded-lg p-2.5 text-xs text-[#1A2340] focus:outline-none focus:border-[var(--paper-primary)] placeholder-[#1A2340]/40 resize-none min-h-[80px]"></textarea>
          </div>
          
          <div className="pt-1 shrink-0">
            <button disabled={isSubmitting} type="submit" className="w-full bg-[#1A2340] text-[#F4EAD5] font-bold text-xs py-3 rounded-lg hover:bg-[#243054] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <span className="animate-pulse">Inscribing...</span>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Publish to Codex
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
