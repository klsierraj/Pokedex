# Pokedex Frontend

A modern, type-safe React application for browsing and exploring Pokémon data. Built with Clean Architecture principles, this frontend provides a scalable and maintainable codebase.

## 🚀 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Vitest** - Testing framework
- **MSW** - API mocking for tests

## 📁 Project Structure

The project follows **Clean Architecture** principles, organizing code into distinct layers:

```
src/
├── core/                    # Business logic (framework-independent)
│   ├── domain/              # Domain models and value objects
│   │   ├── models/          # Entity models (Pokemon, User, etc.)
│   │   └── value-objects/   # Value objects (Token, etc.)
│   └── application/         # Application layer
│       ├── ports/           # Interfaces (repositories, services)
│       └── use-cases/       # Business use cases
│
├── infra/                   # Infrastructure layer (framework-specific)
│   ├── factories/          # Dependency injection factories
│   └── http/               # HTTP repositories and DTOs
│
└── ui/                      # Presentation layer
    ├── components/          # Reusable UI components
    ├── pages/              # Page components
    ├── router/             # Routing configuration
    └── constants/          # UI constants (colors, etc.)
```

## 🏗️ Architecture Overview

### Clean Architecture Layers

1. **Domain Layer** (`core/domain`)
   - Pure business logic
   - No dependencies on external frameworks
   - Contains entities and value objects

2. **Application Layer** (`core/application`)
   - Use cases that orchestrate business logic
   - Defines ports (interfaces) for external dependencies
   - Independent of UI and infrastructure

3. **Infrastructure Layer** (`infra`)
   - Implements ports defined in the application layer
   - HTTP repositories, state management, factories
   - Framework-specific implementations

4. **Presentation Layer** (`ui`)
   - React components and pages
   - Handles user interactions
   - Uses use cases from the application layer

### Key Patterns

- **Repository Pattern**: Abstracts data access through interfaces
- **Use Case Pattern**: Encapsulates business logic in reusable units
- **Factory Pattern**: Creates and wires dependencies
- **Dependency Injection**: Loose coupling through interfaces

## 🎯 Features

- 🔐 **Authentication**: Login with JWT token management
- 📋 **Pokemon List**: Browse paginated list of Pokémon
- 🔍 **Search**: Search Pokémon by name across the entire PokeAPI database
- 📊 **Pokemon Details**: View detailed information including stats, abilities, and moves
- 🎨 **Dynamic Styling**: Background colors change based on Pokémon type
- 📱 **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- 🔄 **State Persistence**: Session state persisted in localStorage

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build
```

### Preview Production Build

```bash
# Preview the production build
npm run preview
```

### Testing

```bash
# Run tests
npm test
```

### Linting

```bash
# Run ESLint
npm run lint
```

## 🔌 API Integration

The frontend communicates with a Rails backend API. Make sure the backend is running and configured with the correct base URL in `src/http.ts`.

### Endpoints Used

- `POST /api/v1/sessions` - User authentication
- `GET /api/v1/pokemons` - List Pokémon with pagination
- `GET /api/v1/pokemons/:id` - Get Pokémon details
- `GET /api/v1/pokemons/search?name=:name` - Search Pokémon by name

## 🎨 Styling

The project uses **Tailwind CSS v4** with custom configuration:

- Custom color tokens for Pokémon types
- Responsive utilities
- Component-based styling approach

Type colors are defined in `src/ui/constants/pokemon-type-colors.ts` and can be used throughout the application.

## 📦 State Management

Authentication state is managed through `auth.ts` using **localStorage**:

- `saveSession()` - Saves session data (token, username) to localStorage
- `loadSession()` - Retrieves session from localStorage
- `clearSession()` - Removes session from localStorage
- `getToken()` - Gets the authentication token
- `isAuthenticated()` - Checks if user is authenticated

This approach is lightweight and doesn't require additional state management libraries.

## 🧪 Testing

Tests are written with **Vitest** and **React Testing Library**:

- Unit tests for use cases
- Component tests for UI
- MSW (Mock Service Worker) for API mocking

## 🚀 Deployment

The frontend is configured to be deployed on Netlify. The build output is in the `dist/` directory.

For monorepo deployment, configure Netlify with:
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/dist`

## 📝 Code Style

- TypeScript strict mode enabled
- ESLint for code quality
- Consistent naming conventions
- Clean Architecture principles enforced through folder structure

## 🤝 Contributing

When adding new features:

1. Define domain models in `core/domain`
2. Create use cases in `core/application/use-cases`
3. Implement repositories in `infra/http`
4. Create UI components in `ui/components`
5. Wire everything in factories (`infra/factories`)

This ensures separation of concerns and maintainability.
