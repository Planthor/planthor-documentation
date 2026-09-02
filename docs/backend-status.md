---
title: Backend Status
sidebar_label: Backend Status
sidebar_position: 13
description: Live backend issue and organization-project status for Planthor.
---

# Backend Status

**Last fetched:** 2026-09-02  
**Repository:** [`Planthor/planthor-backend`](https://github.com/Planthor/planthor-backend)  
**Data source:** GitHub CLI (`gh issue list` and `gh project list`)

## Summary

| Measure | Value |
| --- | ---: |
| Repository issues | 25 |
| Open issues | 12 |
| Closed issues | 13 |
| Open security issues | 2 |
| Open Strava/OAuth integration issues | 4 |
| Active organization projects | 2 |

The active backend backlog is concentrated in OAuth/Strava integration,
identity correctness, and token security. Most recently created open issues
have no labels, milestones, or assignees, so prioritization is inferred from
their titles rather than GitHub metadata.

## Open Repository Backlog

| Priority area | Issues | Status |
| --- | --- | --- |
| Security | [#65 Encrypt OAuth tokens at rest](https://github.com/Planthor/planthor-backend/issues/65); [#64 Fix state nonce replay vulnerability](https://github.com/Planthor/planthor-backend/issues/64) | Open |
| Strava and OAuth | [#71 Validate granted callback scopes](https://github.com/Planthor/planthor-backend/issues/71); [#70 Fix dynamic redirect URI risk](https://github.com/Planthor/planthor-backend/issues/70); [#66 Process webhook events](https://github.com/Planthor/planthor-backend/issues/66); [#58 Fix UUID lookup sync failure](https://github.com/Planthor/planthor-backend/issues/58) | Open |
| Identity and member API | [#69 Add IdentifyName validation](https://github.com/Planthor/planthor-backend/issues/69); [#68 Add IdentifyName lookup](https://github.com/Planthor/planthor-backend/issues/68); [#62 Fix JIT provisioning collision risk](https://github.com/Planthor/planthor-backend/issues/62); [#61 Add `GET /v1/members/me`](https://github.com/Planthor/planthor-backend/issues/61) | Open |
| Performance | [#63 Add MongoDB index on `ExternalConnections`](https://github.com/Planthor/planthor-backend/issues/63) | Open |
| Delivery | [#34 Automated CI/CD Pipeline with Gitflow Support](https://github.com/Planthor/planthor-backend/issues/34) | Open |

## Organization Project Status

| Project | State | Items | Backend alignment |
| --- | --- | ---: | --- |
| [Planthor Renovate v1.0](https://github.com/orgs/Planthor/projects/6) | Active | 41 | Contains completed historical backend items #37, #40, and #44. The 12 current open backend issues are not represented on this board. |
| `[TEMPLATE] Planthor board` | Active | 0 | Private template; no active work items. |
| [Planthor v1.0.0](https://github.com/orgs/Planthor/projects/3) | Closed | 29 | Historical project. |
| `@zovippro1996's untitled project` | Closed | 0 | Historical private project. |

## Milestones

| Milestone | Status | Exit criteria |
| --- | --- | --- |
| 1. Triage security findings | Next | Assign owners and target dates for #64 and #65. |
| 2. Stabilize Strava connection flow | Next | Resolve #58, #70, and #71 before expanding webhook processing in #66. |
| 3. Align identity contracts | Next | Complete #62 and #69, then expose the member lookup/API work in #61 and #68. |
| 4. Improve persistence performance | Planned | Add and verify the `ExternalConnections` index in #63. |
| 5. Align project tracking | Planned | Add current backend issues to the active organization board with owner, priority, and milestone fields. |
| 6. Automate release delivery | Planned | Complete #34 with a documented Gitflow CI/CD workflow. |

## Refreshing This Report

Run these read-only commands with a GitHub token that has `read:project`:

```bash
gh issue list --repo Planthor/planthor-backend --state all --limit 100
gh project list --owner Planthor --limit 100 --format json
gh project item-list 6 --owner Planthor --limit 100 --format json
```
