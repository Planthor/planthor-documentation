---
title: Tech Stack
sidebar_label: Tech Stack
sidebar_position: 4
---

# Introduction

This page describes the technology choices powering Planthor across all layers of the system — from the device in a user's hand to the pipelines that ship the product. Each decision is made to optimize for developer velocity, cross-platform reach, and long-term maintainability.

## Front-end

### Framework — Flutter (latest stable)

Planthor targets iOS first, followed by Android, then Web — all from a single Flutter codebase.

### Why Flutter

- A single Dart codebase eliminates divergent feature timelines across platforms.

### Platform Notes

**iOS** — primary target; all new features are built and QA'd here first. TestFlight is used for internal and external beta distribution.

## Back-end

### Resource Api

#### Runtime — .NET 10

All server-side workloads run on **ASP.NET Core 10**, targeting the latest LTS-aligned release.

| Property    | Detail                                 |
| ----------- | -------------------------------------- |
| Runtime     | .NET 10                                |
| API style   | RESTful HTTP + OpenAPI 3.1 (Scalar UI) |
| Web API     | Planthor Resource API                  |
