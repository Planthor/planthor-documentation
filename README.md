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