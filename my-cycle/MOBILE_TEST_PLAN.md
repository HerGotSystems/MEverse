# Mobile test plan — 2026-10-25

Status: not yet device-tested. No claim of native-app store compatibility.

## Real device pass criteria
- Android Chrome and iOS Safari: install to home screen over HTTPS, reopen in standalone mode.
- With airplane mode on after first successful load: unlock existing encrypted data, view history, mark period and export backup.
- Force close/reopen and phone reboot: entries must survive.
- 320px and 375px layouts: readable without horizontal scroll, calendar dates selectable and period button usable.
- Change month across leap years, daylight saving and timezone changes: dates stay correct.
- Lock, background app for >5 minutes, foreground app: asks passphrase; lock-screen app-switcher snapshots must be reviewed.
- Deny storage or fill quota: clearly report errors and preserve previous successful records.
- Export backup, restore to different test device using fake records, test incorrect passphrase and corrupt file.
- Update app shell while preserving encrypted records; verify all previous entries remain.
- Install iOS limitations: service workers and backup downloading may behave differently; verify.
- Review network requests: only static same-origin app resources; no analytics, trackers, health data or remote JS.
- Verify screen readers, text scaling, colour contrast and touch controls.

## Current architecture boundary
- Static PWA shell can be cached for offline use under HTTPS.
- Encrypted health records remain in browser localStorage; never service-worker cache.
- Browser storage can be erased by OS/browser eviction: encrypted export is the recovery path.
- Browser app data and service worker are origin-bound. Switching origin/domain can strand old records.
- Service worker install requires an HTTPS origin (or local development exception); opening raw index.html by file:// is not representative.
- Privacy promise needs explicit test in released build; static hosting still receives network request metadata such as IP address.

## Release blockers
No automatic secure migration, exhaustive backup tests, independent security review, verified auto-lock snapshots, production hosting, or Android/iOS install validation yet.
