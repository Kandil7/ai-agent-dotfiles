---
name: flutter-deployment
description: "Flutter deployment and CI/CD. Use when the user says 'build apk', 'build ios', 'TestFlight', 'Play Store', 'App Store', 'Codemagic', 'Fastlane', or 'signing'."
---

# Flutter Deployment

## Android

### Signing
- Generate keystore: `keytool -genkey -v -keystore key.jks -keyalg RSA -keysize 2048 -validity 10000`
- `android/app/key.properties`: store path, password, alias
- `build.gradle`: `signingConfigs` + `buildTypes`

### Build
- Debug APK: `flutter build apk --debug`
- Release APK: `flutter build apk --release`
- App Bundle (Play Store): `flutter build appbundle --release`
- Report APK/AAB size after build

### Play Store
- Version code: auto-increment in `pubspec.yaml` or `build.gradle`
- Metadata: screenshots, description, category in `android/fastlane/metadata`
- Internal testing track first, then promote to production

## iOS

### Signing
- Apple Developer account required
- Xcode: automatic signing (preferred) or manual provisioning
- `ios/Runner.xcproj`: team ID, bundle identifier

### Build
- `flutter build ios --release`
- Archive in Xcode or via `xcodebuild`
- Upload to TestFlight via Xcode Organizer or `fastlane upload`

### App Store
- App Review guidelines: follow Apple's Human Interface Guidelines
- Privacy manifest: required for iOS 17+ (describe API usage reasons)
- Required screenshots: 6.7", 6.5", 5.5" iPhone + 12.9" iPad

## CI/CD

### Codemagic (recommended for Flutter)
- `codemagic.yaml`: build, test, deploy pipeline
- Automatic signing for both platforms
- Store upload after successful build

### Fastlane
```yaml
# fastlane/Fastfile
lane :android do
  gradle(task: 'assemble', build_type: 'Release')
  upload_to_play_store(track: 'internal')
end
lane :ios do
  build_ios_app(scheme: 'Runner')
  upload_to_testflight
end
```

## Pitfalls

- Not incrementing version before release
- Forgetting to test on physical device before store submission
- Missing Android permission declarations in AndroidManifest.xml
- iOS: not setting minimum deployment version (check Podfile)
