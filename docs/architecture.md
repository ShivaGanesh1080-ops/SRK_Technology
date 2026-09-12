# SRK System Architecture

## 1. Tech Stack Overview
- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **UI Components:** shadcn/ui, Radix UI, Framer Motion
- **Language:** TypeScript
- **Database:** PostgreSQL (via Supabase)
- **ORM:** Prisma
- **Authentication:** Supabase Auth (Email/Password, Roles)
- **Validation:** Zod, React Hook Form

## 2. Milestone 1 Architecture
The first milestone relies on a typed mock data layer (`lib/data`) for all dynamic content to ensure the UI is fully designed and responsive before database integration. The UI components will consume this data through clean abstractions.

## 3. Directory Structure
- `src/app`: Next.js App Router pages and layouts.
- `src/components/ui`: Reusable atomic UI components (shadcn/ui).
- `src/components/layout`: Navbars, footers, wrappers.
- `src/components/sections`: Large page sections (e.g., Homepage Hero).
- `src/lib/data`: Mock data for Milestone 1.
- `src/lib/utils`: Helper functions.
- `src/lib/validations`: Zod schemas for forms.
- `src/types`: Global TypeScript types.

## 4. Future Integration (Milestone 2+)
- The `lib/data` functions will be replaced by Prisma client calls inside Next.js Server Actions or Route Handlers.
- Supabase Auth will be integrated for session management and protected routes.
- Webhooks for payment (Razorpay) will be implemented securely on the server.
