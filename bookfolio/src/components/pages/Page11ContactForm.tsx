"use client";
import { useState } from 'react';
import { useBookfolio } from '../../context/BookfolioContext';

export default function Page11ContactForm() {
  const { data } = useBookfolio();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const inquiry = (form.elements.namedItem('inquiry') as HTMLSelectElement).value;
    const details = (form.elements.namedItem('details') as HTMLTextAreaElement).value;

    try {
      const response = await fetch("https://formsubmit.co/ajax/raziel.lloyd.sevilla.cs@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `New Inquiry from Bookfolio: ${inquiry}`,
            Email: email,
            InquiryType: inquiry,
            Message: details
        })
      });

      if (response.ok) {
        setSuccess(true);
        form.reset();
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER VII : LETTERS TO THE HORIZON</span>
        <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">Dispatch an Envoy</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>
      </div>

      <div className="flex-1 flex flex-col">
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-3 font-body">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[var(--paper-primary)] mb-1 font-bold">Email Address</label>
            <input name="email" required type="email" placeholder="you@example.com" className="w-full bg-black/5 border border-[#4E4B46]/35 rounded-lg p-2 text-xs text-[#1A2340] focus:outline-none focus:border-[var(--paper-primary)]" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[var(--paper-primary)] mb-1 font-bold">Email Subject</label>
            <input name="inquiry" required type="text" placeholder="What is this regarding?" className="w-full bg-black/5 border border-[#4E4B46]/35 rounded-lg p-2 text-xs text-[#1A2340] focus:outline-none focus:border-[var(--paper-primary)]" />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="block text-[10px] uppercase tracking-wider text-[var(--paper-primary)] mb-1 font-bold">Email Body</label>
            <textarea name="details" required placeholder="Write your message here..." className="w-full flex-1 bg-black/5 border border-[#4E4B46]/35 rounded-lg p-2 text-xs text-[#1A2340] focus:outline-none focus:border-[var(--paper-primary)] resize-none min-h-[80px]"></textarea>
          </div>
          <button disabled={loading} type="submit" className="w-full bg-[#1A2340] text-[#F4EAD5] font-bold text-xs py-3 rounded-lg hover:bg-[#243054] transition-all flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50">
            {loading ? 'Transmitting...' : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-4a2 2 0 011.78 0l8 4A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
                Send Transmit Envelope
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/35 rounded-xl text-center mt-3 shrink-0">
            <p className="text-xs font-bold text-red-600">Transmission Failed!</p>
            <p className="text-[10px] text-red-600/80 mt-1">Please try emailing me directly instead.</p>
          </div>
        )}

        {success && (
          <div className="animate-fade-in p-3 bg-emerald-800/10 border border-emerald-800/35 rounded-xl text-center mt-3 shrink-0">
            <p className="text-xs font-bold text-emerald-900">Transmission Dispatched!</p>
            <p className="text-[10px] text-[#1A2340]/70 mt-1">Your message has been sent securely.</p>
          </div>
        )}
      </div>
    </div>
  );
}
