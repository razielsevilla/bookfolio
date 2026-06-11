"use client";
import { useBookfolio } from '../../context/BookfolioContext';

export default function Page12Colophon() {
  const { data } = useBookfolio();

  const socials = [
    { name: 'GitHub', url: 'https://github.com/razielsevilla', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg> },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/razielsevilla', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
    { name: 'Email', url: 'mailto:raziel.lloyd.sevilla.cs@gmail.com', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" /></svg> }
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER VII : LETTERS TO THE HORIZON</span>
        <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">Connect Privately</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-6"></div>
      </div>

      <div className="flex-1 flex flex-col pt-4">
        <p className="text-xs leading-relaxed font-body text-[#1A2340]/90 mb-6 pr-4">
          The boundary between digital rendering and physical design is merely a matter of architecture, perspective, and clean interaction matrices.
          <br /><br />
          If you have inquiries, collaboration ideas, or wish to commission a project, my channels are open.
        </p>

        <div className="space-y-3 pr-4">
          {socials.map((social) => (
            <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-black/5 rounded-xl border border-[#4E4B46]/10 hover:bg-[var(--paper-primary)] hover:text-white hover:border-[var(--paper-primary)] text-[#1A2340] transition-all group">
              <span className="p-2 bg-white rounded-lg shadow-sm group-hover:text-[var(--paper-primary)] text-[#1A2340]">
                {social.icon}
              </span>
              <span className="font-bold text-sm font-headline tracking-wide">{social.name}</span>
            </a>
          ))}
        </div>

        <div className="mt-auto pt-6 flex flex-col pr-4">
          <div className="p-4 border border-[#4E4B46]/20 rounded-xl bg-black/5 text-center">
            <span className="font-headline italic text-lg text-[var(--paper-primary)] mb-1 block">Raziel Sevilla</span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1A2340]/60">Full-Stack Architect</span>
          </div>
        </div>
      </div>
    </div>
  );
}
