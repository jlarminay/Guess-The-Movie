-- Create a role called 'anon' with no login privileges
CREATE ROLE anon nologin;

-- Grant usage privileges on the 'public' schema to the 'anon' role
GRANT USAGE ON SCHEMA public TO anon;

-- Drop the 'public.movie' table if it exists
DROP TABLE IF EXISTS public.movie;

-- Create the 'public.movie' table with columns: id, movie, year, genre, director, country, rating
CREATE TABLE public.movie (
  id SERIAL PRIMARY KEY, -- Auto-incrementing primary key column
  movie     TEXT NOT NULL, -- Movie name (non-null)
  year      TEXT NOT NULL, -- Year (non-null)
  genre     TEXT NOT NULL, -- Genre (non-null)
  director  TEXT NOT NULL, -- Director name (non-null)
  country   TEXT NOT NULL, -- Country name (non-null)
  rating    TEXT NOT NULL -- Rating (non-null)
);

-- Grant SELECT privileges on the 'public.movie' table to the 'anon' role
GRANT SELECT ON public.movie TO anon;
