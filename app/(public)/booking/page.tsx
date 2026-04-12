'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ACTIVITIES, PACKAGES, TIME_SLOTS } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import StepIndicator from '@/components/ui/StepIndicator';
import type { BookingFormData } from '@/types';

/* ------------------------------------------------------------------ */
/*  Bookable activities = everything with price > 0                   */
/* ------------------------------------------------------------------ */
const BOOKABLE_ACTIVITIES = ACTIVITIES.filter((a) => a.price > 0);

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */
function todayISO() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

function formatCurrency(amount: number) {
  return `\u20B1${amount.toLocaleString()}`;
}

function addHour(time: string) {
  const [h, m] = time.split(':').map(Number);
  const next = (h + 1) % 24;
  return `${String(next).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

const INITIAL_FORM: BookingFormData = {
  type: 'activity',
  activity_id: null,
  package_id: null,
  package_type: null,
  date: '',
  time: '',
  end_time: '',
  num_people: 1,
  num_lanes: 1,
  guest_name: '',
  guest_email: '',
  guest_phone: '',
  company_name: '',
  special_requests: '',
};

/* ------------------------------------------------------------------ */
/*  Inner booking component (uses useSearchParams)                    */
/* ------------------------------------------------------------------ */
function BookingFlow() {
  const searchParams = useSearchParams();
  const { t } = useI18n();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<BookingFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* Pre-select package type from URL ?package=school|corporate|birthday */
  useEffect(() => {
    const pkgParam = searchParams.get('package');
    if (pkgParam) {
      const matched = PACKAGES.find(
        (p) => p.type === pkgParam.toLowerCase(),
      );
      if (matched) {
        setForm((f) => ({
          ...f,
          type: 'package',
          package_id: matched.id,
          package_type: matched.type,
          num_people: matched.minPeople,
        }));
        setStep(1);
      }
    }
  }, [searchParams]);

  /* ---- derived ---------------------------------------------------- */
  const selectedActivity = useMemo(
    () => BOOKABLE_ACTIVITIES.find((a) => a.id === form.activity_id) ?? null,
    [form.activity_id],
  );

  const selectedPackage = useMemo(
    () => PACKAGES.find((p) => p.id === form.package_id) ?? null,
    [form.package_id],
  );

  const isBowling = selectedActivity?.name === 'Bowling';

  const needsCompany =
    form.type === 'package' &&
    (selectedPackage?.type === 'school' ||
      selectedPackage?.type === 'corporate');

  const priceEstimate = useMemo(() => {
    if (form.type === 'activity' && selectedActivity) {
      if (isBowling) {
        return selectedActivity.price * form.num_lanes;
      }
      return selectedActivity.price * form.num_people;
    }
    if (form.type === 'package' && selectedPackage) {
      return selectedPackage.price * form.num_people;
    }
    return 0;
  }, [form.type, selectedActivity, selectedPackage, form.num_people, form.num_lanes, isBowling]);

  const stepLabels = [
    t('booking.step1'),
    t('booking.step2'),
    t('booking.step3'),
    t('booking.step4'),
  ];

  /* ---- helpers ---------------------------------------------------- */
  function patch(partial: Partial<BookingFormData>) {
    setForm((f) => ({ ...f, ...partial }));
    /* Clear errors for changed fields */
    const keys = Object.keys(partial);
    setErrors((prev) => {
      const next = { ...prev };
      keys.forEach((k) => delete next[k]);
      return next;
    });
  }

  function goNext() {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, 3));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  /* ---- validation ------------------------------------------------- */
  function validateStep(): boolean {
    const errs: Record<string, string> = {};

    if (step === 0) {
      /* type is always set */
    }

    if (step === 1) {
      if (form.type === 'activity' && !form.activity_id) {
        errs.activity_id = 'Please select an activity';
      }
      if (form.type === 'package' && !form.package_id) {
        errs.package_id = 'Please select a package';
      }
      if (!form.date) errs.date = 'Please choose a date';
      if (!form.time) errs.time = 'Please choose a time slot';
      if (form.num_people < 1) errs.num_people = 'At least 1 person';
      if (
        form.type === 'package' &&
        selectedPackage &&
        form.num_people < selectedPackage.minPeople
      ) {
        errs.num_people = `Minimum ${selectedPackage.minPeople} people`;
      }
      if (
        form.type === 'package' &&
        selectedPackage &&
        form.num_people > selectedPackage.maxPeople
      ) {
        errs.num_people = `Maximum ${selectedPackage.maxPeople} people`;
      }
      if (isBowling && (form.num_lanes < 1 || form.num_lanes > 6)) {
        errs.num_lanes = 'Between 1 and 6 lanes';
      }
    }

    if (step === 2) {
      if (!form.guest_name.trim()) errs.guest_name = 'Name is required';
      if (!form.guest_email.trim()) errs.guest_email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.guest_email))
        errs.guest_email = 'Enter a valid email';
      if (!form.guest_phone.trim()) errs.guest_phone = 'Phone is required';
      if (needsCompany && !form.company_name.trim())
        errs.company_name = 'Company / school name is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  /* ---- submit ----------------------------------------------------- */
  async function handleSubmit() {
    if (!validateStep()) return;
    setSubmitting(true);

    const payload = {
      ...form,
      end_time: addHour(form.time),
      total_price: priceEstimate,
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Booking failed');
      setSubmitted(true);
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setForm(INITIAL_FORM);
    setStep(0);
    setErrors({});
    setSubmitted(false);
    setSubmitting(false);
  }

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  /* -- SUCCESS STATE ----------------------------------------------- */
  if (submitted) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center animate-fadeIn">
          {/* Checkmark with celebration ring */}
          <div className="relative mx-auto mb-6 w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-success/5 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="relative w-20 h-20 rounded-full bg-success/10 border-2 border-success flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.25)]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-success" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ letterSpacing: '-0.02em' }}>{t('booking.success')}</h2>
          <p className="text-[#8a8f98] mb-8">{t('booking.successMsg')}</p>
          <Button onClick={reset} size="lg">
            {t('booking.bookAnother')}
          </Button>
        </div>
      </section>
    );
  }

  /* -- MAIN FLOW --------------------------------------------------- */
  return (
    <section className="min-h-[80vh] pt-28 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <h1
          className="text-3xl md:text-4xl font-bold text-center mb-10 gradient-text"
          style={{ letterSpacing: '-0.03em' }}
        >
          {t('booking.title')}
        </h1>

        {/* Step indicator */}
        <div className="mb-10">
          <StepIndicator steps={stepLabels} currentStep={step} />
        </div>

        {/* Step content - simple conditional rendering */}
        <div className="min-h-[420px]">
          {step === 0 && <Step1 form={form} patch={patch} t={t} />}
          {step === 1 && (
            <Step2
              form={form}
              patch={patch}
              errors={errors}
              selectedActivity={selectedActivity}
              selectedPackage={selectedPackage}
              isBowling={isBowling}
              priceEstimate={priceEstimate}
              t={t}
            />
          )}
          {step === 2 && (
            <Step3
              form={form}
              patch={patch}
              errors={errors}
              needsCompany={needsCompany}
              t={t}
            />
          )}
          {step === 3 && (
            <Step4
              form={form}
              selectedActivity={selectedActivity}
              selectedPackage={selectedPackage}
              priceEstimate={priceEstimate}
              t={t}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 gap-4">
          {step > 0 ? (
            <Button variant="ghost" onClick={goBack}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              {t('booking.back')}
            </Button>
          ) : (
            <span />
          )}

          {step < 3 ? (
            <Button onClick={goNext} size="lg">
              {t('booking.next')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              size="lg"
              disabled={submitting}
              className="!px-10 !py-4 !text-base"
            >
              {submitting ? t('booking.submitting') : t('booking.submit')}
            </Button>
          )}
        </div>

        {errors.submit && (
          <p className="text-error text-sm text-center mt-4">
            {errors.submit}
          </p>
        )}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  STEP 1 -- Choose Type                                              */
/* ================================================================== */
function Step1({
  form,
  patch,
  t,
}: {
  form: BookingFormData;
  patch: (p: Partial<BookingFormData>) => void;
  t: (key: string) => string;
}) {
  const options: {
    value: 'activity' | 'package';
    label: string;
    desc: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: 'activity',
      label: t('booking.typeActivity'),
      desc: t('booking.typeActivityDesc'),
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neon-blue">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12h8M12 8v8"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
    },
    {
      value: 'package',
      label: t('booking.typePackage'),
      desc: t('booking.typePackageDesc'),
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neon-magenta">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.29 7 12 12 20.71 7"/>
          <line x1="12" y1="22" x2="12" y2="12"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {options.map((opt) => {
        const active = form.type === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() =>
              patch({
                type: opt.value,
                activity_id: null,
                package_id: null,
                package_type: null,
                num_people: 1,
                num_lanes: 1,
              })
            }
            className={[
              'relative flex flex-col items-center text-center gap-4 p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer',
              'bg-bg-card hover:-translate-y-[2px]',
              active
                ? opt.value === 'activity'
                  ? 'border-neon-blue shadow-[0_0_40px_rgba(0,212,255,0.3),0_0_80px_rgba(0,212,255,0.1)] bg-neon-blue/5'
                  : 'border-neon-magenta shadow-[0_0_40px_rgba(255,45,120,0.3),0_0_80px_rgba(255,45,120,0.1)] bg-neon-magenta/5'
                : 'border-border hover:border-border-light hover:shadow-[rgba(0,0,0,0.3)_0px_8px_24px]',
            ].join(' ')}
          >
            {/* Selection dot */}
            <div
              className={[
                'absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300',
                active
                  ? opt.value === 'activity'
                    ? 'border-neon-blue'
                    : 'border-neon-magenta'
                  : 'border-border-light',
              ].join(' ')}
            >
              {active && (
                <div
                  className={[
                    'w-2.5 h-2.5 rounded-full transition-all duration-300',
                    opt.value === 'activity' ? 'bg-neon-blue' : 'bg-neon-magenta',
                  ].join(' ')}
                />
              )}
            </div>

            {opt.icon}
            <div>
              <h3 className="text-lg font-semibold text-white mb-1" style={{ letterSpacing: '-0.01em' }}>{opt.label}</h3>
              <p className="text-sm text-[#8a8f98]">{opt.desc}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ================================================================== */
/*  STEP 2 -- Details                                                  */
/* ================================================================== */
function Step2({
  form,
  patch,
  errors,
  selectedActivity,
  selectedPackage,
  isBowling,
  priceEstimate,
  t,
}: {
  form: BookingFormData;
  patch: (p: Partial<BookingFormData>) => void;
  errors: Record<string, string>;
  selectedActivity: (typeof BOOKABLE_ACTIVITIES)[0] | null;
  selectedPackage: (typeof PACKAGES)[0] | null;
  isBowling: boolean;
  priceEstimate: number;
  t: (key: string) => string;
}) {
  return (
    <div className="space-y-8">
      {/* Activity / Package selector */}
      {form.type === 'activity' ? (
        <div>
          <label className="block text-sm font-medium text-[#8a8f98] mb-3">
            {t('booking.selectActivity')}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BOOKABLE_ACTIVITIES.map((act) => {
              const active = form.activity_id === act.id;
              return (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => patch({ activity_id: act.id })}
                  className={[
                    'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 cursor-pointer',
                    'hover:-translate-y-[2px]',
                    active
                      ? 'border-neon-blue bg-neon-blue/10 shadow-[0_0_24px_rgba(0,212,255,0.25),0_0_60px_rgba(0,212,255,0.08)]'
                      : 'border-border bg-bg-card hover:border-border-light hover:shadow-[rgba(0,0,0,0.3)_0px_8px_24px]',
                  ].join(' ')}
                >
                  <span className="text-2xl">{act.icon}</span>
                  <span className={`text-sm font-medium ${active ? 'text-neon-blue' : 'text-white'}`}>
                    {act.name}
                  </span>
                  <span className="text-xs text-[#62666d]">
                    {formatCurrency(act.price)}{t('activities.perHour')}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.activity_id && (
            <p className="text-xs text-error mt-2">{errors.activity_id}</p>
          )}
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-[#8a8f98] mb-3">
            {t('booking.selectPackage')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PACKAGES.map((pkg) => {
              const active = form.package_id === pkg.id;
              const pkgColorMap: Record<string, string> = {
                'neon-blue': 'border-neon-blue shadow-[0_0_32px_rgba(0,212,255,0.3),0_0_80px_rgba(0,212,255,0.08)] bg-neon-blue/5',
                'neon-gold': 'border-neon-gold shadow-[0_0_32px_rgba(255,184,0,0.3),0_0_80px_rgba(255,184,0,0.08)] bg-neon-gold/5',
                'neon-magenta': 'border-neon-magenta shadow-[0_0_32px_rgba(255,45,120,0.3),0_0_80px_rgba(255,45,120,0.08)] bg-neon-magenta/5',
              };
              const textColor: Record<string, string> = {
                'neon-blue': 'text-neon-blue',
                'neon-gold': 'text-neon-gold',
                'neon-magenta': 'text-neon-magenta',
              };

              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() =>
                    patch({
                      package_id: pkg.id,
                      package_type: pkg.type,
                      num_people: Math.max(form.num_people, pkg.minPeople),
                    })
                  }
                  className={[
                    'flex flex-col items-center text-center gap-2 p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer',
                    'hover:-translate-y-[2px]',
                    active
                      ? pkgColorMap[pkg.color] || 'border-neon-blue'
                      : 'border-border bg-bg-card hover:border-border-light hover:shadow-[rgba(0,0,0,0.3)_0px_8px_24px]',
                  ].join(' ')}
                >
                  <span className="text-3xl">{pkg.icon}</span>
                  <span className={`text-sm font-bold ${active ? (textColor[pkg.color] || 'text-white') : 'text-white'}`}>
                    {pkg.name}
                  </span>
                  <span className="text-xs text-[#62666d]">
                    {formatCurrency(pkg.price)}{t('packages.perPerson')} · {pkg.minPeople}-{pkg.maxPeople} {t('packages.people')}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.package_id && (
            <p className="text-xs text-error mt-2">{errors.package_id}</p>
          )}
        </div>
      )}

      {/* Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Input
            label={t('booking.date')}
            type="date"
            min={todayISO()}
            value={form.date}
            onChange={(e) => patch({ date: e.target.value })}
            error={errors.date}
            className="[color-scheme:dark]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#8a8f98] mb-1.5">
            {t('booking.time')}
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {TIME_SLOTS.map((slot) => {
              const active = form.time === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => patch({ time: slot, end_time: addHour(slot) })}
                  className={[
                    'py-2 px-1 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer',
                    active
                      ? 'border-neon-gold bg-neon-gold/15 text-neon-gold shadow-[0_0_12px_rgba(255,184,0,0.2)]'
                      : 'border-border bg-bg-card text-[#8a8f98] hover:border-border-light hover:text-white',
                  ].join(' ')}
                >
                  {slot}
                </button>
              );
            })}
          </div>
          {errors.time && (
            <p className="text-xs text-error mt-2">{errors.time}</p>
          )}
        </div>
      </div>

      {/* People & Lanes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label={t('booking.people')}
          type="number"
          min={form.type === 'package' && selectedPackage ? selectedPackage.minPeople : 1}
          max={form.type === 'package' && selectedPackage ? selectedPackage.maxPeople : 200}
          value={form.num_people}
          onChange={(e) => patch({ num_people: parseInt(e.target.value) || 1 })}
          error={errors.num_people}
        />
        {form.type === 'activity' && isBowling && (
          <Input
            label={t('booking.lanes')}
            type="number"
            min={1}
            max={6}
            value={form.num_lanes}
            onChange={(e) => patch({ num_lanes: parseInt(e.target.value) || 1 })}
            error={errors.num_lanes}
          />
        )}
      </div>

      {/* Price estimate */}
      {priceEstimate > 0 && (
        <div className="flex items-center justify-between px-5 py-4 rounded-xl border border-neon-gold/30 bg-neon-gold/5">
          <span className="text-sm font-medium text-[#8a8f98]">
            {t('booking.estimatedTotal')}
          </span>
          <span className="text-xl font-bold text-neon-gold text-glow-gold">
            {formatCurrency(priceEstimate)}
          </span>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  STEP 3 -- Contact Info                                             */
/* ================================================================== */
function Step3({
  form,
  patch,
  errors,
  needsCompany,
  t,
}: {
  form: BookingFormData;
  patch: (p: Partial<BookingFormData>) => void;
  errors: Record<string, string>;
  needsCompany: boolean;
  t: (key: string) => string;
}) {
  return (
    <div className="space-y-5">
      <Input
        label={t('booking.name')}
        placeholder="Juan dela Cruz"
        value={form.guest_name}
        onChange={(e) => patch({ guest_name: e.target.value })}
        error={errors.guest_name}
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        }
      />
      <Input
        label={t('booking.email')}
        type="email"
        placeholder="you@example.com"
        value={form.guest_email}
        onChange={(e) => patch({ guest_email: e.target.value })}
        error={errors.guest_email}
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        }
      />
      <Input
        label={t('booking.phone')}
        type="tel"
        placeholder="+63 912 345 6789"
        value={form.guest_phone}
        onChange={(e) => patch({ guest_phone: e.target.value })}
        error={errors.guest_phone}
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        }
      />

      <Input
        label={needsCompany ? t('booking.company') : t('booking.companyOptional')}
        placeholder="Company or school name"
        value={form.company_name}
        onChange={(e) => patch({ company_name: e.target.value })}
        error={errors.company_name}
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
          </svg>
        }
      />

      {/* Special requests */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#8a8f98]">
          {t('booking.requests')}
        </label>
        <textarea
          rows={3}
          placeholder={t('booking.requestsPlaceholder')}
          value={form.special_requests}
          onChange={(e) => patch({ special_requests: e.target.value })}
          className={[
            'w-full rounded-xl bg-[#0f1011] border border-[rgba(255,255,255,0.1)] px-4 py-3 text-[#f7f8f8] text-sm',
            'placeholder:text-[#62666d] resize-none',
            'transition-colors duration-200',
            'focus:outline-none focus:border-[#00D4FF]',
          ].join(' ')}
        />
      </div>
    </div>
  );
}

/* ================================================================== */
/*  STEP 4 -- Review & Submit                                          */
/* ================================================================== */
function Step4({
  form,
  selectedActivity,
  selectedPackage,
  priceEstimate,
  t,
}: {
  form: BookingFormData;
  selectedActivity: (typeof BOOKABLE_ACTIVITIES)[0] | null;
  selectedPackage: (typeof PACKAGES)[0] | null;
  priceEstimate: number;
  t: (key: string) => string;
}) {
  const itemName =
    form.type === 'activity'
      ? selectedActivity?.name ?? '-'
      : selectedPackage?.name ?? '-';

  const rows: { label: string; value: string }[] = [
    {
      label: form.type === 'activity' ? t('booking.selectActivity') : t('booking.selectPackage'),
      value: itemName,
    },
    { label: t('booking.date'), value: form.date || '-' },
    { label: t('booking.time'), value: form.time ? `${form.time} - ${addHour(form.time)}` : '-' },
    { label: t('booking.people'), value: String(form.num_people) },
  ];

  if (form.type === 'activity' && selectedActivity?.name === 'Bowling') {
    rows.push({ label: t('booking.lanes'), value: String(form.num_lanes) });
  }

  if (form.type === 'package' && selectedPackage) {
    rows.push({
      label: t('booking.duration'),
      value: `${selectedPackage.duration / 60} ${t('packages.hours')}`,
    });
  }

  return (
    <div className="space-y-6">
      {/* Booking summary */}
      <Card glow="blue" className="!p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-neon-blue/5">
          <h3
            className="text-sm font-semibold text-neon-blue uppercase tracking-wider"
            style={{ letterSpacing: '0.08em' }}
          >
            {t('booking.summary')}
          </h3>
        </div>
        <div className="px-6 py-4 space-y-3">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between items-center">
              <span className="text-sm text-[#8a8f98]">{row.label}</span>
              <span className="text-sm font-medium text-white">{row.value}</span>
            </div>
          ))}
          {/* Divider */}
          <div className="border-t border-border my-2" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-[#b3b3b3]">
              {t('booking.estimatedTotal')}
            </span>
            <span className="text-2xl font-extrabold text-neon-gold" style={{ letterSpacing: '-0.02em' }}>
              {formatCurrency(priceEstimate)}
            </span>
          </div>
        </div>
      </Card>

      {/* Contact summary */}
      <Card className="!p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-white/[0.02]">
          <h3
            className="text-sm font-semibold text-[#8a8f98] uppercase tracking-wider"
            style={{ letterSpacing: '0.08em' }}
          >
            {t('booking.step3')}
          </h3>
        </div>
        <div className="px-6 py-4 space-y-3">
          <SummaryRow label={t('booking.name')} value={form.guest_name} />
          <SummaryRow label={t('booking.email')} value={form.guest_email} />
          <SummaryRow label={t('booking.phone')} value={form.guest_phone} />
          {form.company_name && (
            <SummaryRow label={t('booking.company')} value={form.company_name} />
          )}
          {form.special_requests && (
            <SummaryRow label={t('booking.requests')} value={form.special_requests} />
          )}
        </div>
      </Card>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-sm text-[#8a8f98] shrink-0">{label}</span>
      <span className="text-sm font-medium text-white text-right">{value}</span>
    </div>
  );
}

/* ================================================================== */
/*  PAGE EXPORT (wraps in Suspense for useSearchParams)               */
/* ================================================================== */
export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <section className="min-h-[80vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
        </section>
      }
    >
      <BookingFlow />
    </Suspense>
  );
}
