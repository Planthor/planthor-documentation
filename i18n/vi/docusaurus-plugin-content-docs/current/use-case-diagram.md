---
title: Sơ đồ Use Case
sidebar_label: Sơ đồ Use Case
sidebar_position: 7
---

# Sơ đồ Use Case

```pumld
@startuml
left to right direction

actor "Người dùng" as User

rectangle "Ứng dụng Web Planthor" {
  (Xem Trang chủ) as ViewHomePage
  (Đăng nhập) as SignIn
  (Ghi nhớ tôi) as RememberMe
  (Đăng nhập bằng Facebook) as SignInWithFacebook
  (Quên mật khẩu) as ForgotYourPassword
  (Quản lý Mục tiêu) as ManageMyGoals
  (Xem Mục tiêu) as ViewMyGoals
  (Tạo Mục tiêu) as CreateMyGoal
  (Cập nhật Mục tiêu) as UpdateMyGoal
  (Xóa Mục tiêu) as RemoveMyGoal
  (Xem Top 3/Tất cả Mục tiêu trong Feed) as ViewPeopleGoalsInFeed
  (Thích Mục tiêu trong Feed) as LikePeopleGoalsInFeed
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
