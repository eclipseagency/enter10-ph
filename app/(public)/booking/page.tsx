'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ACTIVITIES, PACKAGES, TIME_SLOTS } from '@/lib/constants';
import { ALL_BRANCHES, MIN_PEOPLE, PH_BRANCH_ID } from '@/lib/branches';
import { useI18n } from '@/lib/i18n';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import StepIndicator from '@/components/ui/StepIndicator';

const BOOKABLE_ACTIVITIES = ACTIVITIES.filter((a) => a.price > 0);

interface BookingFormState {
  branch_id: string | null;
  type: 'activity' | 'package';
  activity_ids: string[];
  package_id: string | null;
  package_type: string | null;
  date: string;
  time: string;
  end_time: string;
  num_people: number;
  num_lanes: number;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  company_name: string;
  special_requests: string;
}

const INITIAL_FORM: BookingFormState = {
  branch_id: PH_BRANCH_ID,
  type: 'activity',
  activity_ids: [],
  package_id: null,
  package_type: null,
  date: '',
  time: '',
  end_time: '',
  num_people: MIN_PEOPLE,
  num_lanes: 1,
  guest_name: '',
  guest_email: '',
  guest_phone: '',
  company_name: '',
  special_requests: '',
};

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

function formatCurrency(amount: number) {
  return `\u20B1${amount.toLocaleString()}`;
}

