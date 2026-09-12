# SaaS Deployment Build Tasks

## 1. Authentication Utilities
- [x] Create `src/lib/auth.ts` for reusable role verification and identity fetching.

## 2. Super Admin Dashboard (`/admin`)
- [x] Create `src/app/admin/layout.tsx` (RBAC enforcement).
- [x] Create `src/app/admin/page.tsx` (Analytics overview).
- [x] Create `src/app/actions/admin.ts` (Server actions for workshop creation).
- [x] Create `src/app/admin/workshops/page.tsx` (Workshop listing).
- [x] Create `src/app/admin/workshops/create/page.tsx` (Workshop creation form).

## 3. College Admin Dashboard (`/college`)
- [x] Create `src/app/college/layout.tsx` (RBAC enforcement).
- [x] Create `src/app/college/page.tsx` (College student tracking).

## 4. Trainer Dashboard (`/trainer`)
- [x] Create `src/app/trainer/layout.tsx` (RBAC enforcement).
- [x] Create `src/app/trainer/page.tsx` (Assigned workshops tracking).

## 5. Scripting & Tooling
- [x] Create `scripts/make-admin.ts` to easily promote a user to `SUPER_ADMIN`.
