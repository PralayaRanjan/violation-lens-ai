# 🚦 ViolationLens AI — Automated Traffic Violation Evidence Platform

ViolationLens AI is an AI-powered traffic violation evidence platform that automates the identification, analysis, and documentation of traffic violations using Computer Vision, OCR, and rule-based reasoning.

The platform transforms raw traffic images into structured, review-ready evidence by combining image preprocessing, object detection, license plate recognition, violation reasoning, analytics, and human review workflows.

> **Live Prototype:** https://violation-lens-ai.vercel.app/

---

## 📌 Overview

ViolationLens AI demonstrates an end-to-end intelligent traffic enforcement workflow, including:

- 📊 Command Dashboard
- 🤖 AI Analysis Studio
- 🚦 Traffic Violation Detection
- 📝 Evidence Report Generation
- 👨‍⚖️ Human Review Console
- 📈 Analytics & Trends
- 🎯 Performance Evaluation
- 📷 Camera Calibration
- ⚠️ Edge Case Handling
- 🏗️ System Architecture

Unlike traditional automatic challan systems, **ViolationLens AI is designed as an AI-assisted evidence generation platform.**

The system generates explainable evidence with:

- Confidence Scores
- OCR Results
- Vehicle Metadata
- Timestamps
- AI Reasoning
- Annotated Images

Cases with low confidence are automatically routed for **Human Review** before any enforcement decision.

---

# ✨ Features

## 🚗 AI Analysis Pipeline

- Image Upload
- Image Preprocessing
- Vehicle Detection
- Rider Detection
- License Plate Detection
- OCR-based Number Plate Recognition
- Rule Engine-based Violation Classification
- Evidence Generation
- Human Review Workflow

---

## 🚨 Supported Traffic Violations

- 🪖 Helmet Non-Compliance
- 💺 Seatbelt Non-Compliance
- 👥 Triple Riding
- ↩️ Wrong-Side Driving
- ⛔ Stop-Line Violation
- 🚦 Red-Light Violation
- 🚫 Illegal Parking

---

## 🌧 Real-World Conditions Considered

The prototype is designed while considering practical road conditions including:

- Low Light
- Rain
- Motion Blur
- Shadows
- Crowded Traffic
- Poor Image Quality
- Unclear License Plates
- Partial Vehicle Occlusion

---

# 🏗 System Workflow

```text
Traffic Image
      │
      ▼
Image Preprocessing
      │
      ▼
Vehicle Detection (YOLO)
      │
      ▼
License Plate Detection
      │
      ▼
OCR
      │
      ▼
Rule Engine
      │
      ▼
Violation Classification
      │
      ▼
Evidence Generation
      │
      ▼
Human Review
      │
      ▼
Analytics & Reporting
```

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn UI

## Backend

- FastAPI
- Python
- OpenCV
- YOLO
- EasyOCR / OCR
- SQLAlchemy
- Pydantic

## AI / Computer Vision

- YOLO Object Detection
- OCR
- Image Processing
- Rule-Based Reasoning

---

# 📂 Project Structure

```
violation-lens-ai
│
├── frontend
│
├── backend
│
├── docs
│   ├── Concept_Note.pdf
│   └── Solution_Framework_Architecture_Diagram.pdf
│
├── datasets (excluded from GitHub)
│
└── README.md
```

---

# 🚀 Live Demo

### Frontend

https://violation-lens-ai.vercel.app/

---

# 📖 Project Documentation

The following project documents are included for reviewers.

## 📄 Concept Note

Please refer to:

```
docs/Concept_Note.pdf
```

This document explains:

- Problem Statement
- Objectives
- Motivation
- Proposed Solution
- Scope
- Expected Impact

---

## 🏗 Solution Framework & Architecture

Please refer to:

```
docs/Solution_Framework_Architecture_Diagram.pdf
```

This document includes:

- Overall System Architecture
- AI Pipeline
- Backend Architecture
- Frontend Workflow
- Data Flow
- Module Interaction
- Design Decisions

> **Reviewers are encouraged to go through these documents for a better understanding of the complete solution design and architecture.**

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/PralayaRanjan/violation-lens-ai.git

cd violation-lens-ai
```

---

# 💻 Frontend Setup

```bash
cd frontend

npm install
```

Create

```
.env.local
```

Example

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Run

```bash
npm run dev
```

Frontend

```
http://localhost:3000
```

---

# 🖥 Backend Setup

Open another terminal.

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Mac/Linux

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create

```
.env
```

Example

```env
APP_NAME=ViolationLens AI
APP_ENV=development

DATABASE_URL=sqlite:///./violationlens.db

STORAGE_BASE_DIR=storage

DEFAULT_YOLO_MODEL=models/yolo_model.pt

OCR_ENABLED=true
```

Run backend

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend

```
http://localhost:8000
```

Swagger API

```
http://localhost:8000/docs
```

---

# 🧪 Testing the Prototype

1. Start Backend
2. Start Frontend
3. Open AI Analysis Studio
4. Upload a traffic image
5. Configure:
   - Camera Location
   - Signal Status
   - Weather
   - Road Direction
   - OCR
   - Violation Checks
6. Run Analysis
7. Review generated evidence
8. Verify:
   - OCR Result
   - Confidence Score
   - Metadata
   - Violation Reasoning
9. Approve or Reject through Human Review Console

---

# 📊 Major Modules

- Dashboard
- AI Analysis Studio
- Violation Records
- Evidence Report
- Human Review Console
- Analytics
- Performance Evaluation
- Camera Calibration
- Edge Case Handling
- System Design

---

# 📦 Dataset

The datasets used for this project were collected from publicly available sources, including **Kaggle** and other open-source traffic and computer vision datasets.

The project utilizes datasets related to:

- Helmet / No-Helmet Detection
- Seatbelt Detection
- Triple Riding Detection
- Illegal Parking Detection
- License Plate Recognition (OCR)
- General Traffic Scene Images

> **Note:** The original datasets are **not included in this repository** because they are large (several GBs) and exceed GitHub's storage limitations.

To perform model training or retraining, download the required datasets from their respective sources (such as Kaggle) and organize them according to your preferred training pipeline.

The current repository focuses on the application, architecture, and inference workflow rather than distributing the training datasets.

---

# ⚠️ Notes

- This repository contains the complete frontend and backend implementation of the ViolationLens AI prototype.
- Large datasets and trained model weights are intentionally excluded from GitHub due to repository size limitations.
- Datasets can be downloaded separately from Kaggle and other publicly available sources for training and experimentation.
- The project can be extended by training custom models using these datasets and integrating the resulting model weights into the backend.
- The deployed prototype demonstrates the complete system workflow, architecture, and user interface for AI-assisted traffic violation analysis and evidence generation.

# 📸 Prototype Screens

The deployed prototype demonstrates:

- Dashboard
- AI Analysis
- Violation Records
- Human Review
- Analytics
- Evaluation
- Camera Calibration
- Edge Cases
- System Architecture

---

# 👨‍💻 Author

**Pralaya Ranjan**

GitHub

https://github.com/PralayaRanjan

---

## ⭐ If you found this project useful, consider giving the repository a Star.
