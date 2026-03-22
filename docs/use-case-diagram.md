---
title: Use Case Diagram
sidebar_label: Use Case Diagram
sidebar_position: 7
---

# Use Case Diagram

```pumld
@startuml
left to right direction

actor User as User

rectangle "Planthor Web App" {
  (View Home Page) as ViewHomePage
  (Sign in) as SignIn
  (Remember me) as RememberMe
  (Sign in with Facebook) as SignInWithFacebook
  (Forgot your password) as ForgotYourPassword
  (Manage My Goals) as ManageMyGoals
  (View My Goals) as ViewMyGoals
  (Create My Goal) as CreateMyGoal
  (Update My Goal) as UpdateMyGoal
  (Remove My Goal) as RemoveMyGoal
  (View People Top 3/All Goals in Feed) as ViewPeopleGoalsInFeed
  (Like People Goals in Feed) as LikePeopleGoalsInFeed
}

User --> SignIn
User --> RememberMe
SignIn <|-- SignInWithFacebook
User --> ViewHomePage
User --> ForgotYourPassword
User --> ManageMyGoals
ManageMyGoals <|-- ViewMyGoals
ManageMyGoals <|-- CreateMyGoal
ManageMyGoals <|-- UpdateMyGoal
ManageMyGoals <|-- RemoveMyGoal
User --> ViewPeopleGoalsInFeed
User --> LikePeopleGoalsInFeed

@enduml
```
