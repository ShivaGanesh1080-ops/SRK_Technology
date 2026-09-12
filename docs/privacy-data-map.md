# SRK Privacy Data Map

This document outlines the student and user data collected, stored, and managed by the SRK application. It clarifies what is public, private, and restricted to administrative roles, along with the intended retention and purpose.

## Data Classification Model

- **PUBLIC**: Data visible to unauthenticated users or other students on the platform.
- **PRIVATE**: Data visible only to the specific student and system administrators.
- **ADMIN-ONLY**: Data visible only to system administrators, trainers, and college administration.

## Data Map

| Data Point | Purpose | Storage | Access Level | Retention / Notes |
|------------|---------|---------|--------------|-------------------|
| **Email Address** | Login, communications, notifications | Supabase Auth & `User` table | **PRIVATE** | Kept indefinitely or until account deletion. |
| **Password** | Authentication | Supabase Auth | **SYSTEM ONLY** | Hashed by Supabase; not accessible by Prisma/App. |
| **Full Name** | Profile identification, Certificates | `StudentProfile` | **PRIVATE** / **ADMIN** | May be printed on future certificates. |
| **Phone Number** | Emergency contact, SMS alerts (future) | `StudentProfile` | **PRIVATE** / **ADMIN** | Used only for official workshop communications. |
| **College** | Cohort grouping, College dashboard stats | `StudentProfile` | **PRIVATE** / **ADMIN** | Visible to the student's College Admin. |
| **Department** | Workshop targeting, curriculum planning | `StudentProfile` | **PRIVATE** / **ADMIN** | |
| **Academic Year** | Eligibility verification | `StudentProfile` | **PRIVATE** / **ADMIN** | |
| **Student ID / Roll No** | Official college verification | `StudentProfile` | **PRIVATE** / **ADMIN** | Required by colleges for attendance tracking. |
| **GitHub URL** | Project showcases (optional) | `StudentProfile` | **PUBLIC** (Future) | Planned to be public on a student portfolio page. |
| **LinkedIn URL** | Professional networking (optional) | `StudentProfile` | **PUBLIC** (Future) | Planned to be public on a student portfolio page. |
| **Registration History** | Workshop access, status tracking | `Registration` | **PRIVATE** / **ADMIN** | Visible to student and trainers/admins evaluating them. |
| **Certificates** | Proof of completion (future) | `Registration` (Status) | **PUBLIC** (Verifiable) | Certificates will eventually have a public verification URL. |

## Privacy Considerations & Limitations

1. **Compliance Boundaries**: 
   - SRK is currently an MVP intended for local college deployments. 
   - **We make no explicit claims of GDPR, DPDP (India), or ISO compliance** at this stage. Full legal review is required before scaling beyond pilot deployments.
2. **Third-Party Sharing**:
   - Student data is explicitly shared with the associated **College Administration** (via the future College Dashboard).
   - Data is never sold or shared with external third-party advertisers.
3. **Data Deletion**:
   - Currently, cascading deletes are configured at the database level (`onDelete: Cascade` in Prisma). Deleting a user in the database removes their profile and registrations. A self-serve deletion UI is not yet implemented.
