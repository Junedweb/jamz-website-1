# Casting Director & Control Centre Module Documentation

## Overview
The Casting Director & Control Centre is a centralized hub within the Jamz app designed to manage the entire casting lifecycle. It provides a modular interface for project management, talent discovery, communication, evaluation, and reporting.

## Module Relationships & Dependencies

### Core Modules
1. **Project & Role Management (`projects`)**: The foundational module. Almost all other modules depend on an active project context.
2. **Deep Talent Search & Vault (`search`)**: Feeds into Projects. Search your private vault and wider network with precision.
3. **Funnel & Casting Health Analytics (`analytics`)**: Consumes data from all modules to provide a high-level overview of casting health.

### Workflow Modules
4. **Communication & Outreach (`outreach`)**: Depends on `projects` (for recipient lists) and `scheduling` (for audition invites).
5. **Scheduling & Availability (`scheduling`)**: Depends on `projects` and feeds data into `evaluation`.
6. **Shortlisting & Evaluation (`evaluation`)**: Depends on `scheduling` (for candidates) and feeds into `client` for sharing.
7. **Smart Agreements & Compliance (`agreements`)**: Final stage module. Depends on `evaluation` (for confirmed talent).

### Support Modules
8. **Client Share & Handover (`client`)**: Bridge between the internal team and external stakeholders.
9. **Talent Feedback & History (`feedback`)**: Long-term data storage module. Collects data from `evaluation`.
10. **Reporting & Insights (`reporting`)**: Export-oriented module consuming data from `analytics` and `agreements`.
11. **Team & Permissions (`team`)**: Cross-cutting module managing access to all other modules.
12. **AI Creative Tools (`ai-tools`)**: Enhancement module providing automation across `search`, `evaluation`, and `outreach`.

## Navigation Paths

### Primary Navigation
- **App Home → Control Centre Grid**: The entry point showing all 12 modules.
- **Control Centre Grid → Module Detail**: Clicking any module card launches its specific functional prototype.
- **Module Detail → Control Centre Grid**: "Back to Control Centre" button (top left).

### Quick Navigation (Cross-Module)
- **Module Detail Footer**: A persistent bottom navigation bar allows switching between related modules without returning to the grid.
- **Contextual Links**: (Planned) Deep links between modules (e.g., "View Evaluation" from a `scheduling` slot).

## Future Production Implementation Requirements

### 1. Backend & Data Layer
- **Real-time Synchronization**: Use WebSockets or Supabase Realtime for live updates across team members (e.g., scheduling conflicts).
- **Relational Database**: PostgreSQL schema with robust foreign key relationships between `projects`, `talent`, `roles`, and `evaluations`.
- **File Storage**: Secure S3 storage for talent videos, headshots, and signed agreements.

### 2. Security & Compliance
- **Role-Based Access Control (RBAC)**: Fine-grained permissions (e.g., "Assistant" can view search but not sign agreements).
- **GDPR/DPDP Compliance**: Talent data encryption and right-to-be-forgotten implementation.
- **Digital Signatures**: Integration with DocuSign or HelloSign API for the `agreements` module.

### 3. AI Integration
- **LLM Processing**: Integration with OpenAI/Anthropic for the AI tools (script analysis, automated feedback summaries).
- **Vector Search**: Pinecone or Milvus for semantic talent search based on "look" and "vibe" descriptions.

### 4. UI/UX Enhancements
- **Framer Motion**: Replace basic CSS transitions with robust layout animations for smoother state changes.
- **Skeleton Loading**: Implement for all prototype sections to handle real API latency.
- **Mobile App**: Develop a dedicated React Native version using the same modular logic.
