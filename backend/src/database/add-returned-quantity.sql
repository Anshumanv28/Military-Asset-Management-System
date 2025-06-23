-- Migration: Add returned_quantity field to assignments table
-- This migration adds tracking for partial returns of assigned assets

-- Add returned_quantity column with default value 0
ALTER TABLE assignments ADD COLUMN IF NOT EXISTS returned_quantity INTEGER NOT NULL DEFAULT 0;

-- Update status constraint to include 'partially_returned'
ALTER TABLE assignments DROP CONSTRAINT IF EXISTS assignments_status_check;
ALTER TABLE assignments ADD CONSTRAINT assignments_status_check 
    CHECK (status IN ('active', 'returned', 'lost', 'damaged', 'partially_returned'));

-- Update existing assignments to have returned_quantity = 0 if not set
UPDATE assignments SET returned_quantity = 0 WHERE returned_quantity IS NULL;

-- Update assignments that are marked as 'returned' to have returned_quantity = quantity
UPDATE assignments SET returned_quantity = quantity WHERE status = 'returned';

-- Add check constraint to ensure returned_quantity doesn't exceed quantity
ALTER TABLE assignments ADD CONSTRAINT assignments_returned_quantity_check 
    CHECK (returned_quantity >= 0 AND returned_quantity <= quantity); 