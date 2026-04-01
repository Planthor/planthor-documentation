---
title: DevOps
sidebar_label: DevOps
sidebar_position: 11
---

## Structure of ORG

``` mermaid
graph TD
    %% Global Styling
    classDef default fill:#1e1e1e,stroke:#333,color:#fff,font-family:sans-serif;
    
    %% Org Config Section
    subgraph ORG_CONFIG ["ORG CONFIG"]
        direction LR
        config1[".github<br/><small>Issue templates, PR templates, CODEOWNERS</small><br/><b>Config</b>"]
        config2["planthor-documentation<br/><small>Central wiki — architecture diagrams, ERD, PKCE</small><br/><b>Mermaid • Docs</b>"]
    end

    %% Frontend Section
    subgraph FRONTEND ["FRONTEND"]
        direction LR
        fe1["PlanthorWebApp<br/><small>Browser app — goal dashboard, tribe views</small><br/><b>Svelte • TypeScript</b>"]
        fe2["planthor-mobile<br/><small>Cross-platform mobile — Android + iOS</small><br/><b>Flutter • Dart</b>"]
    end

    %% Backend Section
    subgraph BACKEND ["BACKEND"]
        be1["PlanthorWebApi<br/><small>Main resource server — Clean Arch + DDD + CQRS</small><br/><b>.NET 8 • C# • MongoDB</b>"]
    end

    %% Platform Section
    subgraph PLATFORM ["PLATFORM"]
        direction LR
        p1["planthor-identity-server-openiddict<br/><small>Custom IDP — replaces archived Keycloak server</small><br/><b>.NET 8 • C# • PostgreSQL</b>"]
        p2["planthor-infra<br/><small>Terraform IaC, Kubernetes, Helm charts</small><br/><b>Terraform • HCL</b>"]
        p3["planthor-local-dev<br/><small>Docker Compose for full local stack</small><br/><b>Docker • Shell</b>"]
    end

    %% Archived Section
    subgraph ARCHIVED ["ARCHIVED"]
        direction LR
        old1["PlanthorIdentityServer (archived)<br/><small>Original IDP — superseded by OpenIddict</small><br/><b>C#</b>"]
        old2["Planthor_ClientBackEndWebApp (archived)<br/><small>Early monolith prototype</small><br/><b>C#</b>"]
    end

    %% Styling Classes for Categories
    style ORG_CONFIG fill:#333,stroke:#666,color:#fff
    style FRONTEND fill:#064e3b,stroke:#10b981,color:#fff
    style BACKEND fill:#1e3a8a,stroke:#3b82f6,color:#fff
    style PLATFORM fill:#4c1d95,stroke:#8b5cf6,color:#fff
    style ARCHIVED fill:#262626,stroke:#404040,color:#fff

    %% Node Styling
    class config1,config2,fe1,fe2,be1,p1,p2,p3,old1,old2 default;

```


## Infrastructure Consideration (Dirty Cheap and Best Practices)

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