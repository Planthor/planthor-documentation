---
title: Mobile Quality Status
sidebar_label: Mobile Quality Status
sidebar_position: 14
description: Status and milestones for Flutter mobile quality, SonarQube Cloud, and security remediation.
---

# Mobile Quality Status

**Last reviewed:** 2026-11-17  
**Repository:** `planthor-ios-application`  
**Scope:** Flutter quality checks, code coverage, SonarQube Cloud, and mobile transport security.

## Current Status

| Area | Status | Notes |
| --- | --- | --- |
| Flutter quality checks | Active (passing) | Formatting, static analysis, tests, and LCOV coverage pass on `main` (`e0f497c`). |
| SonarQube Cloud analysis | Failing on `main` | `SonarQube analysis` job fails in `sonar-scanner` (exit code 3) on recent `main` runs, skipping iOS/Android build verification. |
| Coverage hand-off | Active | The SonarQube job consumes `coverage/lcov.info` from the quality-job artifact. |
| TLS remediation | Complete | PR `#17` (`fix/sonarqube-quality-gate`, `81e5333`) merged to `main`, removing unsafe certificate-validation bypasses. |
| Recent `main` features | Shipped | PR `#18` (`dev`/`prod` profile split), PR `#19` (docs/skills), and `e0f497c` (auto-sync profile). |
| Branch protection | Pending | Require **SonarQube analysis** after the `sonar-scanner` CI failure is resolved. |

## Milestones

| Milestone | Status | Exit criteria |
| --- | --- | --- |
| 1. Establish Flutter quality baseline | Complete | CI runs formatter, analyzer, tests, and coverage. |
| 2. Connect SonarQube Cloud | Complete | Project `Planthor_planthor-ios-application` receives LCOV analysis using `SONAR_TOKEN`. |
| 3. Analyze protected-branch pushes | Complete | `main` pushes run quality checks followed by SonarQube analysis. |
| 4. Remediate critical TLS findings | Complete | Merged via PR `#17`; HTTPS calls use normal certificate validation. |
| 5. Confirm green quality gate | In progress | Fix `sonar-scanner` exit code 3 on `main` and confirm the SonarQube quality gate passes. |
| 6. Enforce merge protection | Next | Add **SonarQube analysis** to required GitHub branch checks. |

## Operating Rules

- Store `SONAR_TOKEN` only as a GitHub Actions repository secret; never commit it.
- Keep generated Dart `*.g.dart` files out of SonarQube source and coverage metrics.
- Do not bypass TLS validation with `badCertificateCallback`. Local development defaults to HTTP; custom local HTTPS endpoints need a certificate trusted by the simulator or device.
- Pull requests from forks skip the SonarQube job because GitHub does not expose repository secrets to forked workflows.

## Verification Commands

Run these in `planthor-ios-application` before opening a pull request:

```bash
flutter analyze --fatal-infos --fatal-warnings
flutter test --no-pub
scripts/ci/check_coverage.sh
```
