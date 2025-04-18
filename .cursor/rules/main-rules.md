# Segmint: Personalized AI Content Engine by Incubyte

## .cursorrules Configuration

This document outlines the comprehensive coding and architectural guidelines for the AI-assisted development of Segmint, a personalized AI content engine. The rules specified herein ensure adherence to clean coding practices, domain-driven design, and clean architecture principles.

### 1. Detailed Code Architecture Rules

#### 1.1 Clean Architecture Implementation

- **Separation of Concerns**: Enforce strict separation between presentation, application, domain, and infrastructure layers. Ensure each layer has a clear role and responsibility.
- **Domain-Driven Design**: Utilize domain models representing core business logic and rules. Ensure entities, value objects, and aggregates reflect the domain accurately.
- **Feature-Based Organization**: Organize code by features rather than technical layers. Each feature directory should contain its presentation, application, and domain logic.

#### 1.2 Layered Architecture Patterns

- **Presentation Layer**: Handles UI components and user interaction.
- **Application Layer**: Manages application-specific logic such as use cases and data flow.
- **Domain Layer**: Contains domain models and business rules.
- **Infrastructure Layer**: Deals with data access and external integrations.

#### 1.3 Dependency Injection Patterns

- Use dependency injection to manage services and repositories, promoting loose coupling and testability.

#### 1.4 Interface-First Development

- Design interfaces first, ensuring all implementations adhere to the defined contracts.

#### 1.5 Pure Function Implementation

- Favor pure functions with no side effects to enhance testability and predictability.

#### 1.6 Side Effect Management

- Use React Query and custom hooks to handle side effects. Avoid side effects in render methods.

#### 1.7 Unidirectional Data Flow

- Ensure data flows in a single direction, from parent to child components, using props and context.

### 2. Comprehensive Naming Conventions

#### 2.1 Component Naming Patterns

- **Components**: Use `PascalCase` (e.g., `ContentGenerator`).
- **Instances**: Use `camelCase` (e.g., `contentGeneratorInstance`).

#### 2.2 File Naming Consistency

- Use kebab-case for filenames (e.g., `content-generator.tsx`).

#### 2.3 Variable and Function Naming

- Use `camelCase` for variables and functions (e.g., `generateContent()`).

#### 2.4 Interface and Type Naming

- Prefix interfaces with `I` (e.g., `IContentGenerator`).
- Types should be in `PascalCase` (e.g., `ContentType`).

#### 2.5 Custom Hook Naming Patterns

- Prefix custom hooks with `use` (e.g., `useContentGenerator`).

#### 2.6 Constant and Enum Naming

- Use `UPPER_CASE` for constants (e.g., `MAX_CONTENT_LENGTH`).
- Use `PascalCase` for enums (e.g., `ContentStatus`).

#### 2.7 CSS Class Naming

- Follow Tailwind CSS conventions (e.g., `bg-blue-500`).

#### 2.8 Event Handler Naming

- Prefix with `handle` (e.g., `handleContentSubmission`).

#### 2.9 Import Statement Organization

- Group imports by libraries, followed by components, then utilities.

### 3. Advanced File Structure Organization

#### 3.1 Directory Structure Breakdown

- Root
  - /src
    - /components
    - /features
    - /hooks
    - /utils
    - /services
    - /styles
    - /types
    - /config
    - /tests
    - /api
    - /assets
    - /docs

#### 3.2 Module Organization Strategies

- Group by feature with a dedicated directory containing components, hooks, styles, and tests.

#### 3.3 Shared Utility Organization

- Store shared utilities in `/utils` and ensure they are reusable across features.

#### 3.4 Test File Organization

- Co-locate test files with implementation files using the `.test.tsx` suffix.

#### 3.5 Configuration File Placement

- Store configuration files in `/config`.

#### 3.6 Public Asset Organization

- Organize public assets under `/assets` following a logical structure (e.g., `/images`, `/icons`).

#### 3.7 API Structure Guidelines

- Define API interaction layers in `/api`, structured by resource.

#### 3.8 Documentation Organization

- Place documentation in `/docs`, covering architecture, coding standards, and feature guidelines.

### 4. Sophisticated Component Patterns

#### 4.1 Atomic Design Implementation

- Organize components into atoms, molecules, organisms, templates, and pages.

#### 4.2 Component Composition Patterns

- Utilize composition over inheritance for component reuse.

#### 4.3 Higher-Order Component Guidelines

- Use HOCs sparingly for cross-cutting concerns.

#### 4.4 Render Prop Pattern Usage

