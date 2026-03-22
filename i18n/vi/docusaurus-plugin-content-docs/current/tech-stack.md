---
title: Tech Stack
sidebar_label: Tech Stack
sidebar_position: 4
---

# Giới thiệu

Trang này mô tả các lựa chọn công nghệ vận hành Planthor trên tất cả các tầng của hệ thống — từ thiết bị trong tay người dùng đến các luồng triển khai sản phẩm. Mỗi quyết định đều được đưa ra nhằm tối ưu hóa tốc độ phát triển, khả năng tiếp cận đa nền tảng và tính bảo trì lâu dài.

## Front-end

### Khung làm việc — Flutter (phiên bản ổn định mới nhất)

Planthor hướng đến iOS trước tiên, tiếp theo là Android, sau đó là Web — tất cả từ một mã nguồn Flutter duy nhất.

### Tại sao lựa chọn Flutter

- Một mã nguồn Dart duy nhất giúp loại bỏ sự sai khác về thời gian triển khai tính năng trên các nền tảng.

### Ghi chú về Nền tảng

**iOS** — mục tiêu chính; tất cả các tính năng mới đều được xây dựng và kiểm thử chất lượng (QA) tại đây trước tiên. TestFlight được sử dụng để phân phối bản thử nghiệm nội bộ và bên ngoài.

## Back-end

### Resource Api

#### Môi trường thực thi — .NET 10

Tất cả các khối lượng công việc phía máy chủ đều chạy trên **ASP.NET Core 10**, hướng tới bản phát hành dài hạn (LTS) mới nhất.

| Thuộc tính  | Chi tiết                               |
| ----------- | -------------------------------------- |
| Runtime     | .NET 10                                |
| Phong cách API | RESTful HTTP + OpenAPI 3.1 (Scalar UI) |
| Web API     | Planthor Resource API                  |
