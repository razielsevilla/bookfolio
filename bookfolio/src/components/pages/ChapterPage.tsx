"use client";

interface ChapterPageProps {
  title: string;
  subtitle?: string;
}

export default function ChapterPage({ title, subtitle }: ChapterPageProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">{title}</span>
        <h3 className="text-xl font-bold mt-1 font-headline text-[#1A2340]">{subtitle || '[Placeholder]'}</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>
      </div>

      <div className="flex-1 overflow-y-auto page-scroll pr-2"></div>
    </div>
  );
}
