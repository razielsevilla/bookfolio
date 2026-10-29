"use client";
import type { ComponentType } from 'react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';

// Shared across every narrative field in the book (case studies, award
// significance, bio paragraphs, colophon copy): these are authored in
// Sanity's Portable Text editor, so an entry can bold a word or link a
// name — e.g. crediting a teammate with a link to their portfolio —
// without us having to parse plain strings for URLs.
const DEFAULT_LINK_CLASSNAME =
  'underline decoration-[var(--paper-primary)]/50 underline-offset-2 hover:text-[var(--paper-primary)] transition-colors';

function linkComponents(linkClassName?: string): PortableTextComponents {
  return {
    marks: {
      link: ({ children, value }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName ?? DEFAULT_LINK_CLASSNAME}
        >
          {children}
        </a>
      ),
    },
  };
}

function hasContent(value: unknown): value is Array<Record<string, unknown>> {
  return Array.isArray(value) && value.length > 0;
}

// Renders each paragraph as its own diamond-bulleted, justified line — the
// "scannable chunks" treatment used for case studies and award significance.
export function RichBulletSection({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value?: unknown;
}) {
  if (!hasContent(value)) return null;
  const components: PortableTextComponents = {
    ...linkComponents(),
    block: {
      normal: ({ children }) => (
        <li className="flex gap-2 text-sm text-[#1A2340]/90 font-body leading-relaxed">
          <span className="text-[var(--paper-primary)] shrink-0 mt-[7px] text-[7px]">&#9670;</span>
          <span className="text-justify">{children}</span>
        </li>
      ),
    },
  };
  return (
    <div className="border-l-2 border-[var(--paper-primary)]/25 pl-3">
      <div className="flex items-center gap-1.5">
        <Icon className="w-3 h-3 text-[var(--paper-primary)] shrink-0" />
        <span className="text-[10px] uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">{label}</span>
      </div>
      <ul className="mt-1.5 space-y-1.5">
        <PortableText value={value} components={components} />
      </ul>
    </div>
  );
}

// Renders each paragraph as a plain <p>, for prose that shouldn't be
// bulleted (bios, colophon copy, cover blurbs) — one block in, one
// paragraph out, with whatever styling the call site needs.
export function RichParagraphs({
  value,
  className,
  paragraphClassName,
  linkClassName,
}: {
  value?: unknown;
  className?: string;
  paragraphClassName?: string;
  linkClassName?: string;
}) {
  if (!hasContent(value)) return null;
  const components: PortableTextComponents = {
    ...linkComponents(linkClassName),
    block: {
      normal: ({ children }) => <p className={paragraphClassName}>{children}</p>,
    },
  };
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
