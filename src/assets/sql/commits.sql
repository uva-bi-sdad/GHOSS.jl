CREATE TABLE IF NOT EXISTS schema.commits (
    branch text NOT NULL,
    id text NOT NULL,
    oid text NOT NULL,
    committedat timestamp NOT NULL,
    authors_email text [] NOT NULL,
    authors_name text [] NOT NULL,
    authors_id text [],
    additions bigint,
    deletions bigint,
    asof timestamp without time zone NOT NULL DEFAULT date_trunc(
        'second'::text,
        timezone('UTC'::text, CURRENT_TIMESTAMP)
    ),
    CONSTRAINT commits_pkey PRIMARY KEY (id),
    CONSTRAINT branch FOREIGN KEY (branch) REFERENCES schema.repos (branch)
);
COMMENT ON TABLE schema.commits IS 'Commits Information';
COMMENT ON COLUMN schema.commits.branch IS 'Base Branch ID (foreign key)';
COMMENT ON COLUMN schema.commits.id IS 'Commit ID';
COMMENT ON COLUMN schema.commits.oid IS 'Git Object ID (SHA1)';
COMMENT ON COLUMN schema.commits.committedat IS 'When was it committed?';
COMMENT ON COLUMN schema.commits.authors_email IS 'The email in the Git commit.';
COMMENT ON COLUMN schema.commits.authors_name IS 'The name in the Git commit.';
COMMENT ON COLUMN schema.commits.authors_id IS 'GitHub Author';
COMMENT ON COLUMN schema.commits.additions IS 'The number of additions in this commit.';
COMMENT ON COLUMN schema.commits.deletions IS 'The number of deletions in this commit.';
COMMENT ON COLUMN schema.commits.asof IS 'When was GitHub queried.';
