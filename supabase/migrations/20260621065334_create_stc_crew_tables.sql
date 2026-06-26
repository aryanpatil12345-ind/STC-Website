CREATE TABLE IF NOT EXISTS crew_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  rank text NOT NULL DEFAULT 'recruit' CHECK (rank IN ('leader', 'officer', 'member', 'recruit')),
  role text NOT NULL,
  bounty text NOT NULL DEFAULT '0M',
  fruit text NOT NULL DEFAULT 'None',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('legendary', 'active', 'rising')),
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  username text NOT NULL,
  level text NOT NULL,
  fruit text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_crew_members_rank ON crew_members(rank);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

ALTER TABLE crew_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_crew_members" ON crew_members FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "select_applications" ON applications FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_applications" ON applications FOR INSERT
  TO authenticated WITH CHECK (true);
