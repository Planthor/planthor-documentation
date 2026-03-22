---
title: DevOps
sidebar_label: DevOps
sidebar_position: 11
---

# Cấu trúc tổ chức

![alt](https://private-user-images.githubusercontent.com/45985646/563401498-df9444e1-39dd-4474-b774-15e99c644ae0.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzQwNjYxOTgsIm5iZiI6MTc3NDA2NTg5OCwicGF0aCI6Ii80NTk4NTY0Ni81NjM0MDE0OTgtZGY5NDQ0ZTEtMzlkZC00NDc0LWI3NzQtMTVlOTljNjQ0YWUwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjAzMjElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwMzIxVDA0MDQ1OFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTVjYjM2YjE5ZDc4MTk1YzkzNzljZDA0ODU5NDY4NTMwNWRmMmYyM2M3NzJlMTIxOWUxZTg0MzkwYmU0MjRmYTcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.77q3cfloPuPBmkBxAuSn6UfiUtJT8JK65hXG78fP7fY)


# Luồng CI/CD & Triển khai

GitOps

```mermaid
graph TD
    %% Entities
    Dev([Developer])
    Registry[(GCP Artifact Registry)]
    DevDB[(GCP Dev Database)]

    %% GitHub Actions
    subgraph GitHub [GitHub Actions - App Repo]
        subgraph CI [CI Pipeline - On PR]
            PR[Create PR] --> RestoreBuild[Restore & Build]
            RestoreBuild --> Tests[Run Ephemeral Tests/Lint]
        end
        
        subgraph CD [CD Pipeline - On Merge]
            Tests -->|Merge to Main| BuildImage[Build Docker Image]
        end
    end

    %% GCP Environment
    subgraph GCP Environment
        CloudRun{Google Cloud Run}
        VPC[Direct VPC Egress / Serverless VPC Access]
    end

    %% Connections
    BuildImage -->|1. Push Image| Registry
    BuildImage -->|2. Deploy to Cloud Run| CloudRun
    Registry -.->|Pulls Image| CloudRun
    CloudRun -->|3. Routes Traffic securely via| VPC
    VPC ===|4. Connects to| DevDB

    classDef gcp fill:#e8f0fe,stroke:#4285f4,stroke-width:2px,color:#000;
    classDef git fill:#f6f8fa,stroke:#24292f,stroke-width:2px,color:#000;
    class Registry,DevDB,CloudRun,VPC gcp;
    class CI,CD,GitHub git;
```


# Cân nhắc hạ tầng (Tối ưu chi phí và Thực tiễn tốt nhất)
