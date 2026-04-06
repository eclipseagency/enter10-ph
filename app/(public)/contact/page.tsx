'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { VENUE_INFO } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

export default function ContactPage() {
  const { t } = useI18n();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    // Simulate send - replace with actual API call
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
  }

  const mapSrc = VENUE_INFO.mapsEmbed;

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 60% 40% at 30% 30%, rgba(0,212,255,0.05) 0%, transparent 60%)',
            'radial-gradient(ellipse 50% 40% at 70% 70%, rgba(255,45,120,0.04) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-14 animate-fadeIn">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-text inline-block mb-5"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t('contact.title')}
          </h1>
          <p className="text-lg sm:text-xl text-[#b3b3b3] max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Map & Info */}
          <div className="flex flex-col gap-6">
            {/* Google Maps embed */}
            <div className="glass rounded-2xl overflow-hidden hover:-translate-y-[2px] transition-all duration-300 hover:border-[rgba(255,255,255,0.15)]">
              <iframe
                title="Enter10 Philippines Location"
                src={mapSrc}
                width="100%"
                height="300"
                className="border-0 w-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Info card */}
            <div className="glass rounded-2xl p-6 space-y-6 hover:-translate-y-[2px] transition-all duration-300 hover:border-[rgba(255,255,255,0.15)]">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-neon-blue/10 flex items-center justify-center shrink-0 border border-neon-blue/20">
                  <svg className="w-5 h-5 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#62666d] font-semibold mb-1">
                    {t('contact.address')}
                  </p>
                  <p className="text-sm text-[#b3b3b3]">{VENUE_INFO.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-neon-magenta/10 flex items-center justify-center shrink-0 border border-neon-magenta/20">
                  <svg className="w-5 h-5 text-neon-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#62666d] font-semibold mb-1">
                    {t('contact.phone')}
                  </p>
                  <a href={`tel:${VENUE_INFO.phone}`} className="text-sm text-[#b3b3b3] hover:text-neon-blue transition-colors">
                    {VENUE_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-neon-gold/10 flex items-center justify-center shrink-0 border border-neon-gold/20">
                  <svg className="w-5 h-5 text-neon-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#62666d] font-semibold mb-1">
                    {t('contact.email')}
                  </p>
                  <a href={`mailto:${VENUE_INFO.email}`} className="text-sm text-[#b3b3b3] hover:text-neon-blue transition-colors">
                    {VENUE_INFO.email}
                  </a>
                </div>
              </div>

              {/* Operating hours */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-success/10 flex items-center justify-center shrink-0 border border-success/20">
                  <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#62666d] font-semibold mb-1.5">
                    {t('contact.hours')}
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm text-[#b3b3b3]">{t('contact.weekday')}</p>
                    <p className="text-sm text-[#b3b3b3]">{t('contact.weekend')}</p>
                  </div>
                </div>
              </div>

              {/* Get Directions */}
              <a
                href={VENUE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-neon-blue hover:text-neon-blue/80 transition-colors mt-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                {t('contact.directions')}
              </a>
            </div>
          </div>

          {/* Right: Contact form */}
          <div>
            <div className="glass rounded-2xl p-6 sm:p-8 hover:-translate-y-[2px] transition-all duration-300 hover:border-[rgba(255,255,255,0.15)]">
              <h2
                className="text-xl font-bold text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                {t('contact.formTitle')}
              </h2>

              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
                    <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold text-lg mb-2">Message Sent!</p>
                  <p className="text-[#8a8f98] text-sm mb-6">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <Button variant="secondary" size="sm" onClick={() => setSent(false)}>
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label={t('contact.formName')}
                    placeholder="Juan dela Cruz"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label={t('contact.formEmail')}
                    type="email"
                    placeholder="juan@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#8a8f98]">
                      {t('contact.formMessage')}
                    </label>
                    <textarea
                      className={[
                        'w-full rounded-xl bg-[#0f1011] border border-[rgba(255,255,255,0.1)] px-4 py-3 text-[#f7f8f8] text-sm',
                        'placeholder:text-[#62666d]',
                        'transition-colors duration-200',
                        'focus:outline-none focus:border-[#00D4FF]',
                        'resize-none',
                      ].join(' ')}
                      rows={5}
                      placeholder="How can we help you?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={sending}
                  >
                    {sending ? 'Sending...' : t('contact.formSend')}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
