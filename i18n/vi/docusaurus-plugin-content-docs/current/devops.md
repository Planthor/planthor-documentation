---
title: DevOps
sidebar_label: DevOps
sidebar_position: 11
---

## 1. Cấu trúc Tổ chức (Planthor Monorepo)

Planthor áp dụng chiến lược đa kho lưu trữ (multi-repo) được tổ chức theo các miền chức năng. "Central Wiki" (tài liệu này) đóng vai trò là nguồn sự thật duy nhất cho tất cả các quyết định kiến trúc.

``` mermaid
graph TD
    %% Global Styling
    classDef default fill:#1e1e1e,stroke:#333,color:#fff,font-family:sans-serif;
    
    %% Org Config Section
    subgraph ORG_CONFIG ["CẤU HÌNH TỔ CHỨC"]
        direction LR
        config1[".github<br/><small>PR Templates, CodeOwners</small>"]
        config2["planthor-documentation<br/><small>Kiến trúc & Wiki</small>"]
    end

    %% Frontend Section
    subgraph FRONTEND ["FRONTEND"]
        direction LR
        fe1["PlanthorWebApp<br/><small>Svelte • TypeScript</small>"]
        fe2["planthor-mobile<br/><small>Flutter • Dart</small>"]
    end

    %% Backend Section
    subgraph BACKEND ["BACKEND"]
        be1["PlanthorWebApi<br/><small>.NET 10 • Clean Arch</small>"]
    end

    %% Platform Section
    subgraph PLATFORM ["NỀN TẢNG"]
        direction LR
        p1["planthor-idp<br/><small>Cấu hình Docker Keycloak</small>"]
        p2["planthor-infra<br/><small>Terraform IaC</small>"]
        p3["planthor-local-dev<br/><small>Docker Compose Stack</small>"]
    end

    %% Styling Classes
    style ORG_CONFIG fill:#333,stroke:#666,color:#fff
    style FRONTEND fill:#064e3b,stroke:#10b981,color:#fff
    style BACKEND fill:#003366,stroke:#3399ff,color:#fff
    style PLATFORM fill:#4c1d95,stroke:#8b5cf6,color:#fff

    class config1,config2,fe1,fe2,be1,p1,p2,p3 default;
```

---

## 2. Hạ tầng Sản xuất (Các Giai đoạn Mở rộng)

Để cân bằng giữa chi phí và sự ổn định, Planthor tuân theo chiến lược mở rộng nhiều giai đoạn. Chúng tôi bắt đầu với **Giai đoạn Seed** để đạt được môi trường sản xuất chỉ với ~$14/tháng.

### Giai đoạn 1: Seed Phase (Hiện tại)
*   **Tính toán:** Một VM `e2-small` duy nhất (2GB RAM) chạy **Docker Compose**.
*   **Auth Stack:** Keycloak + Postgres + Nginx (tất cả trong Docker).
*   **Logic Stack:** **Cloud Run** (.NET 10) tự động giảm về 0 khi không sử dụng.
*   **Data Stack:** **Firestore** (NoSQL Serverless).

### Giai đoạn 2: Growth Phase (Tương lai)
*   **Cơ sở dữ liệu:** Chuyển sang **Cloud SQL (PostgreSQL)** để quản lý sao lưu tự động.
*   **Bộ nhớ đệm:** Giới thiệu **Cloud Memorystore (Redis)** để tối ưu hiệu suất phiên làm việc.

---

## 3. Sơ đồ Hạ tầng (Giai đoạn Seed)

