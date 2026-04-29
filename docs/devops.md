---
title: DevOps
sidebar_label: DevOps
sidebar_position: 11
---

## 1. Organization Structure (The Planthor Monorepo)

Planthor follows a multi-repo strategy organized into functional domains. The "Central Wiki" (this documentation) acts as the source of truth for all architectural decisions.

``` mermaid
graph TD
    %% Global Styling
    classDef default fill:#1e1e1e,stroke:#333,color:#fff,font-family:sans-serif;
    
    %% Org Config Section
    subgraph ORG_CONFIG ["ORG CONFIG"]
        direction LR
        config1[".github<br/><small>PR Templates, CodeOwners</small>"]
        config2["planthor-documentation<br/><small>Architecture & Wiki</small>"]
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
    subgraph PLATFORM ["PLATFORM"]
        direction LR
        p1["planthor-idp<br/><small>Keycloak Docker Config</small>"]
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

## 2. Production Infrastructure (Scaling Phases)

To balance cost and stability, Planthor follows a multi-phase scaling strategy. We start with the **Seed Phase** to achieve a $14/mo production environment.

### Phase 1: Seed Phase (Current)
*   **Compute:** Single `e2-small` VM (2GB RAM) running **Docker Compose**.
*   **Auth Stack:** Keycloak + Postgres + Nginx (all in Docker).
*   **Logic Stack:** **Cloud Run** (.NET 10) scaling to zero.
*   **Data Stack:** **Firestore** (Serverless NoSQL).

### Phase 2: Growth Phase (Future)
*   **Database:** Migrate to **Cloud SQL (PostgreSQL)** for managed backups.
*   **Cache:** Introduce **Cloud Memorystore (Redis)** for session performance.

---

## 3. Infrastructure Diagram (Seed Phase)

```mermaid
flowchart TB
    subgraph Users ["EXTERNAL ACCESS"]
        User(["USER (MOBILE/WEB)"])
    end

    subgraph GCP ["GOOGLE CLOUD PLATFORM"]
        direction TB

        subgraph VM_HOST ["SEED AUTH VM (PHASE 1)"]
            direction TB
            subgraph Docker_Network ["Docker Bridge Network"]
                Nginx["Nginx + SSL"]
                KC["Keycloak Container"]
                DB_LOCAL[("Postgres Container")]
                Nginx --- KC --- DB_LOCAL
            end
        end

        subgraph APP_TIER ["SERVERLESS LOGIC TIER"]
            CR["CLOUD RUN (.NET 10)"]
            FB["FIREBASE HOSTING"]
        end

        subgraph DATA_TIER ["MANAGED DATA TIER"]
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

## 4. Monthly Cost Estimate

| PHASE | COMPONENTS | MONTHLY COST |
| :--- | :--- | :--- |
| **PHASE 1 (Seed)** | `e2-small` VM + Cloud Run + Firestore | **~$14.00** |
| **PHASE 2 (Growth)** | VM + Cloud SQL + Cloud Run | **~$25.00** |
| **PHASE 3 (Scale)** | HA Cluster + Load Balancer + WAF | **$60.00+** |

---

## 5. Docker Optimization (e2-small)

Because the `e2-small` VM only has **2GB of RAM**, Docker containers must be strictly constrained.

### Resource Limits
In `docker-compose.yml`, always define limits to prevent a single container from crashing the VM:
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

### Logging Optimization
To prevent disk saturation on the small VM, use the `json-file` driver with rotation:
```yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

---

## 6. CI/CD & Deployment Flow

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

## 7. Monitoring & Health

1.  **Liveness Check:** `https://auth.planthor.com/health/live` (Monitored by UptimeRobot).
2.  **Resource Check:** SSH to VM and run `docker stats` weekly.
3.  **Logs:** **GCP Ops Agent** installed on VM to stream logs to Cloud Logging.

---

## 8. Request Flow (End-to-End)

```mermaid
sequenceDiagram
    participant U as User
    participant CR as Cloud Run (API)
    participant KC as Keycloak (VM)
    participant FS as Firestore

    U->>KC: 1. Login Request
    KC-->>U: 2. Identity Token (JWT)
    U->>CR: 3. Fetch Goals (with JWT)
    CR->>KC: 4. Verify Token
    CR->>FS: 5. Query Data
    FS-->>CR: 6. Resource Data
    CR-->>U: 7. JSON Response
```
