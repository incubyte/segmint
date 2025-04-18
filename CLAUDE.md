# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Lint/Test Commands
- Build: `npm run build`
- Development: `npm run dev`
- Lint: `npm run lint`
- Type check: `npm run typecheck`
- Test: `npm test`
- Run a single test: `npm test -- -t "test name"` or `jest path/to/test/file.test.tsx`

## Code Style Guidelines
- **Architecture**: Follow Clean Architecture and Domain-Driven Design principles
- **Files**: Use kebab-case for filenames (e.g., `content-generator.tsx`)
- **Components**: Use PascalCase for components (e.g., `ContentGenerator`)
- **Variables/Functions**: Use camelCase (e.g., `generateContent()`)
- **Interfaces/Types**: Prefix interfaces with 'I' (e.g., `IContentGenerator`), types in PascalCase
- **Hooks**: Prefix with 'use' (e.g., `useContentGenerator`)
- **Constants/Enums**: UPPER_CASE for constants, PascalCase for enums
- **CSS**: Follow Tailwind CSS conventions
- **Event Handlers**: Prefix with 'handle' (e.g., `handleContentSubmission`)
- **Imports**: Group by libraries, then components, then utilities
- **Error Handling**: Use error boundaries and try-catch blocks where appropriate
- **Testing**: Maintain 80% test coverage using Jest and React Testing Library