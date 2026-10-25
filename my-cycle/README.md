# MY CYCLE — local-first private period tracker

Development status: **prototype / not production-ready**.

A period-first tracker with no account, no advertising and no fertility prompts by default. Intended to be comfortable for teens and adults without making assumptions about pregnancy or relationships.

## Privacy contract

- No user account required.
- No period entries, symptoms, notes or identifiers sent to a developer-operated server.
- No analytics, advertising, tracking pixels, external fonts, remote scripts or third-party SDKs.
- App should be usable offline after first installation; deployment infrastructure serves *static app code only*.
- Local encrypted storage with user-held passphrase. No server-side password recovery.
- Optional fertility/ovulation estimates are off by default, clearly labelled uncertain and never framed as contraception.
- Predictions must never be presented as diagnosis.
- No push notifications with intimate details on lock screen by default.
- No sharing of cycle history with parents, developer or other users.
- Data export, local restore and permanent erase must be straightforward.

## Repository layout

The original MEverse project remains intact. This separate directory is reserved for MY CYCLE. The first standalone HTML prototype was produced as a conversation artifact, and is **not yet committed here**. Do not confuse this design scaffold with a deployed app.

## Technical direction

Static installable PWA, mobile-first, accessible, no required backend. Consider IndexedDB with WebCrypto AES-GCM, PBKDF2/Argon2id where appropriate, per-record authenticated metadata and deliberate migration strategy. Do not embed hard-coded secrets. Review service worker caching so nothing sensitive ever enters a shared CDN cache.

App hosting on GitHub Pages or Cloudflare Pages is optional. GitHub hosts code; it must never receive a user's exported backups or cycle data. A public GitHub repo exposes all code, so no sensitive fixtures.

## Release gates

See SECURITY.md and ACCEPTANCE.md. No public health-data collection, no production claims before security review, restore testing, and real-device accessibility checks.