```mermaid
flowchart TB
    subgraph Users ["TRUY CẬP BÊN NGOÀI"]
        User(["NGƯỜI DÙNG (MOBILE/WEB)"])
    end

    subgraph GCP ["GOOGLE CLOUD PLATFORM"]
        direction TB

        subgraph VM_HOST ["SEED AUTH VM (GIAI ĐOẠN 1)"]
            direction TB
            subgraph Docker_Network ["Mạng Nội bộ Docker"]
                Nginx["Nginx + SSL"]
                KC["Keycloak Container"]
                DB_LOCAL[("Postgres Container")]
                Nginx --- KC --- DB_LOCAL
            end
        end

        subgraph APP_TIER ["TẦNG LOGIC SERVERLESS"]
            CR["CLOUD RUN (.NET 10)"]
            FB["FIREBASE HOSTING"]
        end

        subgraph DATA_TIER ["TẦNG DỮ LIỆU ĐƯỢC QUẢN LÝ"]
            direction LR
            FS[("FIRESTORE\nNOSQL")]
            GCS[("CLOUD STORAGE")]
        end
    end

    %% Connections
    User -->|HTTPS| FB
    User -->|HTTPS| Nginx
    User -->|HTTPS| CR
    
    CR <-->|OIDC| KC
    CR --> FS
    CR --> GCS

    %% Styling
    style GCP fill:#f4f4f4,stroke:#003366,stroke-width:2px
    style VM_HOST fill:#001a33,color:#fff,stroke:#3399ff
    style CR fill:#003366,color:#fff,stroke:#3399ff
    style DB_LOCAL fill:#3399ff,color:#000
    style FS fill:#001a33,color:#fff,stroke:#3399ff
```

---

## 4. Ước tính Chi phí Hàng tháng

| GIAI ĐOẠN | CÁC THÀNH PHẦN | CHI PHÍ ƯỚC TÍNH |
| :--- | :--- | :--- |
| **GIAI ĐOẠN 1 (Seed)** | VM `e2-small` + Cloud Run + Firestore | **~$14.00** |
| **GIAI ĐOẠN 2 (Growth)** | VM + Cloud SQL + Cloud Run | **~$25.00** |
| **GIAI ĐOẠN 3 (Scale)** | HA Cluster + Load Balancer + WAF | **$60.00+** |

---

## 5. Tối ưu hóa Docker (e2-small)

Vì máy ảo `e2-small` chỉ có **2GB RAM**, các container Docker phải được giới hạn nghiêm ngặt.

### Giới hạn Tài nguyên
Trong `docker-compose.yml`, luôn xác định giới hạn để ngăn một container làm treo toàn bộ VM:
```yaml
services:
  keycloak:
    deploy:
      resources:
        limits:
          memory: 1200M
        reservations:
          memory: 800M
  postgres:
    deploy:
      resources:
        limits:
          memory: 400M
```

### Tối ưu hóa Nhật ký (Logging)
Để ngăn chặn việc đầy ổ cứng trên VM nhỏ, hãy sử dụng driver `json-file` với tính năng xoay vòng (rotation):
```yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

---

## 6. Luồng CI/CD & Triển khai

```mermaid
graph TD
    Dev([Developer]) -->|Merge to Main| GHA[GitHub Actions]
    
    subgraph GitHub_Actions [CI/CD Pipeline]
        Build[Build Docker Image]
        Test[Unit & Integration Tests]
        Push[Push to GHCR.io]
        Deploy[Trigger Cloud Run Deploy]
        Build --> Test --> Push --> Deploy
    end

    Deploy --> CR[Cloud Run]
    GHCR[(GHCR.io)] <.-> CR
```

---

## 7. Giám sát & Sức khỏe

1.  **Kiểm tra Liveness:** `https://auth.planthor.com/health/live` (Được giám sát bởi UptimeRobot).
2.  **Kiểm tra Tài nguyên:** SSH vào VM và chạy `docker stats` hàng tuần.
3.  **Nhật ký:** Cài đặt **GCP Ops Agent** trên VM để truyền nhật ký về Cloud Logging.

---

## 8. Luồng Yêu cầu (Đầu-cuối)

```mermaid
sequenceDiagram
    participant U as Người dùng
    participant CR as Cloud Run (API)
    participant KC as Keycloak (VM)
    participant FS as Firestore

    U->>KC: 1. Yêu cầu Đăng nhập
    KC-->>U: 2. Identity Token (JWT)
    U->>CR: 3. Lấy Mục tiêu (với JWT)
    CR->>KC: 4. Xác minh Token
    CR->>FS: 5. Truy vấn Dữ liệu
    FS-->>CR: 6. Dữ liệu Tài nguyên
    CR-->>U: 7. Phản hồi JSON
```
