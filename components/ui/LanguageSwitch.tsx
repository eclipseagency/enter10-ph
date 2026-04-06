'use client';

import { useI18n } from '@/lib/i18n';

export default function LanguageSwitch() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center bg-bg-card border border-border rounded-full p-0.5">
      <button
        onClick={() => setLocale('en')}
        className={[
          'px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer',
          locale === 'en'
            ? 'bg-neon-blue text-black shadow-[0_0_12px_rgba(0,212,255,0.35)]'
            : 'text-text-muted hover:text-white',
        ].join(' ')}
      >
        EN
      </button>
      <button
        onClick={() => setLocale('fil')}
        className={[
          'px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer',
          locale === 'fil'
            ? 'bg-neon-blue text-black shadow-[0_0_12px_rgba(0,212,255,0.35)]'
            : 'text-text-muted hover:text-white',
        ].join(' ')}
      >
        FIL
      </button>
    </div>
  );
}
