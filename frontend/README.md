# Segmint Frontend

React-based frontend for the Segmint application, built with Vite, React, TypeScript, and Shadcn UI components.

## Features

- **Content Studio**: Create and manage content for various platforms
- **Persona Management**: Create and manage professional personas
- **User Authentication**: Sign up, sign in, and user management
- **Settings Management**: Configure application settings
- **Responsive Design**: Built with modern UI components for all devices

## Development

### Prerequisites

- Node.js (LTS version recommended)
- npm or Yarn package manager

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd segmint/frontend

# Install dependencies
npm install
# or with yarn
yarn install
```

### Environment Variables

Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:8000
```

### Run Development Server

```bash
# Start the development server
npm run dev
# or with yarn
yarn dev
```

The application will be available at <http://localhost:5173>

### Build for Production

```bash
# Build the application
npm run build
# or with yarn
yarn build

# Preview the production build locally
npm run preview
# or with yarn
yarn preview
```

## Project Structure

```
frontend/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable UI components
│   │   ├── content/  # Content Studio components
│   │   ├── persona/  # Persona components
│   │   ├── ui/       # Shadcn UI components
│   │   └── ...
│   ├── contexts/     # React contexts
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility libraries
│   ├── pages/        # Application pages
│   │   ├── ContentStudio.tsx
│   │   ├── Index.tsx
│   │   ├── Personas.tsx
│   │   ├── Settings.tsx
│   │   └── ...
│   ├── services/     # API service layers
│   ├── types/        # TypeScript type definitions
│   ├── utils/        # Utility functions
│   ├── App.tsx       # Main application component
│   └── main.tsx      # Application entry point
├── .env              # Environment variables
├── package.json      # Project dependencies and scripts
├── tailwind.config.ts # Tailwind CSS configuration
└── vite.config.ts    # Vite configuration
```

## Technologies

- **React**: Frontend UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and development server
- **React Router**: Page routing
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Component library built on Radix UI
- **Tanstack Query**: Data fetching and state management
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **Framer Motion**: Animation library
- **Recharts**: Charting library

## Integration with Backend

The frontend communicates with the Segmint backend API. Make sure the backend server is running before starting the frontend development server. See the backend README for setup instructions.

## Browser Support

The application is designed to work with modern browsers, including:

- Chrome
- Firefox
- Safari
- Edge

## Contributing

1. Make sure your code follows the project's coding standards
2. Write clear commit messages
3. Test your changes thoroughly before submitting a pull request
