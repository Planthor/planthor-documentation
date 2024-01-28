# Planthor flow and Infrastructure flow

## Gitflow
CI/CD Pipeline.
Reffer: [link]('https://creately.com/diagram/example/c5JMedWsSpq/ci/cd-pipeline-example')

 ![Alt text here](./image/planthor.jpeg)
## Microservice deployment architecture
Reffer: [link]('https://techdozo.dev/deploying-a-restful-spring-boot-microservice-on-kubernetes/')

![Alt text here](./image/planthor-Archietech.jpg)


## USER flowchart
```mermaid
flowchart LR
  direction LR
  subgraph PLANTHOR
    subgraph UI
        Planthor_frontend
    end
    subgraph IDP
        direction LR
        Oauth --> user_db(Postgresql)
    end
    UI -- Verify --> IDP
    subgraph BE
      direction LR 
      Planthor_backend --> planthor_be_db(NoSQL)
    end
    direction LR
    UI --> BE
    IDP -- Login --> BE
  end
  
  USER --> PLANTHOR 
  
```

## Authorization Code Flow with Proof Key for Code Exchange (PKCE)
```mermaid
sequenceDiagram
    User->>Frontend (Client): Initiate login
    Frontend (Client)->>Frontend (Client): Generate Code Verifier and Code Challenge
    Frontend (Client)->>Planthor Identity Server: Authorization Code Request + Code Challenge
    Planthor Identity Server-->>User: Redirect to the login page (login/authorization prompt)
    User-->>Planthor Identity Server: Authenticate and Consent
    Planthor Identity Server-->>Frontend (Client): Authorization code
    Frontend (Client)->>Planthor Identity Server: Token request + Code Verifier to /oauth/token
    Planthor Identity Server->>Planthor Identity Server: Validate Code Verifier and Challenge
    Planthor Identity Server->>Frontend (Client): Access token and ID token
    Frontend (Client)->>Planthor Resource Server: Access protected resource with Access token
    Planthor Resource Server-->>Frontend (Client): Protected resource
```
