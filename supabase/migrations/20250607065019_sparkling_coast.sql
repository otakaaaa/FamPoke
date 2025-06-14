/*
  # Childcare Facility Database Schema

  1. New Tables
    - `spots` - Facility information with amenities and location data
    - `spot_reviews` - Anonymous comments for facilities (max 126 chars)
    - `spot_images` - Image and PDF file storage references

  2. Security
    - Enable RLS on all tables
    - Public read access for approved content
    - Insert permissions for anonymous users
    - Admin-only approval capabilities

  3. Features
    - Anonymous posting with admin approval workflow
    - Image/PDF upload support via Supabase Storage
    - Comprehensive facility amenity tracking
    - Google Maps integration
*/

-- Create spots table for facility information
CREATE TABLE IF NOT EXISTS spots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('park', 'cafe', 'center', 'mall', 'library', 'other')),
  address text NOT NULL,
  google_map_url text,
  target_age_min integer DEFAULT 0,
  target_age_max integer DEFAULT 18,
  indoor boolean DEFAULT false,
  has_nursing_room boolean DEFAULT false,
  has_diaper_space boolean DEFAULT false,
  has_stroller_space boolean DEFAULT false,
  has_kids_space boolean DEFAULT false,
  has_sink boolean DEFAULT false,
  has_diaper_trash boolean DEFAULT false,
  opening_hours text,
  is_visible boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create spot_reviews table for comments
CREATE TABLE IF NOT EXISTS spot_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  spot_id uuid REFERENCES spots(id) ON DELETE CASCADE,
  comment text NOT NULL CHECK (char_length(comment) <= 126),
  is_visible boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create spot_images table for file uploads
CREATE TABLE IF NOT EXISTS spot_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  spot_id uuid REFERENCES spots(id) ON DELETE CASCADE,
  file_path text NOT NULL,
  content_type text NOT NULL,
  file_size integer,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE spot_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE spot_images ENABLE ROW LEVEL SECURITY;

-- Public read access for approved content
CREATE POLICY "Public can view approved spots"
  ON spots
  FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

CREATE POLICY "Public can view approved reviews"
  ON spot_reviews
  FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

CREATE POLICY "Public can view images for approved spots"
  ON spot_images
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM spots 
      WHERE spots.id = spot_images.spot_id 
      AND spots.is_visible = true
    )
  );

-- Allow anonymous posting (pending approval)
CREATE POLICY "Anyone can insert spots for approval"
  ON spots
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can insert reviews for approval"
  ON spot_reviews
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can upload images"
  ON spot_images
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admin policies (assuming auth.jwt() ->> 'role' = 'admin')
CREATE POLICY "Admins can manage all spots"
  ON spots
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage all reviews"
  ON spot_reviews
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage all images"
  ON spot_images
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create indexes for better performance
CREATE INDEX idx_spots_category ON spots(category);
CREATE INDEX idx_spots_visible ON spots(is_visible);
CREATE INDEX idx_spots_amenities ON spots(has_nursing_room, has_diaper_space, has_kids_space);
CREATE INDEX idx_reviews_spot ON spot_reviews(spot_id);
CREATE INDEX idx_images_spot ON spot_images(spot_id);

-- Create storage bucket for images and PDFs
INSERT INTO storage.buckets (id, name, public) 
VALUES ('spot-files', 'spot-files', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'spot-files' );

CREATE POLICY "Anyone can upload spot files"
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'spot-files' );

CREATE POLICY "Anyone can update own spot files"
  ON storage.objects FOR UPDATE
  USING ( bucket_id = 'spot-files' );