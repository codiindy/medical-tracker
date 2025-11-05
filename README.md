# Medical Tracker – Cross-Platform Health Monitoring App

Medical Tracker is a simple cross-platform application built with **Vue 3**, **Pinia**, and **Capacitor**, allowing healthcare professionals to view a list of patients and record basic vital measurements (blood pressure and heart rate).

The project includes:  
✔ Web application  
✔ Mobile packaging (Android & iOS)  
✔ Local persistence (LocalStorage)  
✔ Unit tests (Vitest)  
✔ E2E tests (Playwright)  
✔ CI/CD simulation with GitLab  

---

## ✅ Features

### **Patient Management**
- Display a list of patients  
- View patient details  
- Show a full timeline of measurements  

### **Measurements**
- Add blood pressure (SYS / DIA)  
- Add heart rate (BPM)  
- Numeric validation with error messages  
- Sorted timeline of measurements  
- Status indicator: **Normal / High**  

### **Data Persistence**
- Data stored via mock API (json-server)  
- Automatic sync between store and LocalStorage  

### **Mobile (Capacitor)**
- Android + iOS builds  
- Icon & splash screen generation  
- Ready for Google Play + App Store submission  

### **Testing**
- Unit tests (Pinia store)  
- Component tests (inputs, validation states)  
- Playwright E2E flow (open app, add measurement)  

---

## ✅ Tech Stack

### **Frontend**
- Vue 3 (Composition API)  
- Pinia  
- Vue Router  
- TailwindCSS  
- TypeScript  

### **Backend Mock**
- json-server (REST API)  
- LocalStorage persistence  

### **Mobile**
- Capacitor 7  
- Android Studio / Xcode  

### **Testing**
- Vitest  
- Vue Test Utils  
- Playwright (E2E)  

### **Tooling**
- Vite  
- Git  
- GitLab CI  

---

## ✅ Installation

### **Install dependencies**
```bash
npm install
```

### **Start the web app**
```bash
npm run dev
```

### **Start mock API (json-server)**
```bash
npm run dev:api
```
run on:
https://loalhost:4000

---
## ✅ Build for production


### **Web build**
```bash
npm run build
```

### **Preview**
```bash
npm run preview
```

---
## ✅ Mobile (Capacitor)

### **Sync native platforms**
```bash
npx cap sync
```

### **Open Android project**
```bash
npx cap open android
```

### **Open iOS project**
```bash
npx cap open ios
```

Before releasing to stores:
- Configure icons + splash
- Increment version
- Generate signed bundle
- Archive iOS build

Full mobile release checklist:
```bash
docs/deploy-checklist.md
```

---
## ✅ Tests

### **Run all unit tests**
```bash
npm test
```

### **UI mode**
```bash
npm run test:ui
```

### **End-to-end tests**
```bash
npm run e2e
```

Playwright automatically:
- Launches a local Vite server
- Runs in headless mode
- Closes server after tests

---
## ✅ Folder structure

### **Run all unit tests**
```bash
src/
  components/        # Shared UI components
  stores/            # Pinia stores
  views/             # Pages (Home, Patient Details)
  composables/       # Reusable logic
  services/          # API client (json-server mock)

tests/
  unit/              # Vitest unit tests
  e2e/               # Playwright tests

docs/
  deploy-checklist.md
  report.md

```

---
## ✅ CI/CD (GitLab)
The .gitlab-ci.yml includes:
- Install step
- Build step
- Unit tests
- Playwright E2E tests
- Simulated deploy stage (dummy artifact)

Pipeline is compatible with real GitLab CI.

---
## ✅ Conclusion

Medical Tracker demonstrates a complete and realistic workflow:

- Vue 3 architecture
- Pinia store design
- Form validation
- Local persistence
- Mobile packaging
- Automated testing
- CI/CD pipeline


