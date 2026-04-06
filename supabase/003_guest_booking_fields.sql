-- Migration: Add guest booking fields
-- Allows bookings without requiring auth (guest reservations from web)

-- Make user_id nullable (guest bookings have no authenticated user)
ALTER TABLE bookings ALTER COLUMN user_id DROP NOT NULL;

-- Add guest booking fields
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS guest_name TEXT NOT NULL DEFAULT '';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS guest_email TEXT NOT NULL DEFAULT '';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS guest_phone TEXT NOT NULL DEFAULT '';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS company_name TEXT NOT NULL DEFAULT '';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS special_requests TEXT NOT NULL DEFAULT '';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_source TEXT NOT NULL DEFAULT 'web'
  CHECK (booking_source IN ('web', 'app', 'walk_in'));

-- Update booking_type constraint to support new types
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_booking_type_check;
ALTER TABLE bookings ADD CONSTRAINT bookings_booking_type_check
  CHECK (booking_type IN ('bowling', 'event_package', 'vip_room', 'activity', 'package'));

-- Allow anonymous inserts for guest bookings (no auth required)
CREATE POLICY IF NOT EXISTS "Allow anonymous booking inserts"
  ON bookings FOR INSERT
  WITH CHECK (true);

-- Allow public read for admin (temporary - will add proper admin auth later)
CREATE POLICY IF NOT EXISTS "Allow authenticated read all bookings"
  ON bookings FOR SELECT
  USING (true);

-- Allow authenticated updates (admin status changes)
CREATE POLICY IF NOT EXISTS "Allow authenticated update bookings"
  ON bookings FOR UPDATE
  USING (true);