function addHour(time: string) {
  const [h, m] = time.split(':').map(Number);
  const next = (h + 1) % 24;
  return `${String(next).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function BookingFlow() {
  const searchParams = useSearchParams();
  const { t } = useI18n();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<BookingFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const pkgParam = searchParams.get('package');
    if (pkgParam) {
      const matched = PACKAGES.find((p) => p.type === pkgParam.toLowerCase());
      if (matched) {
        setForm((f) => ({
          ...f,
          type: 'package',
          package_id: matched.id,
          package_type: matched.type,
          num_people: Math.max(matched.minPeople, MIN_PEOPLE),
        }));
        setStep(2);
      }
    }
  }, [searchParams]);

  const selectedActivities = useMemo(
    () => BOOKABLE_ACTIVITIES.filter((a) => form.activity_ids.includes(a.id)),
    [form.activity_ids],
  );

  const selectedPackage = useMemo(
    () => PACKAGES.find((p) => p.id === form.package_id) ?? null,
    [form.package_id],
  );

  const includesBowling = selectedActivities.some((a) => a.name === 'Bowling');

  const needsCompany =
    form.type === 'package' &&
    (selectedPackage?.type === 'school' || selectedPackage?.type === 'corporate');

  const priceEstimate = useMemo(() => {
    if (form.type === 'activity') {
      return selectedActivities.reduce((sum, act) => {
        if (act.name === 'Bowling') return sum + act.price * form.num_people;
        return sum + act.price;
      }, 0);
    }
    if (form.type === 'package' && selectedPackage) {
      return selectedPackage.price * form.num_people;
    }
    return 0;
  }, [form.type, selectedActivities, selectedPackage, form.num_people]);

  const stepLabels = ['Branch', t('booking.step1'), t('booking.step2'), t('booking.step3'), t('booking.step4')];

  function patch(partial: Partial<BookingFormState>) {
    setForm((f) => ({ ...f, ...partial }));
    const keys = Object.keys(partial);
    setErrors((prev) => {
      const next = { ...prev };
      keys.forEach((k) => delete next[k]);
      return next;
    });
  }

  function toggleActivity(id: string) {
    setForm((f) => {
      const has = f.activity_ids.includes(id);
      return {
        ...f,
        activity_ids: has ? f.activity_ids.filter((x) => x !== id) : [...f.activity_ids, id],
      };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.activity_ids;
      return next;
    });
  }

  function goNext() {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, 4));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function validateStep(): boolean {
    const errs: Record<string, string> = {};

    if (step === 0) {
      if (!form.branch_id) errs.branch_id = 'Please select a branch';
    }

    if (step === 2) {
      if (form.type === 'activity' && form.activity_ids.length === 0) {
        errs.activity_ids = 'Please select at least one activity';
      }
      if (form.type === 'package' && !form.package_id) {
        errs.package_id = 'Please select a package';
      }
      if (!form.date) errs.date = 'Please choose a date';
      if (!form.time) errs.time = 'Please choose a time slot';
      if (form.num_people < MIN_PEOPLE) {
        errs.num_people = `Minimum ${MIN_PEOPLE} people required`;
      }
      if (
        form.type === 'package' &&
        selectedPackage &&
        form.num_people > selectedPackage.maxPeople
      ) {
        errs.num_people = `Maximum ${selectedPackage.maxPeople} people`;
      }
      if (includesBowling && form.num_people > 48) {
        errs.num_people = 'Maximum 48 people (8 per lane, 6 lanes) for Bowling';
      }
    }

    if (step === 3) {
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

  async function handleSubmit() {
    if (!validateStep()) return;
    setSubmitting(true);

    const payload = {
      branch_id: form.branch_id,
      type: form.type,
      activity_ids: form.activity_ids,
      activity_id: form.activity_ids[0] ?? null,
      package_id: form.package_id,
      date: form.date,
      time: form.time,
      end_time: addHour(form.time),
      num_people: form.num_people,
      num_lanes: form.num_lanes,
      guest_name: form.guest_name,
      guest_email: form.guest_email,
      guest_phone: form.guest_phone,
      company_name: form.company_name,
      special_requests: form.special_requests,
      total_price: priceEstimate,
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Booking failed');
      }
      setSubmitted(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setErrors({ submit: msg });
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

  if (submitted) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center animate-fadeIn">
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

  return (
    <section className="min-h-[80vh] pt-28 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-3xl md:text-4xl font-bold text-center mb-10 gradient-text"
          style={{ letterSpacing: '-0.03em' }}
        >
          {t('booking.title')}
        </h1>

        <div className="mb-10">
          <StepIndicator steps={stepLabels} currentStep={step} />
        </div>

        <div className="min-h-[420px]">
          {step === 0 && (
            <BranchStep
              branchId={form.branch_id}
              error={errors.branch_id}
              onSelect={(id) => patch({ branch_id: id })}
            />
          )}
          {step === 1 && (
            <TypeStep
              form={form}
              patch={patch}
              t={t}
              onSelect={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <DetailsStep
              form={form}
              patch={patch}
              toggleActivity={toggleActivity}
              errors={errors}
              selectedActivities={selectedActivities}
              selectedPackage={selectedPackage}
              includesBowling={includesBowling}
              priceEstimate={priceEstimate}
              t={t}
            />
          )}
          {step === 3 && (
            <ContactStep
              form={form}
              patch={patch}
              errors={errors}
              needsCompany={needsCompany}
              t={t}
            />
          )}
          {step === 4 && (
            <ReviewStep
              form={form}
              selectedActivities={selectedActivities}
              selectedPackage={selectedPackage}
              priceEstimate={priceEstimate}
              t={t}
            />
          )}
        </div>

        <div className="flex items-center justify-between mt-8 gap-4">
          {step > 0 ? (
            <Button variant="ghost" onClick={goBack}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              {t('booking.back')}
            </Button>
          ) : (
            <span />
          )}

          {step < 4 ? (
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
          <p className="text-error text-sm text-center mt-4">{errors.submit}</p>
        )}
      </div>
    </section>
  );
}

function BranchStep({
  branchId,
  error,
  onSelect,
}: {
  branchId: string | null;
  error?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">Choose your branch</h3>
        <p className="text-sm text-[#8a8f98]">Select where you'd like to book.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ALL_BRANCHES.map((b) => {
          const active = branchId === b.id;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => onSelect(b.id)}
              className={[
                'flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer',
                'hover:-translate-y-[1px]',
                active
                  ? 'border-neon-blue bg-neon-blue/10 shadow-[0_0_24px_rgba(0,212,255,0.2)]'
                  : 'border-border bg-bg-card hover:border-border-light',
              ].join(' ')}
            >
              <span className="text-2xl" aria-hidden>{b.flag}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${active ? 'text-neon-blue' : 'text-white'}`}>
                  {b.name}
                </p>
                <p className="text-xs text-[#62666d]">{b.city} · {b.country}</p>
              </div>
              <span
                className={[
                  'w-4 h-4 rounded-full border flex-shrink-0 transition-all',
                  active ? 'border-neon-blue bg-neon-blue' : 'border-border-light',
                ].join(' ')}
              />
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}

