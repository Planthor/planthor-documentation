---
title: C4 Architecture
sidebar_label: C4 Architecture
sidebar_position: 5
---

# Software System (Context)

```pumld
@startuml Planthor_Context
skinparam linetype ortho
!NEW_C4_STYLE=1
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

SHOW_PERSON_OUTLINE()

Person(customer, "Customer")
Person(admin, "Admin")

System(planthorSystem, "Planthor System", "Allow customers to set goals and view progress")

System_Ext(strava, "Strava")
System_Ext(github, "Github")

Rel(customer, planthorSystem, "Uses")
Rel(admin, planthorSystem, "Uses")
Rel(planthorSystem, strava, "Integrate", "Subscribe")
Rel(planthorSystem, github, "Integrate", "Subscribe")

SHOW_LEGEND()
@enduml
```

# Container

```pumld
@startuml Planthor_Container
skinparam linetype ortho
!NEW_C4_STYLE=1
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

SHOW_PERSON_OUTLINE()

Person(customer, "Customer")
Person(admin, "Admin")

Boundary(b, "Planthor") {
    Container(webApp, "Planthor Web App", "Set goals and view progress from browser")
    Container(mobileApp, "Planthor iOS App", "Set goals and view progress from iOS device")
    Container(backEnd, "Planthor Backend", "Manage resources in Planthor")
    Container(idp, "Planthor IDP", "[Keyclk.]Manage user, SSO")
    Container(adminPortal, "Admin Portal", "(future) Manage client app activities")
    ContainerDb(planthorDb, "Planthor DB")
    Rel(webApp, idp, "Auth")
    Rel(webApp, backEnd, "Request", "HTTP")
    Rel(mobileApp, idp, "Auth")
    Rel(mobileApp, backEnd, "Request", "HTTP")
    Rel(backEnd, idp, "Auth")
    Rel(backEnd, planthorDb, "Read/Write")
    Rel(adminPortal, planthorDb, "Read/Write")
    Rel(adminPortal, idp, "Auth")
}

System_Ext(strava, "Strava")
System_Ext(github, "Github")

Rel(customer, webApp, "Uses")
Rel(customer, mobileApp, "Uses")
Rel(admin, idp, "Uses")
Rel(admin, adminPortal, "Uses")
Rel(backEnd, strava, "Intg./Subs", "Webhook")
Rel(backEnd, github, "Intg./Subs", "Webhook")

SHOW_LEGEND()
@enduml
```

# Component

## Planthor Backend

```pumld
@startuml Planthor_Component_Backend
skinparam linetype ortho
!NEW_C4_STYLE=1
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml

Boundary(b, "Planthor") {
    Container(webApp, "Planthor Web App")
    Container(mobileApp, "Planthor iOS App")
    Container(idp, "Planthor IDP", "Keycloak")

    Container_Boundary(backend, "Backend"){
        Component(resourceAPI, "Resource API")
        Component(githubAdapter, "Github Adapter")
        Component(stravaAdapter, "Strava Adapter")
        Rel(resourceAPI, githubAdapter, "Connect")
        Rel(resourceAPI, stravaAdapter, "Connect")
    }

    ContainerDb(planthorResourceDb, "Resource Db", "MongoDb")
    ContainerDb(githubAdptDb, "Github Adpt. Db", "MongoDb")
    ContainerDb(stravaAdptDb, "Strava Adpt. Db", "MongoDb")

    Rel(webApp, resourceAPI, "Request", "HTTP")
    Rel(mobileApp, resourceAPI, "Request", "HTTP")
    Rel(resourceAPI, idp, "Auth")
    Rel(resourceAPI, planthorResourceDb, "Read/Write", "NoSQL")
    Rel(githubAdapter, githubAdptDb, "Read/Write", "NoSQL")
    Rel(stravaAdapter, stravaAdptDb, "Read/Write", "NoSQL")
}

System_Ext(strava, "Strava")
System_Ext(github, "Github")

Rel(stravaAdapter, strava, "Intg./Subs", "Webhook")
Rel(githubAdapter, github, "Intg./Subs", "Webhook")

SHOW_LEGEND()
@enduml
```
