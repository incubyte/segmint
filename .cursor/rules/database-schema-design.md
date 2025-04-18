# Database Schema Design for Segmint

## Introduction

This document outlines the comprehensive database schema design for Segmint, a Personalized AI Content Engine by Incubyte. The design is tailored for a PostgreSQL database with TypeScript ORM integration using Prisma, incorporating industry best practices and advanced database design principles.

## 1. Entity-Relationship Diagram (ER Diagram)

### Complete Entity Relationship Map

```plaintext
[User] --< [SocialProfile]
[User] --< [Content]
[User] --< [ApprovalWorkflow]
[Content] --< [IdeaSuggestion]
[Content] --< [PlatformPost]
[ApprovalWorkflow] --< [TeamMember]
[PlatformPost] --< [Platform]
[Platform] --= [PlatformPost]  (many-to-many)
```

### Cardinality Notations

- **[User]** to **[SocialProfile]**: One-to-Many
- **[User]** to **[Content]**: One-to-Many
- **[User]** to **[ApprovalWorkflow]**: One-to-Many
- **[Content]** to **[IdeaSuggestion]**: One-to-Many
- **[Content]** to **[PlatformPost]**: One-to-Many
- **[ApprovalWorkflow]** to **[TeamMember]**: One-to-Many
- **[PlatformPost]** to **[Platform]**: Many-to-One
- **[Platform]** to **[PlatformPost]**: Many-to-Many

### Entity Inheritance Relationships

- **[User]**: Base entity with roles differentiating creators, team members, and admins.

### Aggregate Relationships

- **[Content]** aggregates **[IdeaSuggestion]** and **[PlatformPost]**.

### Domain Boundaries

- **User Management**: [User], [SocialProfile]
- **Content Management**: [Content], [IdeaSuggestion]
- **Social Integration**: [Platform], [PlatformPost]
- **Approval Workflows**: [ApprovalWorkflow], [TeamMember]

## 2. Table Structures

### [User]

- **id**: `SERIAL PRIMARY KEY`
- **username**: `VARCHAR(50) NOT NULL UNIQUE`
- **email**: `VARCHAR(255) NOT NULL UNIQUE`
- **password_hash**: `VARCHAR(255) NOT NULL`
- **role**: `ENUM('creator', 'team_member', 'admin') NOT NULL`
- **created_at**: `TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP`
- **updated_at**: `TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP`

### [SocialProfile]

- **id**: `SERIAL PRIMARY KEY`
- **user_id**: `INT NOT NULL REFERENCES User(id) ON DELETE CASCADE`
- **platform**: `ENUM('LinkedIn', 'Twitter', 'Instagram', 'YouTube') NOT NULL`
- **profile_handle**: `VARCHAR(100) NOT NULL`
- **access_token**: `TEXT NOT NULL`
- **refresh_token**: `TEXT NOT NULL`
- **expires_at**: `TIMESTAMPTZ NOT NULL`
- **created_at**: `TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP`

### [Content]

- **id**: `SERIAL PRIMARY KEY`
- **user_id**: `INT NOT NULL REFERENCES User(id) ON DELETE SET NULL`
- **title**: `VARCHAR(255) NOT NULL`
- **body**: `TEXT NOT NULL`
- **tone**: `VARCHAR(100) NOT NULL`
- **created_at**: `TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP`
- **updated_at**: `TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP`

### [IdeaSuggestion]

- **id**: `SERIAL PRIMARY KEY`
- **content_id**: `INT NOT NULL REFERENCES Content(id) ON DELETE CASCADE`
- **suggestion**: `TEXT NOT NULL`
- **relevance_score**: `NUMERIC(3, 2) CHECK (relevance_score >= 0 AND relevance_score <= 1)`
- **created_at**: `TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP`

### [PlatformPost]

- **id**: `SERIAL PRIMARY KEY`
- **content_id**: `INT NOT NULL REFERENCES Content(id) ON DELETE CASCADE`
- **platform_id**: `INT NOT NULL REFERENCES Platform(id) ON DELETE CASCADE`
- **scheduled_time**: `TIMESTAMPTZ NOT NULL`
- **status**: `ENUM('draft', 'scheduled', 'posted') NOT NULL`
- **created_at**: `TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP`

### [Platform]

- **id**: `SERIAL PRIMARY KEY`
- **name**: `VARCHAR(50) NOT NULL UNIQUE`
- **api_endpoint**: `TEXT NOT NULL`
- **created_at**: `TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP`

### [ApprovalWorkflow]

- **id**: `SERIAL PRIMARY KEY`
- **user_id**: `INT NOT NULL REFERENCES User(id) ON DELETE SET NULL`
- **status**: `ENUM('pending', 'approved', 'rejected') NOT NULL`
- **created_at**: `TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP`
- **updated_at**: `TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP`

### [TeamMember]

- **id**: `SERIAL PRIMARY KEY`
- **workflow_id**: `INT NOT NULL REFERENCES ApprovalWorkflow(id) ON DELETE CASCADE`
- **member_id**: `INT NOT NULL REFERENCES User(id) ON DELETE CASCADE`
- **role**: `ENUM('reviewer', 'approver') NOT NULL`
- **created_at**: `TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP`

