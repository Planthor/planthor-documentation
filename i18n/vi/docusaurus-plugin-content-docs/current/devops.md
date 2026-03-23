---
title: DevOps
sidebar_label: DevOps
sidebar_position: 11
---


# Cân nhắc Hạ tầng (Chi phí tối ưu và Thực tiễn tốt nhất)

Để tối ưu hóa tốc độ phát triển trong khi vẫn duy trì chi phí hạ tầng gần như bằng không trong giai đoạn phát triển và sandbox của Planthor, kiến trúc đã tận dụng tối đa các thành phần serverless và hạn mức Free Tier của Google Cloud.

### 1. Lưu trữ Ứng dụng & Tính toán
* **Các API Backend:** Được lưu trữ trên **Google Cloud Run**.
  * **Các dịch vụ:** `resourceAPI`, `githubAdapter`, `stravaAdapter`.
  * **Tại sao:** Cloud Run xử lý tốt các đột biến webhook không thường xuyên và có thể giảm xuống mức 0. Việc duy trì trong hạn mức miễn phí 2 triệu yêu cầu/tháng giúp chi phí lưu trữ API ở mức 0$.
* **Nhà cung cấp Danh tính (Keycloak):** Được lưu trữ trên **Google Compute Engine**.
  * **Cấu hình:** 1 máy ảo `e2-micro` triển khai tại vùng đủ điều kiện miễn phí (`us-central1`, `us-east1`, hoặc `us-west1`).
  * **Tại sao:** Keycloak là một ứng dụng Java nặng đòi hỏi các phiên làm việc có trạng thái và gặp vấn đề về độ trễ khởi động lạnh (cold-start) trên các container serverless. Việc chạy trên VM miễn phí giúp tránh các vấn đề này trong khi vẫn giữ chi phí tính toán ở mức 0$.

### 2. Cơ sở dữ liệu
* **Dữ liệu Danh tính & Phiên làm việc:** **Google Cloud SQL cho PostgreSQL**.
  * **Cấu hình:** `db-f1-micro` (vCPU dùng chung, 0.6 GB RAM) với ~10 GB Zonal SSD.
  * **Thiết lập:** Single-zone (Không có tính sẵn sàng cao/Failover) để tránh nhân đôi chi phí.
* **Tài nguyên Ứng dụng:** **MongoDB Atlas** (Hạn mức miễn phí).
  * **Cấu hình:** M0 Sandbox (RAM dùng chung, 512 MB đến 5 GB lưu trữ).
  * **Tại sao:** Cung cấp một cơ sở dữ liệu NoSQL được quản lý hoàn toàn cho các schema mục tiêu/tài nguyên linh hoạt với chi phí 0$.
* **Chiến lược Tối ưu chi phí:** Một công việc định kỳ Cloud Scheduler có thể được triển khai để tự động dừng cơ sở dữ liệu Cloud SQL trong giờ nghỉ để tiết kiệm chi phí tính toán.

### 3. Lưu trữ Container & CI/CD
* **Registry:** **GitHub Container Registry (GHCR)**.
  * **Tại sao:** Thay thế cho Google Artifact Registry. Bằng cách để các Docker image ở chế độ công khai cho dự án mã nguồn mở này, chi phí lưu trữ và băng thông giảm xuống mức 0$. Cloud Run sẽ kéo các image đã biên dịch trực tiếp từ GHCR.

### 4. Mạng & Bảo mật
* **Proxy DNS & Bảo vệ DDoS:** **Cloudflare** (Gói miễn phí).
  * **Định tuyến:** Tên miền tùy chỉnh được định tuyến qua các nameserver của Cloudflare.
  * **Keycloak Entry:** Được proxy đến IP tĩnh bên ngoài của máy ảo Compute Engine để cung cấp bảo vệ DDoS cấp doanh nghiệp và ngăn chặn các cuộc tấn công brute-force vào máy ảo micro.
* **Khóa tường lửa VPC:**
  * **Quy tắc 1 (Lưu lượng Web):** Tất cả lưu lượng internet công cộng đến VM Keycloak trên cổng 80 và 443 đều bị từ chối. Ingress chỉ được cho phép rõ ràng từ các dải IPv4 đã công bố của Cloudflare bằng cách sử dụng thẻ mạng (`keycloak-server`).
  * **Quy tắc 2 (Truy cập SSH):** SSH công cộng (`tcp:22` từ `0.0.0.0/0`) bị từ chối. Ingress SSH bị giới hạn nghiêm ngặt trong dải IP Google Identity-Aware Proxy (IAP) (`35.235.240.0/20`).
* **Quản lý Thông tin xác thực:** **Google Secret Manager** tiêm mật khẩu cơ sở dữ liệu, khóa API GitHub/Strava và thông tin xác thực quản trị Keycloak một cách an toàn vào Cloud Run và máy ảo khi chạy.


