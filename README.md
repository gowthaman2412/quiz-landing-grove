# Online Assessment Platform

## Description

This project is an online assessment platform built with Vite, React, TypeScript, and Shadcn UI. It allows users to take timed quizzes with features like proctoring (via face detection) and comprehensive instruction sets. The platform is designed to provide a secure and user-friendly environment for online testing.

## Features

- Timed quizzes: Each question in the assessment can be timed.
- Proctoring: Utilizes `face-api.js` for face detection, likely for proctoring purposes to ensure academic integrity.
- Comprehensive instructions: Provides detailed general instructions and procedures for answering questions.
- User agreement: Requires users to agree to terms and conditions before starting an assessment.
- Clear navigation: Includes breadcrumbs and navigation buttons for user guidance.
- Responsive design: Built with Tailwind CSS for a responsive user interface.
- Component-based architecture: Uses React and Shadcn UI for a modular and maintainable codebase.
- State management: Employs Zustand for efficient global state management.
- Form handling and validation: Uses React Hook Form and Zod for robust form management.

## Technologies Used

- **Framework/Library:** React, Vite
- **Language:** TypeScript
- **UI:** Shadcn UI, Tailwind CSS, Radix UI
- **State Management:** Zustand
- **Routing:** React Router DOM
- **Form Handling:** React Hook Form
- **Schema Validation:** Zod
- **Proctoring (Face Detection):** face-api.js
- **Linting:** ESLint
- **Package Management:** npm
- **Build Tool:** Vite

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- **Node.js**: We recommend using the latest LTS version. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: npm (Node Package Manager) is included with Node.js.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    ```
    (Replace `https://github.com/your-username/your-repository-name.git` with the actual URL of this repository)

2.  **Navigate to the project directory:**
    ```bash
    cd vite_react_shadcn_ts
    ```
    (Or the name of the directory if you cloned it differently)

3.  **Install dependencies:**
    This command will download and install all the necessary packages defined in `package.json`.
    ```bash
    npm install
    ```

### Running the Application

To start the development server, run:
```bash
npm run dev
```
This will typically start the application on `http://localhost:5173`. Open this URL in your web browser to see the application. The server will automatically reload if you make changes to the source files.

**Note on `face-api.js` models:**
The application uses `face-api.js` for face detection. The necessary models for this library are expected to be in the `public/models` directory. The `public/models/readme.txt` file likely contains instructions on where to download these models. Ensure they are correctly placed for the face detection feature to work.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run build:dev`: Builds the application in development mode.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run preview`: Serves the production build locally for preview.

## Project Structure

```
vite_react_shadcn_ts/
├── public/                   # Static assets (e.g., favicon, images, face-api models)
│   └── models/               # Models for face-api.js (ensure these are present)
├── src/
│   ├── assets/               # Static assets like images, SVGs, etc., used by components
│   ├── components/           # Reusable React components
│   │   ├── ui/               # UI components, largely from Shadcn UI (customizable)
│   │   └── (other_components).tsx # Custom components specific to the application
│   ├── hooks/                # Custom React hooks (e.g., `useFaceDetection`, `useProctoring`)
│   ├── lib/                  # Utility functions and helper modules
│   │   └── utils.ts          # General utility functions (e.g., `cn` for classnames)
│   ├── pages/                # Top-level components representing application pages/routes
│   ├── store/                # Zustand store for global state management (e.g., `quizStore`)
│   ├── App.css               # Global CSS styles for App component
│   ├── App.tsx               # Main application component, sets up routing
│   ├── index.css             # Global stylesheets, often for Tailwind base/components/utilities
│   ├── main.tsx              # The entry point of the React application
│   └── vite-env.d.ts         # TypeScript definitions for Vite environment variables
├── .gitignore                # Specifies intentionally untracked files for Git
├── components.json           # Configuration for Shadcn UI
├── eslint.config.js          # ESLint configuration
├── index.html                # The main HTML page template for Vite
├── package-lock.json         # Records exact versions of dependencies
├── package.json              # Project metadata, dependencies, and scripts
├── postcss.config.js         # Configuration for PostCSS
├── tailwind.config.ts        # Configuration for Tailwind CSS
├── tsconfig.app.json         # TypeScript configuration specific to the application code
├── tsconfig.json             # Base TypeScript configuration for the project
├── tsconfig.node.json        # TypeScript configuration for Node.js environment (e.g., build scripts)
├── vite.config.ts            # Configuration for Vite (build tool and dev server)
└── README.md                 # Project documentation (this file)
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request.

Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License.
