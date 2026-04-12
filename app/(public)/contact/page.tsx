'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { VENUE_INFO } from '@/lib/constants';

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ViberIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177.523 6.726.392 9.873.262 13.02.094 18.862 5.97 20.53h.004l-.004 2.324s-.04.942.584 1.134c.755.232 1.198-.486 1.918-1.268.396-.428.94-1.058 1.352-1.538 3.73.314 6.6-.404 6.926-.514.752-.254 5.007-.792 5.702-6.462.718-5.853-.338-9.548-2.238-11.22l-.001-.002c-.556-.516-2.767-2.04-7.693-2.072 0 0-.346-.026-.843-.02l-.179.11zm.159 1.735c.42-.004.745.016.745.016 4.152.027 6.097 1.222 6.555 1.636l.002.002c1.596 1.39 2.466 4.624 1.846 9.71-.58 4.722-4.076 5.063-4.716 5.28-.27.09-2.69.694-5.784.494 0 0-2.29 2.766-3.006 3.488-.112.114-.248.158-.338.136-.126-.032-.16-.19-.158-.418l.024-3.782c-4.93-1.4-4.636-6.642-4.524-9.36.11-2.718.744-4.904 2.18-6.322 1.946-1.778 5.493-2.06 7.174-2.08zm-.22 2.824a.423.423 0 00-.423.426.424.424 0 00.424.423c1.108-.004 2.1.42 2.884 1.178.781.76 1.222 1.795 1.244 2.918a.424.424 0 00.424.419h.004a.424.424 0 00.42-.428c-.026-1.33-.553-2.561-1.48-3.464-.93-.9-2.12-1.4-3.446-1.472h-.05zm-2.342.89c-.167-.006-.34.044-.51.198l-.003.002c-.453.413-.863.87-1.21 1.376a1.348 1.348 0 00-.163 1.134c.32 1.03.81 2.004 1.447 2.886l.02.028c1.082 1.5 2.412 2.775 3.94 3.77l.028.018c.53.33 1.098.6 1.692.796l.06.016h.002a1.23 1.23 0 001.09-.22c.477-.37.89-.802 1.24-1.288.25-.346.21-.782-.094-1.065a13.282 13.282 0 00-2.253-1.694.688.688 0 00-.832.108l-.602.649a.546.546 0 01-.644.102 8.44 8.44 0 01-2.168-1.618 8.438 8.438 0 01-1.458-2.023.546.546 0 01.072-.64l.6-.652a.688.688 0 00.074-.843 14.634 14.634 0 00-1.516-2.14c-.163-.18-.375-.286-.593-.293l-.017-.001zm5.574.83a.424.424 0 00-.08.842 2.143 2.143 0 011.748 1.94.424.424 0 00.423.392l.032-.002a.423.423 0 00.39-.456 2.997 2.997 0 00-2.443-2.706.424.424 0 00-.07-.01z" />
    </svg>
  );
}
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
                    <p className="text-sm text-[#b3b3b3]">{t('contact.daily')}</p>
                  </div>
                </div>
              </div>

              {/* Reservation via WhatsApp / Viber */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0 border border-[#25D366]/20">
                  <WhatsAppIcon />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#62666d] font-semibold mb-1">
                    {t('contact.reservation')}
                  </p>
                  <div className="flex items-center gap-3">
                    <a href={VENUE_INFO.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm text-[#25D366] hover:text-[#25D366]/80 transition-colors font-medium">
                      WhatsApp
                    </a>
                    <span className="text-[#62666d]">|</span>
                    <a href={VENUE_INFO.socials.viber} target="_blank" rel="noopener noreferrer" className="text-sm text-[#7360F2] hover:text-[#7360F2]/80 transition-colors font-medium">
                      Viber
                    </a>
                  </div>
                  <p className="text-xs text-[#8a8f98] mt-0.5">{VENUE_INFO.phone}</p>
                </div>
              </div>

              {/* Social media */}
              <div className="flex items-center gap-3 pt-2">
                <a href={VENUE_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#8a8f98] transition-colors hover:border-[#00D4FF] hover:text-[#00D4FF]" aria-label="Facebook">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href={VENUE_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#8a8f98] transition-colors hover:border-[#00D4FF] hover:text-[#00D4FF]" aria-label="Instagram">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href={VENUE_INFO.socials.tiktok} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#8a8f98] transition-colors hover:border-[#00D4FF] hover:text-[#00D4FF]" aria-label="TikTok">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
                </a>
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
