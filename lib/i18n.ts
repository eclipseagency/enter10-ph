'use client';

import { create } from 'zustand';

type Locale = 'en' | 'fil';

interface I18nStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.activities': 'Activities',
    'nav.packages': 'Packages',
    'nav.book': 'Book Now',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',

    // Hero
    'hero.tagline': 'YOUR NIGHT OUT STARTS HERE',
    'hero.subtitle': 'Play. Eat. Celebrate. All under one roof at Venice Grand Canal Mall, Taguig.',
    'hero.cta': 'Book Your Experience',
    'hero.explore': 'Explore Activities',

    // Activities
    'activities.title': 'What Awaits You',
    'activities.subtitle': 'From lanes to lounges, every corner is designed for unforgettable moments.',
    'activities.perHour': '/hr',
    'activities.free': 'Free Entry',
    'activities.bookNow': 'Book Now',
    'activities.rates': 'Rates',
    'activities.serviceCharge': '10% service charge applies to all activities, food & drinks.',
    'activities.page.title': 'Our Activities & Rates',
    'activities.page.subtitle': 'Every game, every lane, every moment — built for fun.',

    // Packages
    'packages.title': 'Packages & Events',
    'packages.subtitle': 'From school trips to corporate outings, we handle the fun.',
    'packages.perPerson': '/person',
    'packages.people': 'people',
    'packages.hours': 'hours',
    'packages.includes': "What's Included",
    'packages.bookPackage': 'Book This Package',
    'packages.page.title': 'Packages & Events',
    'packages.page.subtitle': 'Choose a package, bring your people, and leave the rest to us.',

    // Booking
    'booking.title': 'Book Your Experience',
    'booking.step1': 'Choose Type',
    'booking.step2': 'Details',
    'booking.step3': 'Your Info',
    'booking.step4': 'Review',
    'booking.typeActivity': 'Book an Activity',
    'booking.typeActivityDesc': 'Pick an activity, date, and time',
    'booking.typePackage': 'Book a Package',
    'booking.typePackageDesc': 'School, corporate, or birthday packages',
    'booking.selectActivity': 'Select Activity',
    'booking.selectPackage': 'Select Package',
    'booking.date': 'Date',
    'booking.time': 'Time',
    'booking.people': 'Number of People',
    'booking.lanes': 'Number of Lanes',
    'booking.name': 'Full Name',
    'booking.email': 'Email Address',
    'booking.phone': 'Phone Number',
    'booking.company': 'Company / School Name',
    'booking.companyOptional': 'Company / School Name (optional)',
    'booking.requests': 'Special Requests',
    'booking.requestsPlaceholder': 'Any dietary requirements, accessibility needs, or other requests...',
    'booking.summary': 'Booking Summary',
    'booking.estimatedTotal': 'Estimated Total',
    'booking.submit': 'Submit Reservation',
    'booking.submitting': 'Submitting...',
    'booking.next': 'Next',
    'booking.back': 'Back',
    'booking.success': 'Reservation Submitted!',
    'booking.successMsg': "We've received your booking request. Our team will confirm via email within 24 hours.",
    'booking.bookAnother': 'Book Another',
    'booking.duration': 'Duration',
    'booking.pricePerHour': 'Price per hour',

    // Contact
    'contact.title': 'Find Us',
    'contact.subtitle': 'Venice Grand Canal Mall, McKinley Hill, Taguig',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Operating Hours',
    'contact.daily': 'Daily: 10AM - 1AM',
    'contact.reservation': 'Reservation (WhatsApp/Viber)',
    'contact.formTitle': 'Send Us a Message',
    'contact.formName': 'Your Name',
    'contact.formEmail': 'Your Email',
    'contact.formMessage': 'Message',
    'contact.formSend': 'Send Message',
    'contact.directions': 'Get Directions',

    // Gallery
    'gallery.title': 'The Vibe',
    'gallery.subtitle': 'See what a night at Enter10 looks like.',

    // CTA
    'cta.title': 'Ready for Your Best Night Out?',
    'cta.subtitle': 'Whether it\'s a game night with friends or a corporate event, we\'ve got you.',
    'cta.button': 'Book Now',

    // Footer
    'footer.tagline': 'Your all-in-one entertainment destination in Taguig.',
    'footer.quickLinks': 'Quick Links',
    'footer.hours': 'Hours',
    'footer.followUs': 'Follow Us',
    'footer.rights': '© 2026 Enter10 Philippines. All rights reserved.',

    // Admin
    'admin.dashboard': 'Dashboard',
    'admin.bookings': 'Bookings',
    'admin.settings': 'Settings',
    'admin.today': "Today's Bookings",
    'admin.pending': 'Pending',
    'admin.confirmed': 'Confirmed',
    'admin.cancelled': 'Cancelled',
    'admin.total': 'Total',
    'admin.recent': 'Recent Bookings',
    'admin.confirm': 'Confirm',
    'admin.cancel': 'Cancel',
    'admin.viewAll': 'View All',
    'admin.login': 'Admin Login',
    'admin.loginBtn': 'Sign In',
    'admin.logout': 'Logout',
  },
  fil: {
    // Nav
    'nav.home': 'Home',
    'nav.activities': 'Mga Aktibidad',
    'nav.packages': 'Mga Package',
    'nav.book': 'Mag-Book',
    'nav.contact': 'Kontak',
    'nav.admin': 'Admin',

    // Hero
    'hero.tagline': 'DITO NAGSISIMULA ANG GABI MO',
    'hero.subtitle': 'Maglaro. Kumain. Magdiwang. Lahat sa iisang lugar sa Venice Grand Canal Mall, Taguig.',
    'hero.cta': 'I-Book ang Experience Mo',
    'hero.explore': 'Tingnan ang Activities',

    // Activities
    'activities.title': 'Ano ang Naghihintay Sa\'yo',
    'activities.subtitle': 'Mula sa lanes hanggang lounges, bawat sulok ay para sa mga hindi malilimutang sandali.',
    'activities.perHour': '/oras',
    'activities.free': 'Libreng Pasok',
    'activities.bookNow': 'Mag-Book',
    'activities.rates': 'Mga Presyo',
    'activities.serviceCharge': '10% service charge sa lahat ng activities, pagkain at inumin.',
    'activities.page.title': 'Mga Aktibidad at Presyo',
    'activities.page.subtitle': 'Bawat laro, bawat lane, bawat sandali — para sa kasiyahan.',

    // Packages
    'packages.title': 'Mga Package at Events',
    'packages.subtitle': 'Mula school trips hanggang corporate outings, kami ang bahala sa kasiyahan.',
    'packages.perPerson': '/tao',
    'packages.people': 'tao',
    'packages.hours': 'oras',
    'packages.includes': 'Kasama',
    'packages.bookPackage': 'I-Book ang Package',
    'packages.page.title': 'Mga Package at Events',
    'packages.page.subtitle': 'Pumili ng package, dalhin ang mga kasama mo, at kami na ang bahala.',

    // Booking
    'booking.title': 'I-Book ang Experience Mo',
    'booking.step1': 'Pumili ng Uri',
    'booking.step2': 'Mga Detalye',
    'booking.step3': 'Info Mo',
    'booking.step4': 'I-Review',
    'booking.typeActivity': 'Mag-Book ng Activity',
    'booking.typeActivityDesc': 'Pumili ng activity, petsa, at oras',
    'booking.typePackage': 'Mag-Book ng Package',
    'booking.typePackageDesc': 'School, corporate, o birthday packages',
    'booking.selectActivity': 'Pumili ng Activity',
    'booking.selectPackage': 'Pumili ng Package',
    'booking.date': 'Petsa',
    'booking.time': 'Oras',
    'booking.people': 'Bilang ng Tao',
    'booking.lanes': 'Bilang ng Lanes',
    'booking.name': 'Buong Pangalan',
    'booking.email': 'Email Address',
    'booking.phone': 'Phone Number',
    'booking.company': 'Pangalan ng Kompanya / Paaralan',
    'booking.companyOptional': 'Pangalan ng Kompanya / Paaralan (opsyonal)',
    'booking.requests': 'Mga Espesyal na Kahilingan',
    'booking.requestsPlaceholder': 'Mga pangangailangan sa pagkain, accessibility, o iba pang kahilingan...',
    'booking.summary': 'Buod ng Booking',
    'booking.estimatedTotal': 'Estimated na Kabuuan',
    'booking.submit': 'I-Submit ang Reservation',
    'booking.submitting': 'Sinusubmit...',
    'booking.next': 'Susunod',
    'booking.back': 'Bumalik',
    'booking.success': 'Naisubmit ang Reservation!',
    'booking.successMsg': 'Natanggap na namin ang booking request mo. Kokonfirmahin ng aming team sa email sa loob ng 24 oras.',
    'booking.bookAnother': 'Mag-Book Ulit',
    'booking.duration': 'Tagal',
    'booking.pricePerHour': 'Presyo bawat oras',

    // Contact
    'contact.title': 'Hanapin Kami',
    'contact.subtitle': 'Venice Grand Canal Mall, McKinley Hill, Taguig',
    'contact.address': 'Address',
    'contact.phone': 'Telepono',
    'contact.email': 'Email',
    'contact.hours': 'Oras ng Operasyon',
    'contact.daily': 'Araw-araw: 10AM - 1AM',
    'contact.reservation': 'Reservation (WhatsApp/Viber)',
    'contact.formTitle': 'Magpadala ng Mensahe',
    'contact.formName': 'Pangalan Mo',
    'contact.formEmail': 'Email Mo',
    'contact.formMessage': 'Mensahe',
    'contact.formSend': 'Ipadala',
    'contact.directions': 'Kunin ang Direksyon',

    // Gallery
    'gallery.title': 'Ang Vibe',
    'gallery.subtitle': 'Tingnan kung ano ang isang gabi sa Enter10.',

    // CTA
    'cta.title': 'Handa Ka Na Ba Para Sa Pinakamahusay Na Gabi?',
    'cta.subtitle': 'Game night man yan o corporate event, kami ang bahala.',
    'cta.button': 'Mag-Book',

    // Footer
    'footer.tagline': 'Ang iyong all-in-one entertainment destination sa Taguig.',
    'footer.quickLinks': 'Quick Links',
    'footer.hours': 'Oras',
    'footer.followUs': 'Sundan Kami',
    'footer.rights': '© 2026 Enter10 Philippines. Lahat ng karapatan ay nakalaan.',

    // Admin
    'admin.dashboard': 'Dashboard',
    'admin.bookings': 'Mga Booking',
    'admin.settings': 'Mga Setting',
    'admin.today': 'Mga Booking Ngayon',
    'admin.pending': 'Pending',
    'admin.confirmed': 'Confirmed',
    'admin.cancelled': 'Cancelled',
    'admin.total': 'Kabuuan',
    'admin.recent': 'Mga Kamakailang Booking',
    'admin.confirm': 'I-Confirm',
    'admin.cancel': 'I-Cancel',
    'admin.viewAll': 'Tingnan Lahat',
    'admin.login': 'Admin Login',
    'admin.loginBtn': 'Mag-Sign In',
    'admin.logout': 'Mag-Logout',
  },
};

export const useI18n = create<I18nStore>((set, get) => ({
  locale: 'en',
  setLocale: (locale) => set({ locale }),
  t: (key: string) => {
    const { locale } = get();
    return translations[locale][key] || translations.en[key] || key;
  },
}));
