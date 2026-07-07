---
title: "I Developed A Students Portal With Google's Antigravity"
date: "2026-07-07"
draft: true
excerpt: ""
category: ""
tags: []
---

## Introduction

Most LMS that I have used in the past have a really bad UX for students.

I wanted to build a portal that lets students get a birds eye view of their exams, assignments, subjects and timetable quickly.

And since we are in the AI era, it's easy for developers to build and ship quickly.

### Here is what it looks like👇

![zuDsc2DQJC.gif](/images/blog/1783404452740-zuDsc2DQJC.gif)

## ✨What are the features of this Student Portal?

Managing academic life is notoriously chaotic. Between scattered lecture notes, shifting assignment deadlines, and the endless search for exam syllabuses, students often spend more time organizing their work than actually studying. This **Student Portal** is a purpose-built application designed to streamline the academic experience.

Here’s a deep dive into the pain points this app solves, its core features, and how its architecture is built to scale.

## 🎯 Pain Points & Frustrations Solved

**The "Where is that file?" Syndrome:** Students constantly lose track of lecture slides, case studies, and reading materials scattered across emails, WhatsApp groups, and generic cloud drives. The app solves this by centralizing all study materials, neatly organized by subject and session.

![firefox_AhG3CQ5fG2.gif](/images/blog/1783406994395-firefox_AhG3CQ5fG2.gif)

**Deadline Anxiety:** Keeping track of assignments, quizzes, and exams across different courses is stressful and error-prone. This app eliminates the guesswork by providing a unified, chronological dashboard of all upcoming assessments and deadlines.

![image.png](/images/blog/1783406889545-image.png)

**Disconnected Context:** Often, the syllabus or pre-read materials for an exam are disconnected from the actual exam schedule. The app links specific pre-reads, test URLs, and instructions directly to the timetable slots.

![firefox_9SP1iFpE4q.gif](/images/blog/1783406813164-firefox_9SP1iFpE4q.gif)

**Generic Tools Don't Fit:** Standard to-do apps don't understand the nuances of educational structures. This app is built specifically around terms, batches, and sections, ensuring students only see what’s relevant to their specific cohort.

## ✨ Core Features

* **Subject Hub:** A centralized repository for every enrolled subject. Students can instantly access faculty information, term details, and course-specific resources in one click.
* **Assessment & Timetable Management:** Detailed, dedicated views for exams and quizzes. It highlights crucial information such as exam instructions, physical room locations or online test links, precise timings, and required syllabus readings.
* **Assignment Tracking:** Real-time updates on assignments, complete with downloadable attachments, grading rubrics, and submission deadlines.
* **Installable App (PWA):** Built as a Progressive Web App, students can install the app directly on their iOS or Android devices for native-like performance and quick, on-the-go access.

## 🚀 Built for Scale

Whether managing a single cohort of 50 students or scaling up to an entire university campus, the app is engineered for growth.

* **Architectural Scalability (Frontend):** Built with **React** and **Vite**, the application guarantees lightning-fast load times. State management is handled by **Zustand**, ensuring the UI remains highly responsive and predictable even as the application's complexity and feature set expand.
* **Backend & Database Muscle:** Powered by **Supabase** (leveraging PostgreSQL), the backend is enterprise-ready. It can seamlessly handle thousands of concurrent users, complex relational queries, and massive amounts of file storage for course materials without breaking a sweat.
* **Hierarchical Data Model:** The underlying database schema is brilliantly designed around `terms`, `batches`, and `sections`. This multi-tiered structure means the app can effortlessly scale from a single program to managing multiple distinct departments or institutions without requiring a fundamental rewrite.

## ❓Why did I build it?

Currently, I am pursuing a Master's degree in Management Studies from a business school in India. The B school uses an LMS that looks like it was made in the nineties. It has a terrible UX.

*Almost every student in my batch hates it!*

Having invested a good amount of money into this program, students wanted a better experience.

So I listened to the several pain points, outlined my own frustrations and built this portal in less than a week with **Google's Antigravity IDE**.

All my classmates like the new portal.

They find it 100x better than the LMS that the business school has paid a hefty amount for.

It's crazy how we can now create something better than a big shot startup hiring hundreds of employees and investing a great deal of money into something so pathetic.

I literally made this entire portal in **1 weekend**.

2 to 3 days.

That's all!

## Why I chose Google Antigravity IDE?

We are in the AI era.

Although I don't really work as a software engineer anymore, I have had a considerable amount of experience with coding. However, building a portal like this, *without Antigravity IDE,* would have easily taken me at least 30 days.

And if you mix in the typical corporate hierarchy and the long chain of commands, it would have taken even longer to ship something like this.

Antigravity enables engineers with a product mindset to develop things of their own in less time and with less engineering effort.

## The one thing that I am concerned about

Security.

Antigravity doesn't help me find vulnerabilities in my application.

Although, there are multiple safeguards that I had to explain and prompt my way through into the app, there may still be vulnerabilities that attackers could exploit.

I am already in touch with a few cybersecurity experts in our batch who are helping me out in this area.