## 5. Cấu trúc Tổ chức

```mermaid
graph LR
    subgraph Public_Internet [Internet Công cộng]
        User((Vận động viên))
    end

    subgraph Security_Layer [Bảo mật & DNS]
        CF[Cloudflare Proxy]
    end

    subgraph GitHub_Ecosystem [GitHub]
        Repo[Mã nguồn]
        GHA[GitHub Actions]
        GHCR[(GHCR.io <br/> Docker Images)]
    end

    subgraph GCP_Project [Google Cloud Platform - Tập trung Free Tier]
        direction TB
        CR[Planthor Backend <br/> Cloud Run]
        CE[Planthor IDP <br/> Keycloak VM]
        DB_SQL[(Planthor DB <br/> Cloud SQL PostgreSQL)]
        DB_NOSQL[(Resource DB <br/> MongoDB Atlas)]
        GSM[Secret Manager]
    end

    %% Interactions
    User --> CF
    CF -- API Requests --> CR
    CF -- Auth/Login --> CE
    
    Repo --> GHA
    GHA -- Build & Push --> GHCR
    GHA -- Deploy Trigger --> CR
    
    CR -- Pull Image --> GHCR
    CR -- Data --> DB_NOSQL
    CE -- Session Data --> DB_SQL
    CR -- Auth --> CE
    GSM -.-> CR
    GSM -.-> CE
    
    %% Styling
    classDef gcp fill:#e8f0fe,stroke:#4285f4,stroke-width:2px;
    classDef github fill:#f6f8fa,stroke:#24292f,stroke-width:2px;
    classDef security fill:#fff4dd,stroke:#d4a017,stroke-width:2px;
    
    class CR,CE,DB_SQL,DB_NOSQL,GSM gcp;
    class Repo,GHA,GHCR github;
    class CF security;
```

## 6. Luồng CI/CD & Triển khai

```mermaid
graph TD
    %% Entities
    Dev([Developer])
    Registry[GHCR]
    PlanthorDB[(Planthor DB SQL)]
    ResourceDB[(Resource DB Mongo)]
    PlanthorIDP[(Planthor IDP VM)]

    %% GitHub Actions
    subgraph GitHub [GitHub Actions - App Repo]
        subgraph CI [CI Pipeline - On PR]
            PR[Create PR] --> RestoreBuild[Restore & Build Go Apps]
            RestoreBuild --> Tests[Run Ephemeral Tests/Lint]
        end
        
        subgraph CD [CD Pipeline - On Merge]
            Tests -->|Merge to Main| BuildImage[Build Docker Image]
        end
    end

    %% GCP Environment
    subgraph GCP Environment
        PlanthorBackend{Planthor Backend <br/> Cloud Run}
        VPC[Serverless VPC Access / Direct Egress]
    end

    %% Connections
    BuildImage -->|1. Push Public Image| Registry
    BuildImage -->|2. Trigger Deploy| PlanthorBackend
    Registry -.->|3. Pulls Image| PlanthorBackend
    PlanthorBackend -->|4. Routes Traffic securely via| VPC
    VPC ===|5. Connects to| PlanthorDB
    VPC ===|6. Connects to| ResourceDB
    PlanthorIDP ===|Connects to| PlanthorDB
    
    %% Styling
    classDef gcp fill:#e8f0fe,stroke:#4285f4,stroke-width:2px,color:#000;
    classDef git fill:#f6f8fa,stroke:#24292f,stroke-width:2px,color:#000;
    class PlanthorDB,PlanthorBackend,VPC,PlanthorIDP,ResourceDB gcp;
    class CI,CD,GitHub,Registry git;
```

## 8. Luồng Yêu cầu

```mermaid
sequenceDiagram
    participant U as Vận động viên (Mobile/Web)
    participant CF as Cloudflare (Lớp chắn DDoS)
    participant BE as Planthor Backend
    participant IDP as Planthor IDP
    participant DB as Planthor DB (SQL)
    participant MDB as Resource DB (Mongo)

    Note over U, MDB: 1. Giai đoạn Xác thực
    U->>CF: Mở Planthor / Đăng nhập
    CF->>IDP: Chuyển tiếp đến UI Đăng nhập
    IDP->>DB: Kiểm tra thông tin xác thực người dùng
    DB-->>IDP: Người dùng hợp lệ
    IDP-->>U: Trả về JWT (Token)

    Note over U, MDB: 2. Giai đoạn Yêu cầu Dữ liệu
    U->>CF: GET /api/goals (kèm Token)
    CF->>BE: Yêu cầu đã xác thực
    BE->>IDP: Xác minh Token
    IDP-->>BE: Token hợp lệ
    BE->>MDB: Lấy tiến độ mục tiêu
    MDB-->>BE: Dữ liệu mục tiêu
    BE-->>U: Trả về JSON cho App UI
```