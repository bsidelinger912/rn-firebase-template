# RN firebase boilerplate

## Steps to set up with firebase
- Set up a firebase app
- Follow instructions here: https://rnfirebase.io/ to update GoogleService-Info.plist and google-services.json
- update android/app/build.gradle namespace and applicationId to match the right id from firebase setup
- Add the SHA1 and SHAH256 fingerprints by running `./gradlew signingReport` in /android
- Open xcode, click the project, click General header and update Bundle Identifier to match