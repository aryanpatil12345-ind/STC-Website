/*
# Fix Applications Table - Message Column Default

1. Problem: The `message` column is NOT NULL, but the application form doesn't include a `message` field — it uses `reason` instead.
2. Solution: Add an empty string default to the `message` column so inserts succeed without providing a value.
*/

ALTER TABLE applications ALTER COLUMN message SET DEFAULT '';
