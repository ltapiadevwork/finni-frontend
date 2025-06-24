# Finni Health – Patient Management Dashboard

Finni Health is a modern, responsive patient management dashboard built with React, Redux Toolkit, TypeScript, and Tailwind CSS. It allows healthcare teams to efficiently manage patient records, track statuses, and streamline onboarding and care processes.

## Features

- **Patient Dashboard:**
  - View all patients in a searchable, filterable grid.
  - See patient counts by status (Inquiry, Onboarding, Active, Churned).
  - Quick search and status filter for easy navigation.
- **Add Patient:**
  - User-friendly form with validation for adding new patients.
  - Supports all key patient details: name, date of birth, address, and status.
- **Patient Details:**
  - View comprehensive patient information, including status, address, and record history.
- **State Management:**
  - Powered by Redux Toolkit for robust and scalable state handling.
- **API Integration:**
  - Connects to a RESTful backend for CRUD operations on patient data.
- **Responsive UI:**
  - Built with Tailwind CSS and shadcn/ui for a beautiful, accessible experience on all devices.
- **Testing:**
  - Includes unit and integration tests for key components using Jest and React Testing Library.

## Tech Stack

- [React 18](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd Finni
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Copy `.env` or `sample.env` to `.env` and update as needed:
     ```env
     VITE_BASE_URL=http://localhost:8000
     ```
   - This should point to your backend API base URL.

### Running the App

- **Start the development server:**
  ```bash
  npm run dev
  # or
  yarn dev
  ```
  The app will be available at [http://localhost:8080](http://localhost:8080) by default.

- **Build for production:**
  ```bash
  npm run build
  # or
  yarn build
  ```

- **Preview production build:**
  ```bash
  npm run preview
  # or
  yarn preview
  ```

### Scripts

- `dev` – Start the Vite development server
- `build` – Build the app for production
- `preview` – Preview the production build
- `test` – Run all tests
- `test:watch` – Run tests in watch mode
- `test:coverage` – Generate test coverage report
- `lint` – Run ESLint

## Environment Variables

- `VITE_BASE_URL` – The base URL for the backend API (e.g., `http://localhost:8000`)

## API Endpoints

The frontend expects a RESTful API with the following endpoints:
- `GET    /patients` – List all patients
- `POST   /patients` – Create a new patient
- `GET    /patients/:id` – Get patient details
- `PUT    /patients/:id` – Update patient
- `DELETE /patients/:id` – Delete patient

## Testing

- **Run all tests:**
  ```bash
  npm test
  # or
  yarn test
  ```
- **Test coverage:**
  ```bash
  npm run test:coverage
  # or
  yarn test:coverage
  ```

Tests are located in `src/components/__tests__/` and use Jest with React Testing Library.

## Folder Structure

- `src/components/` – UI components and patient features
- `src/pages/` – Main app pages (Dashboard, Patient Details, 404)
- `src/store/` – Redux Toolkit store and slices
- `src/services/` – API integration
- `src/types/` – TypeScript types
- `src/lib/` – Validation and utilities

