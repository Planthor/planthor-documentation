---
title: Roadmap
sidebar_label: Roadmap
sidebar_position: 10
---

# Roadmap
 Product Roadmap: Planthor

**Prepared by:** Product Manager
**Team Capacity:** 1 Frontend Engineer (FE), 1 Backend Engineer (BE), 1 DevOps Engineer, 1 Product Owner (PO).

---

## **1. Prioritization Framework (MoSCoW)**
To maximize our lean team setup and reduce time-to-market, we apply the MoSCoW framework. Our primary goal is to validate the core user value (personal training utility) before investing in network effects (social features).

- **Must-Have (MVP):** EP01-Authentication, EP04-Setting (Strava Link), and EP02-Dashboard (Core Plan CRUD and Manual Sync).
- **Should-Have (V1.1):** EP03-Social Feed foundations (Follow graph, Feed viewing).
- **Could-Have (V1.2):** Viral Engagement loops (Kudos, Auto-sharing activity).

---

## **2. Phased Execution Roadmap**

### **Phase 1: MVP - Core Utility & Retention Engine**

**Objective:** Deliver the foundational single-player experience. Users must be able to securely authenticate, connect their tracking source (Strava), and visually manage their running plans.

**Key Features:**
- **Authentication (EP01):** Log-in by Facebook, Logout.
- **Settings & Data Integration (EP04):** Link to Strava (OAuth), Delete account (Compliance).
- **User's Dashboard (EP02):** 
  - Create / Edit running plan.
  - Delete plan.
  - View user's plans list.
  - View Plan (Plan info / progress).
  - View complete a Sport activity.
  - Manual sync Sport activity (Lean initial approach to data ingestion).


### **Phase 2: Social Discovery & Networking Foundations**

**Objective:** Transition from a single-player utility to a multiplayer community. Users can connect with others and view individual activity by directly visiting a friend's personal wall.

**Key Features:**
- **Social Network Core (EP03):** 
  - Search friend by name.
  - Follow friends.
  - View friends wall.


### **Phase 3: The Social Feed, Deep Engagement & Viral Loops**

**Objective:** Stimulate DAU through an aggregated Social Feed, frictionless social validation (Kudos), and automated sharing mechanics.

**Key Features:**
- **Social Feed & Engagement (EP03):** 
  - View friends' activities on Feed (Aggregated timeline).
  - Like - Kudos.
  - Auto Share plan progress to feed when sport session complete.
