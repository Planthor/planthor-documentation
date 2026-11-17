---
title: Trạng thái Backend
sidebar_label: Trạng thái Backend
sidebar_position: 15
description: Trạng thái live của issue backend và organization project của Planthor.
---

# Trạng thái Backend

**Lần lấy dữ liệu gần nhất:** 2026-11-17  
**Kho mã:** [`Planthor/planthor-backend`](https://github.com/Planthor/planthor-backend)  
**Nguồn dữ liệu:** GitHub CLI (`gh issue list`, `gh run list`) và `planthor-backend` `main` (`53e821d`)

## Tổng quan

| Chỉ số | Giá trị |
| --- | ---: |
| Tổng issue của repository | 25 |
| Issue đang mở | 11 |
| Issue đã đóng | 14 |
| Issue bảo mật đang mở | 2 |
| Issue tích hợp Strava/OAuth đang mở | 3 |
| Organization project đang hoạt động | 2 |

Backlog backend hiện tập trung vào tích hợp OAuth/Strava, tính đúng đắn của
identity và bảo mật token. Phần lớn issue mở được tạo gần đây chưa có label,
milestone hoặc assignee; vì vậy ưu tiên được suy ra từ tiêu đề issue.

Từ sau mốc 2026-09-02, [#70](https://github.com/Planthor/planthor-backend/issues/70)
đã đóng và nhánh `main` đã hoàn thành đồng bộ hoạt động qua Strava webhook (`#75`),
sửa lỗi Strava auth production (`#80`), lưu trữ Quartz trên PostgreSQL (`#81`, `#82`),
tùy chọn `AutoLinkAdapter` (`#84`), `GET /v1/members/me` (`#85`), `PATCH` update mask
cùng First Login Flow / kiểm tra username trên Keycloak. Toàn bộ workflow CI trên
`main` (Dotnet, Security, Code Analysis, Docker) đều đạt ở commit `53e821d`.

## Backlog Repository Đang mở

| Nhóm ưu tiên | Issues | Trạng thái |
| --- | --- | --- |
| Bảo mật | [#65 Mã hóa OAuth token khi lưu](https://github.com/Planthor/planthor-backend/issues/65); [#64 Sửa lỗ hổng replay state nonce](https://github.com/Planthor/planthor-backend/issues/64) | Mở |
| Strava và OAuth | [#71 Kiểm tra scope callback](https://github.com/Planthor/planthor-backend/issues/71); [#66 Xử lý webhook event](https://github.com/Planthor/planthor-backend/issues/66) *(đã kích hoạt trên `main` qua #75)*; [#58 Sửa lỗi đồng bộ UUID lookup](https://github.com/Planthor/planthor-backend/issues/58) | Mở |
| Identity và member API | [#69 Thêm IdentifyName validation](https://github.com/Planthor/planthor-backend/issues/69); [#68 Thêm IdentifyName lookup](https://github.com/Planthor/planthor-backend/issues/68); [#62 Sửa rủi ro collision khi JIT provisioning](https://github.com/Planthor/planthor-backend/issues/62); [#61 Thêm `GET /v1/members/me`](https://github.com/Planthor/planthor-backend/issues/61) *(đã triển khai trên `main` qua #85)* | Mở |
| Hiệu năng | [#63 Thêm MongoDB index cho `ExternalConnections`](https://github.com/Planthor/planthor-backend/issues/63) | Mở |
| Phân phối | [#34 Automated CI/CD Pipeline with Gitflow Support](https://github.com/Planthor/planthor-backend/issues/34) | Mở |

## Trạng thái Organization Project

| Project | Trạng thái | Items | Liên kết backend |
| --- | --- | ---: | --- |
| [Planthor Renovate v1.0](https://github.com/orgs/Planthor/projects/6) | Hoạt động | 41 | Chứa các backend item lịch sử đã hoàn thành #37, #40 và #44. 11 issue backend mở hiện tại chưa có trên board này. |
| `[TEMPLATE] Planthor board` | Hoạt động | 0 | Template riêng; chưa có work item. |
| [Planthor v1.0.0](https://github.com/orgs/Planthor/projects/3) | Đã đóng | 29 | Project lịch sử. |
| `@zovippro1996's untitled project` | Đã đóng | 0 | Project riêng lịch sử. |

## Các Mốc Công việc

| Mốc | Trạng thái | Điều kiện hoàn thành |
| --- | --- | --- |
| 1. Phân loại phát hiện bảo mật | Tiếp theo | Gán owner và thời hạn cho #64 và #65. |
| 2. Ổn định luồng kết nối Strava | Tiếp theo | Xử lý #58 và #71 (#70 đã đóng; #66 webhook sync đã kích hoạt trên `main` qua #75). |
| 3. Đồng bộ identity contract | Tiếp theo | Hoàn thành #62, #69, sau đó triển khai #68 (#61 `GET /v1/members/me` đã có qua #85). |
| 4. Cải thiện hiệu năng persistence | Đã lên kế hoạch | Thêm và xác minh index `ExternalConnections` trong #63. |
| 5. Đồng bộ theo dõi project | Đã lên kế hoạch | Thêm issue backend hiện tại vào board organization với owner, priority và milestone. |
| 6. Tự động hóa phát hành | Đã lên kế hoạch | Hoàn thành #34 với quy trình Gitflow CI/CD được tài liệu hóa. |

## Làm mới Báo cáo

Chạy các lệnh chỉ đọc sau với GitHub token có quyền `read:project`:

```bash
gh issue list --repo Planthor/planthor-backend --state all --limit 100
gh project list --owner Planthor --limit 100 --format json
gh project item-list 6 --owner Planthor --limit 100 --format json
```