- Use render props for flexible component rendering scenarios.

#### 4.5 Custom Hook Integration

- Extract stateful logic into custom hooks for reuse.

#### 4.6 Component Prop Interface Design

- Define prop types/interfaces explicitly and use TypeScript for enforcement.

#### 4.7 Compound Component Patterns

- Implement compound components for cohesive UI elements.

#### 4.8 Performance Optimization Techniques

- Memoize components using `React.memo` to prevent unnecessary re-renders.

#### 4.9 Memoization Guidelines

- Use `useCallback` and `useMemo` to memoize functions and values.

#### 4.10 Lazy Loading Implementation

- Lazy load components using `React.lazy` and `Suspense` for improved performance.

### 5. Specific Guidelines for shadcn Components

#### 5.1 Exact Import Syntax

- Import shadcn components using ES6 import syntax (e.g., `import { Button } from 'shadcn'`).

#### 5.2 Component Customization Approaches

- Extend shadcn components using Tailwind CSS for consistent styling.

#### 5.3 Theme Extension Patterns

- Enhance default themes by overriding variables and styles.

#### 5.4 Custom Variant Creation

- Create custom component variants by extending base styles and functionality.

#### 5.5 Component Composition Strategies

- Compose shadcn components with other UI elements for enhanced functionality.

#### 5.6 Accessibility Enhancement Techniques

- Ensure all shadcn components adhere to ARIA standards and are accessible by default.

#### 5.7 Animation Integration

- Use CSS animations and transitions for enhanced component interactions.

#### 5.8 Mobile Responsiveness Implementation

- Ensure shadcn components are responsive using Tailwind's responsive utilities.

#### 5.9 Dark Mode Support

- Implement dark mode using media queries and Tailwind's dark mode utilities.

#### 5.10 Form Component Integration

- Integrate shadcn form components with React Hook Form for seamless validation.

### 6. Comprehensive State Management Patterns

#### 6.1 Local State Management Guidelines

- Use `useState` and `useReducer` for local state within components.

#### 6.2 Context API Implementation Patterns

- Use Context API for global state management and avoid prop drilling.

#### 6.3 React Query State Management

- Leverage React Query for server state with efficient caching and synchronization.

#### 6.4 Form State Handling

- Manage form state using React Hook Form, ensuring clean and maintainable form logic.

#### 6.5 Server vs. Client State Separation

- Clearly separate server state (React Query) from client state (`useState`).

#### 6.6 State Persistence Strategies

- Use localStorage or sessionStorage for persisting crucial state across sessions.

#### 6.7 State Lifting Patterns

- Lift state up to the nearest common ancestor to share state between components.

#### 6.8 State Initialization Approaches

- Initialize state based on props or default values to ensure consistency.

#### 6.9 Immutability Enforcement

- Enforce immutable state updates using spread operators or libraries like Immer.

#### 6.10 State Synchronization Techniques

- Use React Query's automatic refetches for synchronizing server and client states.

### 7. Advanced API Integration Patterns

#### 7.1 Server Actions Implementation

- Implement server-side mutations using React.js API routes for complex interactions.

#### 7.2 React Query Implementation

- Utilize React Query for data fetching, caching, and automatic background updates.

#### 7.3 Custom Hook Creation

- Create custom hooks for API calls to encapsulate and reuse API logic.

#### 7.4 Error Handling and Retry Logic

- Implement robust error handling and retry logic using React Query's configuration.

#### 7.5 Loading State Management

- Manage loading states using `isLoading` flags provided by React Query.

#### 7.6 Pagination and Infinite Scrolling

- Implement pagination and infinite scrolling using React Query's pagination support.

#### 7.7 Optimistic Updates

- Apply optimistic updates for a responsive UI by predicting server responses.

#### 7.8 Cache Invalidation Strategies

- Use React Query's invalidation to refresh stale data automatically.

#### 7.9 Mutation Handling Approaches

- Handle mutations with React Query's mutation hooks for side-effect management.

#### 7.10 API Method Organization

- Organize API methods logically by resources and actions (e.g., `getUser`, `createPost`).

#### 7.11 Type Safety Enforcement

- Ensure type safety for API responses using TypeScript interfaces and types.

### 8. Sophisticated Error Handling Patterns

#### 8.1 Global Error Boundary Implementation

- Implement a global error boundary to catch and handle errors gracefully.

#### 8.2 Component-Level Error Handling

- Use try-catch blocks and error states for component-specific error handling.

#### 8.3 Form Validation Error Presentation

