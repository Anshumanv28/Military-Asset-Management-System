-- Migration to add quantity tracking to assignments and update asset structure
-- This migration adds quantity fields and updates the system to track quantities properly

-- Add quantity field to assignments table
ALTER TABLE assignments ADD COLUMN quantity INTEGER NOT NULL DEFAULT 1;

-- Add quantity field to assets table for bulk items
ALTER TABLE assets ADD COLUMN quantity INTEGER NOT NULL DEFAULT 1;

-- Add returned_quantity field to assignments to track partial returns
ALTER TABLE assignments ADD COLUMN returned_quantity INTEGER NOT NULL DEFAULT 0;

-- Add available_quantity field to assets to track available stock
ALTER TABLE assets ADD COLUMN available_quantity INTEGER NOT NULL DEFAULT 1;

-- Update existing records to have proper quantities
UPDATE assets SET quantity = 1, available_quantity = 1 WHERE quantity IS NULL OR available_quantity IS NULL;
UPDATE assignments SET quantity = 1, returned_quantity = 0 WHERE quantity IS NULL OR returned_quantity IS NULL;

-- Add constraints to ensure data integrity
ALTER TABLE assignments ADD CONSTRAINT check_quantity_positive CHECK (quantity > 0);
ALTER TABLE assignments ADD CONSTRAINT check_returned_quantity_valid CHECK (returned_quantity >= 0 AND returned_quantity <= quantity);
ALTER TABLE assets ADD CONSTRAINT check_asset_quantity_positive CHECK (quantity > 0);
ALTER TABLE assets ADD CONSTRAINT check_available_quantity_valid CHECK (available_quantity >= 0 AND available_quantity <= quantity);

-- Create indexes for better performance
CREATE INDEX idx_assignments_quantity ON assignments(quantity);
CREATE INDEX idx_assignments_returned_quantity ON assignments(returned_quantity);
CREATE INDEX idx_assets_quantity ON assets(quantity);
CREATE INDEX idx_assets_available_quantity ON assets(available_quantity);

-- Add comments for documentation
COMMENT ON COLUMN assignments.quantity IS 'Number of items assigned to personnel';
COMMENT ON COLUMN assignments.returned_quantity IS 'Number of items returned from assignment';
COMMENT ON COLUMN assets.quantity IS 'Total quantity of this asset at the base';
COMMENT ON COLUMN assets.available_quantity IS 'Quantity available for assignment/use'; 