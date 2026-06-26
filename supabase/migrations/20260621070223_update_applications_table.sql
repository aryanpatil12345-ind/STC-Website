ALTER TABLE applications 
  ADD COLUMN IF NOT EXISTS bounty text NOT NULL DEFAULT '0M',
  ADD COLUMN IF NOT EXISTS build text NOT NULL DEFAULT 'sword',
  ADD COLUMN IF NOT EXISTS division text NOT NULL DEFAULT 'PvP',
  ADD COLUMN IF NOT EXISTS reason text NOT NULL DEFAULT '';

-- Remove fruit column since it's not needed anymore
ALTER TABLE applications DROP COLUMN IF EXISTS fruit;

-- Rename message column to reason
-- But actually we need to handle this carefully. Let me just drop message and keep reason.
-- Actually, we already have 'message' so let me just add the new columns and update the form