function TypeStep({
  form,
  patch,
  t,
  onSelect,
}: {
  form: BookingFormState;
  patch: (p: Partial<BookingFormState>) => void;
  t: (key: string) => string;
  onSelect: () => void;
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
            onClick={() => {
              patch({
                type: opt.value,
                activity_ids: [],
                package_id: null,
                package_type: null,
                num_people: MIN_PEOPLE,
                num_lanes: 1,
              });
              onSelect();
            }}
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

function DetailsStep({
  form,
  patch,
  toggleActivity,
  errors,
  selectedActivities,
  selectedPackage,
  includesBowling,
  priceEstimate,
  t,
}: {
  form: BookingFormState;
  patch: (p: Partial<BookingFormState>) => void;
  toggleActivity: (id: string) => void;
  errors: Record<string, string>;
  selectedActivities: typeof BOOKABLE_ACTIVITIES;
  selectedPackage: (typeof PACKAGES)[0] | null;
  includesBowling: boolean;
  priceEstimate: number;
  t: (key: string) => string;
}) {
  return (
    <div className="space-y-8">
      {form.type === 'activity' ? (
        <div>
          <label className="block text-sm font-medium text-[#8a8f98] mb-3">
            Select one or more activities
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BOOKABLE_ACTIVITIES.map((act) => {
              const active = form.activity_ids.includes(act.id);
              return (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => toggleActivity(act.id)}
                  className={[
                    'relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 cursor-pointer',
                    'hover:-translate-y-[2px]',
                    active
                      ? 'border-neon-blue bg-neon-blue/10 shadow-[0_0_24px_rgba(0,212,255,0.25),0_0_60px_rgba(0,212,255,0.08)]'
                      : 'border-border bg-bg-card hover:border-border-light hover:shadow-[rgba(0,0,0,0.3)_0px_8px_24px]',
                  ].join(' ')}
                >
                  {active && (
                    <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-neon-blue text-bg flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                  )}
                  <span className="text-2xl">{act.icon}</span>
                  <span className={`text-sm font-medium ${active ? 'text-neon-blue' : 'text-white'}`}>
                    {act.name}
                  </span>
                  <span className="text-xs text-[#62666d]">
                    {formatCurrency(act.price)} {act.priceLabel}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.activity_ids && <p className="text-xs text-error mt-2">{errors.activity_ids}</p>}
          {selectedActivities.length > 0 && (
            <p className="text-xs text-[#62666d] mt-2">
              Selected: {selectedActivities.map((a) => a.name).join(', ')}
            </p>
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
                      num_people: Math.max(form.num_people, MIN_PEOPLE, pkg.minPeople),
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
          {errors.package_id && <p className="text-xs text-error mt-2">{errors.package_id}</p>}
        </div>
      )}

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
          {errors.time && <p className="text-xs text-error mt-2">{errors.time}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label={`${t('booking.people')} (min ${MIN_PEOPLE})`}
          type="number"
          min={MIN_PEOPLE}
          max={form.type === 'package' && selectedPackage ? selectedPackage.maxPeople : 200}
          value={form.num_people}
          onChange={(e) => patch({ num_people: parseInt(e.target.value) || MIN_PEOPLE })}
          error={errors.num_people}
        />
        {includesBowling && (
          <div className="flex items-end pb-2">
            <p className="text-xs text-[#8a8f98]">
              Bowling capacity: 8 pax per lane × 6 lanes (max 48)
            </p>
          </div>
        )}
      </div>

      {priceEstimate > 0 && (
        <div className="rounded-xl border border-neon-gold/30 bg-neon-gold/5 px-5 py-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#8a8f98]">
              {t('booking.estimatedTotal')}
            </span>
            <span className="text-xl font-bold text-neon-gold text-glow-gold">
              {formatCurrency(priceEstimate)}
            </span>
          </div>
          <p className="text-xs text-[#62666d]">
            + 10% service charge. Final price confirmed upon booking.
          </p>
        </div>
      )}
    </div>
  );
}

function ContactStep({
  form,
  patch,
  errors,
  needsCompany,
  t,
}: {
  form: BookingFormState;
  patch: (p: Partial<BookingFormState>) => void;
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
      />
      <Input
        label={t('booking.email')}
        type="email"
        placeholder="you@example.com"
        value={form.guest_email}
        onChange={(e) => patch({ guest_email: e.target.value })}
        error={errors.guest_email}
      />
      <Input
        label={t('booking.phone')}
        type="tel"
        placeholder="+63 912 345 6789"
        value={form.guest_phone}
        onChange={(e) => patch({ guest_phone: e.target.value })}
        error={errors.guest_phone}
      />
      <Input
        label={needsCompany ? t('booking.company') : t('booking.companyOptional')}
        placeholder="Company or school name"
        value={form.company_name}
        onChange={(e) => patch({ company_name: e.target.value })}
        error={errors.company_name}
      />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#8a8f98]">{t('booking.requests')}</label>
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

function ReviewStep({
  form,
  selectedActivities,
  selectedPackage,
  priceEstimate,
  t,
}: {
  form: BookingFormState;
  selectedActivities: typeof BOOKABLE_ACTIVITIES;
  selectedPackage: (typeof PACKAGES)[0] | null;
  priceEstimate: number;
  t: (key: string) => string;
}) {
  const branch = ALL_BRANCHES.find((b) => b.id === form.branch_id);
  const itemName =
    form.type === 'activity'
      ? selectedActivities.length > 0
        ? selectedActivities.map((a) => a.name).join(', ')
        : '-'
      : selectedPackage?.name ?? '-';

  const rows: { label: string; value: string }[] = [
    { label: 'Branch', value: branch ? `${branch.flag} ${branch.name}` : '-' },
    {
      label: form.type === 'activity' ? 'Activities' : t('booking.selectPackage'),
      value: itemName,
    },
    { label: t('booking.date'), value: form.date || '-' },
    { label: t('booking.time'), value: form.time ? `${form.time} - ${addHour(form.time)}` : '-' },
    { label: t('booking.people'), value: String(form.num_people) },
  ];

  if (form.type === 'package' && selectedPackage) {
    rows.push({
      label: t('booking.duration'),
      value: `${selectedPackage.duration / 60} ${t('packages.hours')}`,
    });
  }

  return (
    <div className="space-y-6">
      <Card glow="blue" className="!p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-neon-blue/5">
          <h3 className="text-sm font-semibold text-neon-blue uppercase tracking-wider" style={{ letterSpacing: '0.08em' }}>
            {t('booking.summary')}
          </h3>
        </div>
        <div className="px-6 py-4 space-y-3">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between items-start gap-4">
              <span className="text-sm text-[#8a8f98] shrink-0">{row.label}</span>
              <span className="text-sm font-medium text-white text-right">{row.value}</span>
            </div>
          ))}
          <div className="border-t border-border my-2" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-[#b3b3b3]">{t('booking.estimatedTotal')}</span>
            <span className="text-2xl font-extrabold text-neon-gold" style={{ letterSpacing: '-0.02em' }}>
              {formatCurrency(priceEstimate)}
            </span>
          </div>
        </div>
      </Card>

      <Card className="!p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-white/[0.02]">
          <h3 className="text-sm font-semibold text-[#8a8f98] uppercase tracking-wider" style={{ letterSpacing: '0.08em' }}>
            {t('booking.step3')}
          </h3>
        </div>
        <div className="px-6 py-4 space-y-3">
          <SummaryRow label={t('booking.name')} value={form.guest_name} />
          <SummaryRow label={t('booking.email')} value={form.guest_email} />
          <SummaryRow label={t('booking.phone')} value={form.guest_phone} />
          {form.company_name && <SummaryRow label={t('booking.company')} value={form.company_name} />}
          {form.special_requests && <SummaryRow label={t('booking.requests')} value={form.special_requests} />}
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
