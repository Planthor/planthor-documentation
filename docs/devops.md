---
title: DevOps
sidebar_label: DevOps
sidebar_position: 11
---


# Infrastructure Consideration (Dirty Cheap and Best Practices)

To optimize developer velocity while maintaining near-zero infrastructure costs during the development and sandbox phases of Planthor, the architecture heavily leverages serverless components and Google Cloud's Free Tier limits.

### 1. Compute & Application Hosting
* **Backend APIs:** Hosted on **Google Cloud Run**.
  * **Services:** `resourceAPI`, `githubAdapter`, `stravaAdapter`.
  * **Why:** Cloud Run natively handles intermittent webhook spikes and scales to zero. Staying within the 2 million requests/month free tier keeps API hosting costs at $0.
* **Identity Provider (Keycloak):** Hosted on **Google Compute Engine**.
  * **Specification:** 1x `e2-micro` Virtual Machine deployed in a free-tier eligible region (`us-central1`, `us-east1`, or `us-west1`).
  * **Why:** Keycloak is a heavy Java application that requires stateful sessions and suffers from severe cold-start latency on serverless containers. Running it on a free-tier VM avoids these issues while keeping compute costs at $0.

### 2. Database
* **Identity & Session Data:** **Google Cloud SQL for PostgreSQL**.
  * **Tier:** `db-f1-micro` (Shared vCPU, 0.6 GB RAM) with ~10 GB Zonal SSD.
  * **Configuration:** Single-zone (No High Availability/Failover) to prevent doubling costs.
* **Application Resources:** **MongoDB Atlas** (Free Tier).
  * **Specification:** M0 Sandbox (Shared RAM, 512 MB to 5 GB storage).
  * **Why:** Provides a managed NoSQL database for flexible goal/resource schemas at $0 cost.
* **Cost Optimization Strategy:** A Cloud Scheduler cron job can be implemented to automatically stop the Cloud SQL database during off-hours to save compute costs.


### 3. Container Storage & CI/CD
* **Registry:** **GitHub Container Registry (GHCR)**.
  * **Why:** Replaces Google Artifact Registry. By keeping the Docker images public for this open-source project, storage and bandwidth costs drop to $0. Cloud Run pulls the compiled images directly from GHCR.

### 4. Networking & Security
* **DNS Proxy & DDoS Protection:** **Cloudflare** (Free Tier).
  * **Routing:** The custom domain is routed through Cloudflare's nameservers.
  * **Keycloak Entry:** Proxied to the static external IP of the Compute Engine VM to provide enterprise-grade DDoS protection and prevent brute-force attacks on the micro-VM.
* **VPC Firewall Lockdown:**
  * **Rule 1 (Web Traffic):** All public internet traffic to the Keycloak VM on ports 80 and 443 is denied. Ingress is explicitly allowed *only* from Cloudflare's published IPv4 ranges using a network tag (`keycloak-server`).
  * **Rule 2 (SSH Access):** Public SSH (`tcp:22` from `0.0.0.0/0`) is denied. SSH ingress is strictly limited to Google's Identity-Aware Proxy (IAP) IP range (`35.235.240.0/20`).
* **Credentials Management:** **Google Secret Manager** securely injects database passwords, GitHub/Strava API keys, and Keycloak admin credentials into Cloud Run and the VM at runtime.


## 5. Organization Structure 

```mermaid
graph LR
    subgraph Public_Internet [Public Internet]
        User((Athlete))
    end

    subgraph Security_Layer [Security & DNS]
        CF[Cloudflare Proxy]
    end

    subgraph GitHub_Ecosystem [GitHub]
        Repo[Source Code]
        GHA[GitHub Actions]
        GHCR[(GHCR.io <br/> Docker Images)]
    end

    subgraph GCP_Project [Google Cloud Platform - Free Tier Focused]
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

## 6. CI/CD & Deployment Flow 


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

## 8. Request Flow

```mermaid
sequenceDiagram
    participant U as Athlete (Mobile/Web)
    participant CF as Cloudflare (DDoS Shield)
    participant BE as Planthor Backend
    participant IDP as Planthor IDP
    participant DB as Planthor DB (SQL)
    participant MDB as Resource DB (Mongo)

    Note over U, MDB: 1. Authentication Phase
    U->>CF: Open Planthor / Login
    CF->>IDP: Forward to Login UI
    IDP->>DB: Check User Credentials
    DB-->>IDP: User Valid
    IDP-->>U: Return JWT (Token)

    Note over U, MDB: 2. Data Request Phase
    U->>CF: GET /api/goals (with Token)
    CF->>BE: Validated Request
    BE->>IDP: Verify Token
    IDP-->>BE: Token Valid
    BE->>MDB: Fetch Goal Progress
    MDB-->>BE: Goal Data
    BE-->>U: Return JSON to App UI
```