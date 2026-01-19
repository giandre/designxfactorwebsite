-- Design X Factor Lead Generation Database Schema
-- For Cloudflare D1

CREATE TABLE IF NOT EXISTS lead_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  -- Contact Info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT,

  -- Question Responses
  content_type TEXT NOT NULL,
  challenge TEXT NOT NULL,
  challenge_comment TEXT,
  location TEXT NOT NULL,
  org_type TEXT NOT NULL,
  org_type_comment TEXT,
  readiness TEXT NOT NULL,

  -- Computed Results
  outcome TEXT NOT NULL,
  recommended_services TEXT, -- JSON array stored as text

  -- Follow-up tracking
  contact_requested INTEGER DEFAULT 0,
  contact_requested_at DATETIME,
  pdf_downloaded INTEGER DEFAULT 0,
  pdf_downloaded_at DATETIME,

  -- Metadata
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_lead_created ON lead_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_lead_outcome ON lead_submissions(outcome);
CREATE INDEX IF NOT EXISTS idx_lead_email ON lead_submissions(email);
CREATE INDEX IF NOT EXISTS idx_lead_readiness ON lead_submissions(readiness);
CREATE INDEX IF NOT EXISTS idx_lead_org_type ON lead_submissions(org_type);
