Mobile Deployment Checklist (Capacitor · iOS & Android)

This document describes the full process to prepare, build, test and publish the mobile version of the Medical Tracker application using Capacitor.

Requirements
Mandatory tools

Node.js 20+

npm

Capacitor 7+

Android Studio (Android)

macOS + Xcode (iOS)

Apple Developer Account

Google Play Console Account

Project requirements

Web build output must be inside dist/

In capacitor.config.ts, ensure:
webDir: 'dist'

1. Build the Web App & Sync Capacitor
Build the web app

npm run build

Sync with native platforms

npx cap sync

If platforms don’t exist yet:
npx cap add android
npx cap add ios

Minimal capacitor.config.ts

appId: 'com.example.medicaltracker'
appName: 'Medical Tracker'
webDir: 'dist'
bundledWebRuntime: false

2. Icons & Splash Screens

Install the Capacitor Assets generator:
npm i -D @capacitor/assets

Generate icons & splashes:
npx cap assets --android --ios --icon ./assets/icon.png --splash ./assets/splash.png

Recommendations:

Icon: 1024×1024 (no transparency)

Splash: 2732×2732 (centered)

3. Versioning
Android (android/app/build.gradle)

versionCode 1
versionName "1.0.0"

iOS (Xcode)

Version = 1.0.0
Build = increment for each submission (1, 2, 3…)

4. App Signing
Android keystore generation

keytool -genkey -v -keystore medical-tracker.keystore -alias medical -keyalg RSA -keysize 2048 -validity 10000

Configure in android/app/build.gradle:
storeFile file("../medical-tracker.keystore")
storePassword System.getenv("KEYSTORE_PASSWORD")
keyAlias "medical"
keyPassword System.getenv("KEY_PASSWORD")

Build release bundle:
cd android
./gradlew assembleRelease

Output:
app-release.aab

5. iOS Signing

Create an Apple Distribution Certificate

Create a Provisioning Profile

Open Xcode: Target → Signing & Capabilities

Archive the app:
Product > Archive

6. Permissions
Android (AndroidManifest.xml)

Only include permissions required for the app.

iOS (Info.plist)

Add usage description keys only if needed.

Example:
NSCameraUsageDescription
“The app uses the camera for ...”

7. Test on Real Devices
Android

Open the project in Android Studio
Run on emulator or real device

iOS

npx cap open ios
Run inside Xcode

8. Publish to Google Play

Create the app in Google Play Console

Upload the AAB file

Fill store listing: title, description, screenshots, privacy policy, content rating

Publish to: internal testing, closed testing, or production

9. Publish to Apple App Store

Create the app in App Store Connect

Upload the build via Xcode Organizer

Fill store metadata: screenshots, description, keywords, privacy

Submit for review

10. Example App Store Rejection & Fix
Example rejection

“Missing purpose string in Info.plist for Health or Background capabilities.”

Fix

Remove unused capabilities (HealthKit, Background Modes)
If required, add Info.plist usage description:
NSHealthUpdateUsageDescription
“This app stores user-entered vital signs locally on the device.”

11. CI/CD Recommendations

Build job: npm run build

Android job: ./gradlew assembleRelease

iOS job: macOS runner required

Optional: Fastlane for automation

12. Common Issues & Fixes

White screen on launch → ensure webDir is correct, run npx cap sync
Icons not updating → regenerate assets and sync
API calls failing → fix backend CORS or use Capacitor HTTP plugin
Differences between Web & Mobile → check router mode and base path

13. Useful Commands

npm run build
npx cap sync
npx cap open android
npx cap open ios
npx cap assets --android --ios --icon ./icon.png --splash ./splash.png