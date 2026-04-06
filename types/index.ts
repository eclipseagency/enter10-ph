export interface Activity {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  icon: string;
  image_url: string;
  category: 'bookable_service' | 'showcase';
}

export interface BranchActivity {
  id: string;
  branch_id: string;
  activity_id: string;
  price_per_hour: number;
  capacity: number;
  is_available: boolean;
  activity?: Activity;
}

export interface Package {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  type: 'school' | 'corporate' | 'birthday' | 'general';
  min_people: number;
  max_people: number;
  price: number;
  duration_minutes: number;
  includes_en: string;
  includes_ar: string;
}

export interface Booking {
  id: string;
  user_id: string | null;
  branch_id: string;
  activity_id: string | null;
  package_id: string | null;
  booking_type: 'bowling' | 'event_package' | 'vip_room' | 'activity' | 'package';
  num_people: number;
  num_lanes: number | null;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  total_price: number;
  notes: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  company_name: string;
  special_requests: string;
  booking_source: 'web' | 'app' | 'walk_in';
  created_at: string;
}

export type BookingFormData = {
  type: 'activity' | 'package';
  activity_id: string | null;
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
};
