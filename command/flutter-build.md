---
description: Build Flutter app for target platform (apk/ios/web), report build size, verify signing. Uses the flutter-deployment skill.
agent: flutter-developer
---

Build Flutter app for: $ARGUMENTS

1. Check platform: `apk`, `ios`, `web`, or `appbundle`.
2. Verify `pubspec.yaml` version is correct.
3. Run `flutter build <platform> --release`.
4. Report: build output path, APK/AAB size, any warnings.
5. If signing issues: check key.properties (Android) or Xcode signing (iOS).

Rules: never commit signing keys. Report size breakdown if possible. Flag if build exceeds 50MB for APK or 200MB for AAB.
