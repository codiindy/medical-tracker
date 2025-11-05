Medical Tracker – Cross-Platform Health Monitoring App

Medical Tracker is a simple cross-platform application built with Vue 3, Pinia, and Capacitor, allowing healthcare professionals to view a list of patients and record basic vital measurements (blood pressure and heart rate).
The project includes:
✔ Web application
✔ Mobile packaging (Android & iOS)
✔ Local persistence (LocalStorage)
✔ Unit tests (Vitest)
✔ E2E tests (Playwright)
✔ CI/CD simulation with GitLab

✅ Features
Patient Management

Display a list of patients

View a patient’s details

Show a history of measurements

Measurements

Add blood pressure (SYS/DIA) and heart rate (BPM)

Numeric validation with error messages

Sorted timeline of measurements

Status indicator (Normal / High)

Data Persistence

Measured data stored both via mock API (json-server) and LocalStorage

Auto-sync between store and LocalStorage

Mobile (Capacitor)

Android and iOS builds

Icons & splash screen generation

Ready for Google Play + App Store submission

Testing

Unit tests for Pinia store

Component tests (inputs, error states)

Playwright E2E flow (open app, add measurement)

✅ Tech Stack
Frontend

Vue 3 + Composition API

Pinia

Vue Router

TailwindCSS

TypeScript

Backend Mock

json-server (local REST API)

LocalStorage (device persistence)

Mobile

Capacitor 7

Android Studio / Xcode

Testing

Vitest

Vue Test Utils

Playwright (E2E)

Tooling

Vite

Git

GitLab CI

✅ Installation
Install dependencies

npm install

Start the web app

npm run dev

Start mock API

Runs a fake REST server on http://localhost:4000
npm run dev:api

✅ Build for Production
Web build

npm run build

Preview production build

npm run preview

✅ Mobile (Capacitor)
Sync native platforms

npx cap sync

Open Android project

npx cap open android

Open iOS project

npx cap open ios

Before releasing to stores:

Configure icons + splash

Increment version

Generate signed bundle

Archive iOS build

Full mobile checklist is available in:
docs/deploy-checklist.md

✅ Tests
Run all unit tests

npm test

Run tests in UI mode

npm run test:ui

Run end-to-end tests

npm run e2e
(or)
npx playwright test

Playwright will automatically:

Launch a local server with Vite

Run tests in headless mode

Close server after completion

✅ Folder Structure

src/
• components/ — shared UI components
• stores/ — Pinia stores
• views/ — pages (Home, Patient Details)
• composables/ — reusable logic
• services/ — API client (json-server mock)

tests/
• unit/ — Vitest unit tests
• e2e/ — Playwright tests

docs/
• deploy-checklist.md
• report.md

✅ CI/CD (GitLab)

The .gitlab-ci.yml includes:

Install step

Build step

Unit tests

Playwright E2E tests

Simulated deploy stage (dummy artifact)

Pipeline is ready for a real GitLab environment.

✅ Known Limitations (Expected for a Test Project)

No authentication flow

No backend persistence (mock only)

No user-generated patients (predefined list)

Mobile permissions are minimal

No advanced analytics or charts

These limitations are intentional given the scope.

✅ Future Improvements

Add patient management (CRUD)

Add more measurement types

Add charts (blood pressure trends)

Better offline-first support with IndexedDB

Sync with a real backend (Symfony / NestJS)

Push notifications

Role-based access (nurses / doctors)

✅ Conclusion

Medical Tracker demonstrates a complete, functional workflow:
✔ Vue 3 architecture
✔ Pinia store design
✔ Form validation
✔ Local persistence
✔ Mobile packaging
✔ Automated testing
✔ CI/CD pipeline

It serves as a solid foundation for a medical or health-related cross-platform application.