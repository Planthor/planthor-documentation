---
title: Trạng thái Chất lượng Mobile
sidebar_label: Chất lượng Mobile
sidebar_position: 14
description: Trạng thái và mốc công việc cho chất lượng Flutter, SonarQube Cloud và khắc phục bảo mật.
---

# Trạng thái Chất lượng Mobile

**Lần rà soát gần nhất:** 2026-11-17  
**Kho mã:** `planthor-ios-application`  
**Phạm vi:** kiểm tra chất lượng Flutter, coverage, SonarQube Cloud và bảo mật kết nối mobile.

## Trạng thái Hiện tại

| Hạng mục | Trạng thái | Ghi chú |
| --- | --- | --- |
| Kiểm tra chất lượng Flutter | Đang hoạt động (đạt) | Định dạng, phân tích tĩnh, kiểm thử và LCOV coverage đạt trên `main` (`e0f497c`). |
| Phân tích SonarQube Cloud | Đang lỗi trên `main` | Job `SonarQube analysis` lỗi ở `sonar-scanner` (exit code 3) trên các lần chạy `main` gần đây, làm bỏ qua iOS/Android build verification. |
| Chuyển báo cáo coverage | Đang hoạt động | Job SonarQube dùng `coverage/lcov.info` từ artifact của job quality. |
| Khắc phục TLS | Hoàn thành | PR `#17` (`fix/sonarqube-quality-gate`, `81e5333`) đã merge vào `main`, xóa cơ chế bỏ qua xác thực chứng chỉ không an toàn. |
| Tính năng mới trên `main` | Đã phát hành | PR `#18` (tách profile `dev`/`prod`), PR `#19` (tài liệu/skills) và `e0f497c` (auto-sync profile). |
| Branch protection | Chờ thực hiện | Yêu cầu **SonarQube analysis** sau khi xử lý xong lỗi `sonar-scanner` trên CI. |

## Các Mốc Công việc

| Mốc | Trạng thái | Điều kiện hoàn thành |
| --- | --- | --- |
| 1. Thiết lập baseline Flutter quality | Hoàn thành | CI chạy formatter, analyzer, kiểm thử và coverage. |
| 2. Kết nối SonarQube Cloud | Hoàn thành | Dự án `Planthor_planthor-ios-application` nhận phân tích LCOV bằng `SONAR_TOKEN`. |
| 3. Phân tích khi push lên nhánh bảo vệ | Hoàn thành | Push lên `main` chạy quality checks, sau đó chạy SonarQube. |
| 4. Khắc phục phát hiện TLS nghiêm trọng | Hoàn thành | Đã merge qua PR `#17`; mọi HTTPS call dùng xác thực chứng chỉ chuẩn. |
| 5. Xác nhận quality gate xanh | Đang thực hiện | Sửa lỗi `sonar-scanner` exit code 3 trên `main` và xác nhận quality gate SonarQube đạt. |
| 6. Bắt buộc kiểm tra khi merge | Tiếp theo | Thêm **SonarQube analysis** vào required GitHub branch checks. |

## Quy tắc Vận hành

- Chỉ lưu `SONAR_TOKEN` dưới dạng GitHub Actions repository secret; không commit token.
- Loại trừ tệp Dart sinh tự động `*.g.dart` khỏi chỉ số source và coverage của SonarQube.
- Không bỏ qua xác thực TLS bằng `badCertificateCallback`. Local development mặc định dùng HTTP; endpoint HTTPS local tùy chỉnh cần chứng chỉ được simulator hoặc thiết bị tin cậy.
- Pull request từ fork bỏ qua job SonarQube vì GitHub không cung cấp repository secret cho workflow của fork.

## Lệnh Xác minh

Chạy các lệnh sau trong `planthor-ios-application` trước khi mở pull request:

```bash
flutter analyze --fatal-infos --fatal-warnings
flutter test --no-pub
scripts/ci/check_coverage.sh
```
