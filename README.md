# TimeLogger

Visma E-Commerce time logger task.

## Summary of Architectural Decisions

1. Use NX for scaffolding the application.
   - NX is a great tool for scaling a repo to include multiple teams as it allows to run, build and test different parts of the repo independently.
   - NX comes with strict TypeScript config, decent lint rules and emotion css.
   - The workspace is configured as a modern Vite app with Vitest test runner. Webpack would be a safer choice, but I wanted to try out the Vite stack some time, and I think its ready for production.
1. Install ChakraUI component library.
   - ChakraUI has a great developer experience and flexible theming capabilities.
   - Having a component library helps me develop faster and makes the app more consistent.

# Getting Started

`npm install`

## Development server

- Run `npx nx serve` for a dev server
- Navigate to http://localhost:4200/.
- The app will automatically reload if you change any of the source files.

## Test runner

- Unit tests: `npx nx test`
- Linter: `npx nx lint`

## Production build

- Run `npx nx build`

## Understand this workspace

Run `npx nx graph` to see a diagram of the dependencies of the projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
