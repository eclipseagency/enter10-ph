interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center w-full">
      {steps.map((label, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold',
                  'transition-all duration-300',
                  isActive
                    ? 'bg-neon-blue text-black shadow-[0_0_18px_rgba(0,212,255,0.5)]'
                    : isCompleted
                      ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/40'
                      : 'bg-bg-card text-text-dim border border-border',
                ].join(' ')}
              >
                {isCompleted ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={[
                  'text-xs font-medium whitespace-nowrap',
                  isActive ? 'text-neon-blue text-glow-blue' : isCompleted ? 'text-text-muted' : 'text-text-dim',
                ].join(' ')}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="flex-1 mx-2 mt-[-1.25rem]">
                <div
                  className={[
                    'h-0.5 w-full rounded-full transition-colors duration-300',
                    isCompleted ? 'bg-neon-blue/50' : 'bg-border',
                  ].join(' ')}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
