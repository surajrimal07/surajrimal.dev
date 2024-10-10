CREATE TABLE blog_reactions (
  id SERIAL PRIMARY KEY,
  post_slug VARCHAR(255) NOT NULL,
  user_identifier VARCHAR(255) NOT NULL,
  reaction VARCHAR(50) NOT NULL CHECK (reaction IN ('CLAPPING', 'LOVE', 'THINK', 'CRY', 'VOMIT')),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (post_slug, user_identifier) -- Ensure a user cannot spam multiple reactions for the same post
);
