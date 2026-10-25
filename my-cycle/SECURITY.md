# MY CYCLE security model — initial review

## Current HTML prototype: known limitations

1. Records are stored as one PBKDF2-SHA256 (250,000 iterations) / AES-256-GCM encrypted JSON blob in browser localStorage. The passphrase is not transmitted, but its resistance to offline guessing depends on strength and KDF configuration.
2. Browser localStorage may be cleared by browsers, OS policies or the user. Private/incognito contexts may not persist. Encrypted backup and restore need actual Android/iOS/browser tests before reliance.
3. Unlock key and plaintext records live in JavaScript memory while unlocked. Browser extensions, malware, shared devices and cross-site scripting remain risks.
4. Direct file:// execution can have inconsistent secure-context, storage and WebCrypto behaviour. Serve over HTTPS for realistic testing.
5. There is no audited automatic lock or inactivity timeout, hardware keychain integration, encrypted key rotation, safe migration, storage-quota monitoring or comprehensive failure recovery.
6. There are no external network calls in the initial self-contained HTML prototype, but a deployed production build requires a reviewed Content Security Policy, permissions restrictions and automated checks on new dependencies.
7. Backup restore and deletion require adversarial and failure-path testing. Deleting local ciphertext cannot guarantee elimination of historical OS/browser backups and copies the user exported.
8. Passive server/CDN access logs can still record IP/requests to app assets. Do not claim total network anonymity merely because no health records are uploaded.

## Data-flow boundary

Host/CDN: static HTML/CSS/JS files. Device: all health entries, settings, passphrases, encryption, estimates, logs and backups. No analytics or diagnosis API.

## Safe release gates

- Threat model for lost phone, shared family device, malicious browser extension, wrong passphrase, lost backup, device reset and service-worker tampering.
- Explicit encrypted backup/restore test on fresh second device, with wrong passphrase and corrupted file.
- Versioned schema migration and rollback strategy; test no data loss when updating.
- XSS and dependency audit, restrictive CSP, no sensitive data in URL, logs or error reporting.
- Lock-screen preview redaction, consent-first scheduling and no fertility notification unless manually enabled.
- Verify no external requests containing sensitive payloads via network inspection.
- Independent security/privacy review before representing app as production ready.

Never commit a real user's health records or backups.


## v0.4 implementation update (2026-10-25)

- Save operations now use a single in-memory transaction gate and restore the previous data snapshot if the encrypted browser-storage write throws.
- Mark-day, clear-day, settings and quick-log handlers report write failures rather than claiming success.
- Hiding the page requests an immediate lock; if a write is in flight, locking follows its completion.
- Restoring an encrypted backup writes the new ciphertext before replacing the active decrypted session.
- JavaScript parse validation passed. No real device or browser integration testing performed.

### Still outstanding
- Implement durable write verification (including browser eviction and multi-tab conflicts), real backup recovery trials, and an idle-lock policy.
- Check privacy of OS task-switcher snapshots: visibility-based locking is not equivalent to native secure-window protection.
- Improve encrypted storage architecture and protect against cross-tab stale writes.
- Current protection assumes the browser and loaded application code are trustworthy. It does not protect against malicious extensions or compromised devices.
