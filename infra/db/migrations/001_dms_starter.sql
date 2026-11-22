-- PioOne V27 DMS architecture starter, not a production migration.
-- For production: enforce tenant-scoped RLS, FK ownership, security definer safety,
-- encryption, privilege isolation, migration versioning, legal retention, audit, and test.
BEGIN;
CREATE SCHEMA IF NOT EXISTS dms;
CREATE SCHEMA IF NOT EXISTS integration;
CREATE TABLE IF NOT EXISTS dms.document_type (
  tenant_id uuid NOT NULL, id uuid NOT NULL, code text NOT NULL,
  display_name text NOT NULL, metadata_schema jsonb NOT NULL DEFAULT '{}'::jsonb,
  PRIMARY KEY(tenant_id,id), UNIQUE(tenant_id,code));
CREATE TABLE IF NOT EXISTS dms.folder (
  tenant_id uuid NOT NULL, id uuid NOT NULL, parent_id uuid,
  display_name text NOT NULL, created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(tenant_id,id),
  FOREIGN KEY(tenant_id,parent_id) REFERENCES dms.folder(tenant_id,id));
CREATE TABLE IF NOT EXISTS dms.document (
  tenant_id uuid NOT NULL, id uuid NOT NULL, folder_id uuid, type_id uuid NOT NULL,
  title text NOT NULL, owner_party_id uuid, status text NOT NULL DEFAULT 'active'
    CHECK(status IN ('active','archived','tombstoned')),
  current_version integer NOT NULL DEFAULT 0,
  retention_until timestamptz, legal_hold boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(tenant_id,id), FOREIGN KEY(tenant_id,folder_id) REFERENCES dms.folder(tenant_id,id),
  FOREIGN KEY(tenant_id,type_id) REFERENCES dms.document_type(tenant_id,id));
CREATE TABLE IF NOT EXISTS dms.document_version (
  tenant_id uuid NOT NULL, document_id uuid NOT NULL, version_number integer NOT NULL CHECK(version_number>0),
  object_store_id text NOT NULL, object_key text NOT NULL, object_version_id text NOT NULL,
  sha256 text NOT NULL CHECK(length(sha256)=64), byte_size bigint NOT NULL CHECK(byte_size>=0),
  mime_type text NOT NULL, encryption_key_ref text NOT NULL, metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(), created_by uuid NOT NULL,
  PRIMARY KEY(tenant_id,document_id,version_number),
  FOREIGN KEY(tenant_id,document_id) REFERENCES dms.document(tenant_id,id),
  UNIQUE(tenant_id,object_store_id,object_key,object_version_id));
CREATE TABLE IF NOT EXISTS dms.document_link (
  tenant_id uuid NOT NULL, id uuid NOT NULL, document_id uuid NOT NULL,
  target_domain text NOT NULL, target_type text NOT NULL, target_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(tenant_id,id), FOREIGN KEY(tenant_id,document_id) REFERENCES dms.document(tenant_id,id));
CREATE INDEX IF NOT EXISTS ix_dms_document_link_target
 ON dms.document_link(tenant_id,target_domain,target_type,target_id);
CREATE TABLE IF NOT EXISTS dms.document_acl (
  tenant_id uuid NOT NULL, id uuid NOT NULL, document_id uuid NOT NULL,
  subject_type text NOT NULL CHECK(subject_type IN('user','role','department','team','worker')),
  subject_id text NOT NULL, allowed_action text NOT NULL CHECK(allowed_action IN('read','write','approve','manage')),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(tenant_id,id), FOREIGN KEY(tenant_id,document_id) REFERENCES dms.document(tenant_id,id));
CREATE INDEX IF NOT EXISTS ix_dms_acl_lookup ON dms.document_acl(tenant_id,document_id,subject_type,subject_id);
CREATE TABLE IF NOT EXISTS integration.outbox_event (
  tenant_id uuid NOT NULL,id uuid NOT NULL,aggregate_type text NOT NULL,aggregate_id uuid NOT NULL,
  event_type text NOT NULL,payload jsonb NOT NULL,created_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz,PRIMARY KEY(tenant_id,id));
CREATE INDEX IF NOT EXISTS ix_outbox_unpublished ON integration.outbox_event(created_at) WHERE published_at IS NULL;
COMMIT;
