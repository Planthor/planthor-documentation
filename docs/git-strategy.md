---
title: Git Strategy
sidebar_label: Git Strategy
sidebar_position: 12
---

# Diagram

```mermaid
gitGraph
    commit
    commit tag: "1.0.0" type: HIGHLIGHT
    commit
    branch "feat/"
    checkout main
    commit tag: "1.1.0" type: HIGHLIGHT
    checkout "feat/"
    commit
    commit
    checkout main
    merge "feat/"
    commit
    branch "fix/"
    commit
    commit
    checkout main
    merge "fix/"
    commit tag: "1.1.1" type: HIGHLIGHT
    commit
    commit id: "HEAD" tag: "latest" type: HIGHLIGHT
```

## Tentative release plan

Ideally:

- `major` = yearly
- `minor` = quarterly
- `patch` = monthly/critical
- `main` = latest

## Disclaimer

We will not maintain the older versions of "major", "minor".
