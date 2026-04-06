'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ACTIVITIES } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

export default function ActivitiesSection() {
  const { t, locale } = useI18n();

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6" id="activities">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text inline-block mb-4">
            {t('activities.title')}
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            {t('activities.subtitle')}
          </p>
        </motion.div>

        {/* Activity cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITIES.map((activity, i) => (
            <motion.div
              key={activity.id}
              className="glass rounded-2xl p-6 flex flex-col hover:bg-bg-card-hover transition-colors duration-300 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{activity.icon}</div>

              {/* Name */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {locale === 'fil' ? activity.nameFil : activity.name}
              </h3>

              {/* Description */}
              <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1">
                {locale === 'fil' ? activity.descriptionFil : activity.description}
              </p>

              {/* Price badge */}
              <div className="mb-4">
                {activity.price > 0 ? (
                  <span className="inline-block bg-neon-blue/10 text-neon-blue text-sm font-semibold px-3 py-1 rounded-full">
                    &#8369;{activity.price}{t('activities.perHour')}
                  </span>
                ) : (
                  <span className="inline-block bg-neon-gold/10 text-neon-gold text-sm font-semibold px-3 py-1 rounded-full">
                    {t('activities.free')}
                  </span>
                )}
              </div>

              {/* Book button */}
              <Link href="/booking" className="mt-auto">
                <Button variant="secondary" size="sm" fullWidth>
                  {t('activities.bookNow')}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
