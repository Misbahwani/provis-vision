# ProVis - Protein Structure Visualization Portal ⚛️

## Project Overview

**ProVis (Protein Structure Visualization Portal)** is an interactive web application developed to facilitate the visualization and basic structural analysis of protein data bank (PDB) files.

This project was developed to fulfill the minor project requirement for the **M.Sc. Bioinformatics** coursework at **Jamia Millia Islamia**.

  * **Developer**: Misbah Jahan (24MBI023)
  * **Supervisor**: Prof. Mansaf Alam

The portal provides an intuitive user interface for uploading a PDB file, viewing its 3D molecular structure with various rendering styles, and instantly accessing a detailed analysis of its structural components.

-----

## Key Features

The application is divided into three main modules: a **Hero/Landing Page**, a **File Uploader**, and the **Visualization & Analysis** section.

1.  **Easy PDB File Upload (FileUploader)**:

      * Supports drag-and-drop or file browsing.
      * Accepts `.pdb` and plain `.txt` files containing PDB format data.
      * Provides user feedback using toasts for file load success or error.

2.  **3D Molecular Visualization (ProteinViewer)**:

      * Utilizes the powerful **NGL** (NGL Viewer) library for high-performance 3D rendering.
      * Offers multiple representation styles for detailed structural inspection:
          * **Cartoon** (Default)
          * **Ball & Stick**
          * **Surface**
          * **Ribbon**
      * Allows users to select and view individual **protein chains** for focused analysis.
      * Includes a **Reset View** button to quickly return to the default orientation.

3.  **Structural Analysis (ProteinAnalysis)**:

      * Provides a comprehensive summary of the loaded protein structure.
      * **Basic Information**: Displays the total count of atoms, residues, and distinct chains found in the PDB file.
      * **Secondary Structure Analysis**: Calculates and visualizes the percentage composition of the following secondary structural elements by parsing `HELIX` and `SHEET` records:
          * **α-Helix Content**
          * **β-Sheet Content**
          * **Random Coil Content**

-----

## Technology Stack

ProVis is built using modern web development technologies to ensure a fast, reactive, and scalable application.

  * **Frontend Framework**: **React** (`^18.3.1`)
  * **Language**: **TypeScript** (`^5.8.3`)
  * **Visualization Library**: **NGL** (`^2.4.0`)
  * **Routing**: **React Router DOM** (`^6.30.1`)
  * **Styling**: **Tailwind CSS** (`^3.4.17`) for utility-first design
  * **UI Components**: **Shadcn/ui** components built on **Radix UI** primitives (e.g., Button, Card, Select, Toast)
  * **Bundler**: **Vite** (`^5.4.19`) for rapid development and optimized builds

-----

## Installation and Setup

Follow these steps to set up and run the project locally for development or demonstration.

### Prerequisites

  * Node.js (LTS version recommended)
  * npm (or preferred package manager, e.g., yarn, pnpm, bun)

### Steps

1.  **Clone the repository:**

    ```bash
    git clone [Your Repository URL Here]
    cd provis-vision
    ```

2.  **Install dependencies:**
    Use npm to install the required packages:

    ```bash
    npm install
    ```

    *(Note: The project uses `react` and `ngl` as primary dependencies, among many others for UI and utilities)*.

3.  **Run the development server:**
    The project uses **Vite** for development.

    ```bash
    npm run dev
    ```

    The application will typically be accessible at `http://localhost:8080`.

4.  **Build for Production (Optional):**
    To create an optimized production build in the `dist` directory:

    ```bash
    npm run build
    ```

    This command compiles the project using Vite.

-----

## Project Structure

The core application logic and reusable UI components are organized as follows:

```
src/
├── components/
│   ├── FileUploader.tsx       # Logic for drag-and-drop/input file handling
│   ├── Header.tsx             # Main application header component
│   ├── Hero.tsx               # Landing page content and entry point
│   ├── ProteinAnalysis.tsx    # Logic for parsing PDB content and displaying results
│   ├── ProteinViewer.tsx      # Core NGL Viewer initialization and interaction logic
│   └── ui/                    # Reusable Shadcn/ui components (Button, Card, Select, etc.)
├── hooks/
│   ├── use-toast.ts           # Custom hook for managing toast notifications (Sonner)
│   └── use-mobile.tsx         # Custom hook for mobile breakpoint detection
├── lib/
│   └── utils.ts               # Utility functions (cn for Tailwind merging)
├── pages/
│   ├── Index.tsx              # Main application view with state management (File Upload/Viewer)
│   └── NotFound.tsx           # 404 Error page
├── App.tsx                    # Main component setting up context, routing, and toaster
├── index.css                  # Tailwind directives and base CSS variables (colors/gradients)
└── main.tsx                   # Root entry point for React rendering
```