## 3. Advanced Key Management

- **Primary Key**: Surrogate keys are used (SERIAL type) for simplicity and performance.
- **Composite Keys**: Used in [PlatformPost] for `content_id` and `platform_id`.
- **Foreign Key Behaviors**: ON DELETE CASCADE for dependent entities, SET NULL where historical data retention is needed.
- **Circular References**: None identified.
- **Self-Referential**: Not applicable.
- **Junction Tables**: [PlatformPost] acts as a junction table for Content and Platform.

## 4. Sophisticated Indexing Strategy

- **B-tree Indexes**: Default for primary keys and unique constraints.
- **Partial Indexes**: On [PlatformPost] for filtering by `status = 'scheduled'`.
- **Multi-column Index**: On [Content] for `user_id, created_at` to optimize user-specific queries.
- **GIN Index**: On [Content] `body` for full-text search.
- **Index Maintenance**: Regular reindexing and monitoring with auto-vacuum.
- **Covering Indexes**: For frequent read queries, e.g., `SELECT title FROM Content WHERE user_id = ?`.
- **Write Impact Analysis**: Indexed columns are chosen carefully to balance read and write performance.

## 5. Comprehensive Database Normalization

- **1NF**: All tables are atomic with unique rows.
- **2NF**: Non-primary key attributes fully functionally dependent on the primary key.
- **3NF**: All attributes are only dependent on primary keys.
- **BCNF**: Ensured by removal of transitively dependent attributes.
- **Denormalization**: None recommended; performance is managed through indexing.
- **Partitioning**: Horizontal partitioning by `created_at` on high-activity tables like [PlatformPost].

## 6. Advanced Query Patterns with Examples

- **Complex Joins**: 
  ```sql
  SELECT c.title, p.name 
  FROM Content c 
  JOIN PlatformPost pp ON c.id = pp.content_id 
  JOIN Platform p ON pp.platform_id = p.id;
  ```
- **Recursive Queries**: Not applicable.
- **Materialized Views**: For frequently accessed analytics.
- **CTEs**: 
  ```sql
  WITH RecentContent AS (
    SELECT id, title FROM Content WHERE created_at > NOW() - INTERVAL '30 days'
  )
  SELECT * FROM RecentContent;
  ```
- **Window Functions**: 
  ```sql
  SELECT id, title, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) 
  FROM Content;
  ```
- **Full-text Search**: 
  ```sql
  SELECT * FROM Content WHERE to_tsvector(body) @@ to_tsquery('search_query');
  ```

## 7. Sophisticated Migration Strategy

- **Schema Evolution**: Use Prisma migrations with version control.
- **Zero-downtime Migrations**: Implement online schema changes with careful indexing strategy.
- **Rollback Mechanisms**: Maintain previous migration states for emergency rollbacks.
- **Data Migration**: Use scripts for large datasets with logging.
- **Schema Validation**: Pre-deployment checks with test databases.
- **Migration Testing**: Automated tests with CI/CD integration.

## 8. Comprehensive Data Integrity Rules

- **Domain Constraints**: ENUM types restrict specific columns like `role`.
- **Referential Integrity**: Enforced through foreign key constraints.
- **Business Rules**: CHECK constraints for score ranges.
- **Triggers**: For audit logging.
- **Stored Procedures**: For complex logic not manageable by ORM.
- **Validation**: Prefer database-level for critical constraints, application-level for user feedback.

## 9. Advanced Performance Optimization

- **Table Partitioning**: Monthly partitions on [PlatformPost].
- **Connection Pooling**: Configure with Prisma and PostgreSQL for optimal thread management.
- **Query Plan Analysis**: Use EXPLAIN and ANALYZE for performance tuning.
- **Security**: Statement-level security for sensitive operations.
- **VACUUM and ANALYZE**: Scheduled regularly for table maintenance.
- **Read Replica**: For load balancing and scaling read operations.
- **Caching Layer**: Implement Redis for frequently accessed data.
- **Horizontal Scaling**: Plan for sharding strategies as data grows.

## 10. Database Security Implementation

- **RBAC**: Define roles with least privilege principle.
- **Column-level Security**: Restrict access to sensitive columns.
- **RLS Policies**: Implement for row-level access control.
- **Data Encryption**: Use SSL/TLS for data in transit and pgcrypto for data at rest.
- **Audit Logging**: Track changes and access for compliance.
- **Sensitive Data**: Masking and pseudonymization where applicable.

## 11. ORM Integration Specifics

- **Prisma Schema**: Define models with enums, relationships, and constraints.
- **Model Relationships**: Clear one-to-many, many-to-many relationships in Prisma.
- **Middleware Integration**: For logging and error handling.
- **Type-safe Query Building**: Use Prisma's API for robust type safety.
- **Transaction Management**: Use Prisma's transactional API.
- **Soft Delete**: Implement using `deleted_at` timestamps.
- **Optimistic Locking**: Use versioning fields to prevent race conditions.

This schema design ensures a robust, scalable, and efficient database structure for Segmint, facilitating seamless AI-driven content creation and management.