# Copilot Instructions for brev.ly

## Project Overview
brev.ly is a TypeScript backend for managing shortened URLs. It supports link creation, deletion, lookup, access counting, and CSV export. The codebase is organized by domain-driven design principles, separating core logic, domain entities, and infrastructure.

## Architecture & Key Directories
- `src/core/`: Shared types, base entities, error handling, and value objects.
  - `entities/`: Base entity logic.
  - `errors/`: Error and result types (e.g., `either.ts`).
  - `value-objects/`: Value object patterns (e.g., `unique-entity-id.ts`).
- `src/domain/links/`: Main business logic for links.
  - `application/`: Use cases and repository interfaces.
    - `use-cases/`: Application logic (e.g., `create-link.ts`).
    - `repositories/`: Abstractions for persistence.
    - `errors/`: Domain-specific errors.
  - `enterprise/`: Domain entities and value objects for links.
- `src/infra/`: Infrastructure concerns (env, HTTP server).
- `test/in-memory/`: In-memory test doubles for repositories.

## Developer Workflows
- **Build:** Uses TypeScript. Build scripts are typically run via `tsc`.
- **Test:** Uses [Vitest](https://vitest.dev/). Run tests with `npx vitest` or `npm test`.
- **Debug:** Main entry is likely in `src/infra/http/server.ts`.
- **Environment:** Configured in `src/infra/env.ts`.
- **CSV Export:** Not yet implemented, but will require integration with a CDN (Amazon S3, Cloudflare R2).

## Project-Specific Patterns
- **Error Handling:** Uses `Either` pattern (`src/core/errors/either.ts`) for result types.
- **Value Objects:** All IDs and domain values use value object wrappers (see `unique-entity-id.ts`).
- **Use Cases:** Application logic is encapsulated in use-case classes (see `create-link.ts`).
- **Testing:** Tests are colocated with use cases and use in-memory repositories for isolation.
- **Validation:** Short URL format and uniqueness are validated in use cases, with errors defined in `errors/`.

## Integration Points
- **Persistence:** Abstracted via repository interfaces (`repositories/links.ts`).
- **HTTP:** Server logic in `src/infra/http/server.ts`.
- **CDN/CSV:** Planned integration for exporting links; see README for requirements.

## Examples
- To create a new use case, follow the pattern in `src/domain/links/application/use-cases/create-link.ts`.
- To add a new entity, extend base logic from `src/core/entities/entity.ts` and use value objects.
- To handle errors, return `Either<Error, Result>` from use-case methods.

## Conventions
- Prefer domain-driven design: keep business logic in domain/application layers.
- Use value objects for all domain values.
- Repository interfaces should be used for persistence, with in-memory/test implementations in `test/in-memory/`.

---
For questions or unclear patterns, review the README and core/domain files for examples.
