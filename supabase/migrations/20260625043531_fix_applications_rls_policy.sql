/*
# Fix Applications RLS for Anonymous Access

1. Problem: Applications table insert policy restricted to `authenticated` only,
   but the site has no auth system — users submit forms anonymously.
2. Solution: Allow `anon` and `authenticated` roles to insert and select applications.
3. Security: This is a public-facing application form — no ownership needed.
   The data is meant to be collected from any visitor.
*/

-- Allow anon users to insert applications
DROP POLICY IF EXISTS "insert_applications" ON applications;
CREATE POLICY "insert_applications" ON applications FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Allow anon users to select applications
DROP POLICY IF EXISTS "select_applications" ON applications;
CREATE POLICY "select_applications" ON applications FOR SELECT
  TO anon, authenticated USING (true);