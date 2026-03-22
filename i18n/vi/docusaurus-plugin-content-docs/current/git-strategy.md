---
title: Chiến lược Git
sidebar_label: Chiến lược Git
sidebar_position: 12
---

# Sơ đồ

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

## Kế hoạch phát hành dự kiến

Theo định hướng:

- `major` = hàng năm
- `minor` = hàng quý
- `patch` = hàng tháng/quan trọng
- `main` = mới nhất

## Tuyên bố miễn trừ trách nhiệm

Chúng tôi sẽ không duy trì các phiên bản cũ của "major" và "minor".
