1. Project Overview

Medical Tracker is a cross-platform application (Web + Mobile) designed to allow healthcare professionals to view patients and record simple vital measurements (blood pressure and heart rate).
The goal of this project was to showcase a complete technical workflow: development, state management, validation, persistence, mobile packaging (Capacitor), testing, and deployment simulation.

2. Technologies & Tools

Frontend

Vue.js 3 (Composition API)

Pinia for state management

Vue Router

TailwindCSS

TypeScript

Backend / Mock API

json-server for local API simulation

LocalStorage for data persistence

Mobile

Capacitor 7 (Android & iOS packaging)

Android Studio

Xcode (iOS)

Testing

Vitest (unit tests)

Vue Test Utils

Playwright (E2E tests)

CI/CD

GitLab pipeline simulation with .gitlab-ci.yml

3. Work Environment

The project was developed using:

VS Code

Node.js and npm

Git for version control

A local development server (Vite)

Android Studio and Xcode for mobile builds

GitLab CI for simulated pipelines

4. Challenges & Solutions
4.1 Data Persistence

Challenge: Persisting patients and measurements locally while keeping API mock compatibility.
Solution: A localStorage sync system inside the Pinia store, triggered on state change.

4.2 Dynamic Routing & Reactive Store

Challenge: Vue Router parameters sometimes remained strings and caused mismatches with store keys.
Solution: Converting IDs to string keys (toKey()) to make the store more robust.

4.3 Modal & Form Validation

Challenge: Providing a reusable modal with strong numeric validation.
Solution: A dedicated composable-based validation with reactive error messages.

4.4 E2E Testing

Challenge: Automating UI tests while the app uses Vite preview.
Solution: Playwright configuration that launches npm run preview automatically during tests.

4.5 Mobile Packaging

Challenge: Converting a web SPA into a mobile-ready build using Capacitor.
Solution: Defined a clear workflow: build → sync → generate assets → open in Android/iOS → test.

5. CI/CD Pipeline

The .gitlab-ci.yml included:

Dependency installation

Web build step

Unit tests with Vitest

Playwright E2E test job

Placeholder deploy job to simulate a release pipeline

6. Possible Improvements
Functional Improvements

Add patient creation and editing

Add more measurement types (temperature, oxygen saturation, etc.)

Add charts for visualizing measurement trends

Add authentication (email/OTP)

Technical Improvements

Use IndexedDB for more robust offline storage

Implement background sync with a real backend (Symfony, NestJS…)

Add error monitoring (Sentry)

Improve accessibility (ARIA roles, screen reader labels)

Mobile Improvements

Offline-first mode

Push notifications (Capacitor Push)

Automatic sync when returning online

7. Conclusion

This project demonstrates the full development workflow of a small but realistic medical-oriented tracking application. It covers frontend architecture, form validation, state management, local persistence, testing strategy, mobile packaging, and deployment preparation.
The final result is a functional cross-platform prototype following good development practices.