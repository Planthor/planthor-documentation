---
title: Mobile Quality Status
sidebar_label: Mobile Quality Status
sidebar_position: 12
description: Status and milestones for Flutter mobile quality, SonarQube Cloud, and security remediation.
---

# Mobile Quality Status

**Last reviewed:** 2026-09-02  
**Repository:** `planthor-ios-application`  
**Scope:** Flutter quality checks, code coverage, SonarQube Cloud, and mobile transport security.

## Current Status

| Area | Status | Notes |
| --- | --- | --- |
| Flutter quality checks | Active | Formatting, static analysis, tests, and LCOV coverage run in GitHub Actions. |
| SonarQube Cloud analysis | Active | Runs after the Flutter quality job for pull requests and protected-branch pushes. |
| Coverage hand-off | Active | The SonarQube job consumes `coverage/lcov.info` from the quality-job artifact. |
| Quality gate | Remediation in progress | The first `main` analysis failed because two HTTPS clients accepted untrusted certificates. |
| TLS remediation | Ready for merge | The `fix/sonarqube-quality-gate` branch removes both unsafe certificate-validation bypasses. |
| Branch protection | Pending | Require **SonarQube analysis** after a successful post-fix analysis. |

## Milestones

| Milestone | Status | Exit criteria |
| --- | --- | --- |
| 1. Establish Flutter quality baseline | Complete | CI runs formatter, analyzer, tests, and coverage. |
| 2. Connect SonarQube Cloud | Complete | Project `Planthor_planthor-ios-application` receives LCOV analysis using `SONAR_TOKEN`. |
| 3. Analyze protected-branch pushes | Complete | `main` pushes run quality checks followed by SonarQube analysis. |
| 4. Remediate critical TLS findings | In progress | Merge `fix/sonarqube-quality-gate`; all HTTPS calls use normal certificate validation. |
| 5. Confirm green quality gate | Next | Push or merge the fix and confirm the SonarQube quality gate passes. |
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