- Display form validation errors clearly using React Hook Form's error handling.

#### 8.4 API Error Processing

- Process and display API errors using custom error components.

#### 8.5 Error Logging Strategies

- Log errors to an external service for monitoring and debugging.

#### 8.6 Recovery Mechanisms

- Provide users with recovery options such as retries or alternative actions.

#### 8.7 User Feedback Approaches

- Use toast notifications or modals to provide immediate user feedback on errors.

#### 8.8 Graceful Degradation Implementation

- Ensure the application degrades gracefully under adverse conditions.

#### 8.9 Offline Error Handling

- Implement offline detection and queue actions for retrying when online.

#### 8.10 Detailed Error Message Guidelines

- Provide clear and actionable error messages to users.

### 9. Comprehensive Testing Requirements

#### 9.1 Component Testing Approach

- Use Jest and React Testing Library for component unit tests.

#### 9.2 Custom Hook Testing Methodology

- Test custom hooks with Jest and ensure all possible states are covered.

#### 9.3 Integration Testing Strategy

- Implement integration tests for critical workflows using tools like Cypress.

#### 9.4 End-to-End Testing Guidelines

- Conduct end-to-end tests to validate user flows and interactions.

#### 9.5 Test Fixture Management

- Use fixtures for consistent test data across test cases.

#### 9.6 Mock Implementation

- Mock API calls and external dependencies in tests using libraries like msw.

#### 9.7 Test Coverage Requirements

- Maintain a minimum of 80% test coverage across all files.

#### 9.8 Performance Testing Approach

- Use tools like Lighthouse for performance testing and optimizations.

#### 9.9 Accessibility Testing Requirements

- Conduct accessibility tests using tools like axe-core.

#### 9.10 Visual Regression Testing Strategy

- Implement visual regression testing with tools like Percy or Chromatic.

### 10. Advanced Performance Optimization Rules

#### 10.1 Tree-Shaking Optimization

- Ensure tree-shaking is configured to remove unused code efficiently.

#### 10.2 Bundle Size Monitoring

- Monitor bundle size with tools like webpack-bundle-analyzer.

#### 10.3 Code Splitting Implementation

- Implement code splitting using dynamic imports and React's lazy loading.

#### 10.4 React Memo Usage Guidelines

- Use `React.memo` for components that do not need to re-render on every state change.

#### 10.5 useCallback and useMemo Implementation

- Apply `useCallback` and `useMemo` for expensive calculations and function references.

#### 10.6 Virtualization for Large Lists

- Use virtualization libraries like `react-window` for rendering large lists efficiently.

#### 10.7 Image Optimization Techniques

- Optimize images using formats like WebP and lazy loading techniques.

#### 10.8 Font Loading Strategies

- Use font-display: swap for better font loading and performance.

#### 10.9 CSS Optimization with Tailwind

- Purge unused Tailwind classes in production builds for smaller CSS bundles.

#### 10.10 Server-Side Rendering Optimization

- Optimize server-side rendering performance by caching and minimizing data fetching.

### 11. Accessibility Compliance Requirements

#### 11.1 WCAG 2.1 AA Compliance

- Ensure all components and pages meet WCAG 2.1 AA standards for accessibility.

#### 11.2 Keyboard Navigation Support

- Implement complete keyboard navigation support for all interactive elements.

#### 11.3 Screen Reader Compatibility

- Ensure compatibility with screen readers by using semantic HTML and ARIA attributes.

#### 11.4 Color Contrast Requirements

- Maintain sufficient color contrast for readability and accessibility.

#### 11.5 Focus Management Guidelines

- Manage focus states and order logically, ensuring accessibility.

#### 11.6 ARIA Attribute Usage

- Use ARIA roles and attributes as necessary to enhance accessibility.

#### 11.7 Semantic HTML Implementation

- Use semantic HTML elements for better structure and accessibility.

#### 11.8 Reading Order Optimization

- Ensure a logical reading order for assistive technologies.

#### 11.9 Proper Heading Structure

- Maintain a proper heading hierarchy for content clarity.

#### 11.10 Skip Navigation Implementation

- Implement skip navigation links for easy content access.

### 12. Responsive Design Implementation

#### 12.1 Mobile-First Development

- Adopt a mobile-first approach, ensuring designs are responsive across all devices.

#### 12.2 Breakpoint Usage Guidelines

- Use Tailwind's responsive breakpoints to adapt components to different screen sizes.

#### 12.3 Fluid Typography Implementation

- Implement fluid typography that scales
