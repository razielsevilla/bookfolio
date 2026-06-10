"use client";
import { useState } from 'react';
import { useBookfolio } from '../../context/BookfolioContext';

export default function Page5ProjectsList() {
  const [filter, setFilter] = useState('all');
  const { goToSheet, data, setSelectedProject } = useBookfolio();

  const filteredItems = data.projects.filter(item => filter === 'all' || item.category === filter);

  const viewProject = (id: string) => {
    setSelectedProject(id);
    goToSheet(3);
  };

  return (
    <div>
      <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER IV : RELICS OF CREATION</span>
      <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">The Great Forge</h3>
      <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-3"></div>

      <div className="flex items-center space-x-2 mb-3 text-xs font-body">
        <button type="button" onClick={() => setFilter('all')} className={`px-2.5 py-1 rounded-md font-medium transition-all ${filter === 'all' ? 'bg-[#1A2340] text-[#F4EAD5]' : 'bg-black/5 hover:bg-black/10 border border-[#4E4B46]/20 text-[#1A2340]'}`}>All</button>
        <button type="button" onClick={() => setFilter('dev')} className={`px-2.5 py-1 rounded-md font-medium transition-all ${filter === 'dev' ? 'bg-[#1A2340] text-[#F4EAD5]' : 'bg-black/5 hover:bg-black/10 border border-[#4E4B46]/20 text-[#1A2340]'}`}>Develop</button>
        <button type="button" onClick={() => setFilter('design')} className={`px-2.5 py-1 rounded-md font-medium transition-all ${filter === 'design' ? 'bg-[#1A2340] text-[#F4EAD5]' : 'bg-black/5 hover:bg-black/10 border border-[#4E4B46]/20 text-[#1A2340]'}`}>Design</button>
      </div>

      <div className="h-[310px] overflow-y-auto page-scroll pr-1">
        <div className="grid grid-cols-2 gap-3">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              onClick={() => viewProject(item.id)}
              className={`h-24 rounded-lg bg-gradient-to-br ${item.color} p-3 flex flex-col justify-between border border-[#4E4B46] hover:border-[#D4A574] cursor-pointer shadow-md group relative overflow-hidden`}
            >
              <div className="absolute -right-6 -bottom-6 opacity-20 group-hover:scale-110 transition-transform duration-500" dangerouslySetInnerHTML={{ __html: item.graphic }} />
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-black/40 text-[#D4A574] rounded backdrop-blur-sm uppercase tracking-wider border border-[#D4A574]/30">
                  {item.tag.split('/')[0].trim()}
                </span>
                <svg className="w-4 h-4 text-[#D4A574] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <div className="relative z-10">
                <h4 className="text-white font-bold text-xs font-headline truncate tracking-wide">{item.title}</h4>
                <p className="text-[9px] text-[#F4EAD5]/60 mt-0.5 truncate font-body">{item.client}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
