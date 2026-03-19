# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Push Serbia is a platform for supporting open-source projects with positive social impact in Serbia. Users can propose projects, vote on them, and track their progress. Built with Angular 21, SSR via Express, Firebase Authentication, and Tailwind CSS.

## Commands

- `npm start` — Dev server at http://localhost:4200
- `npm run build` — Production build (with Sentry sourcemaps)
- `npm test` — Unit tests (Karma + Jasmine)
- `npm run lint` — ESLint
- `npm run serve:build` — Serve SSR build locally

## Architecture

### Standalone Components (No NgModules)

All components are standalone with `imports` arrays. OnPush change detection is the default. Components use signal-based inputs (`input.required<T>()`).

### State Management

Signal-based stores in `src/app/core/`:
- **ProjectStoreService** — Entity map by slug, computed signals, Transfer State for SSR hydration
- **VoteStoreService** — User votes with effects that react to auth state changes

Hybrid approach: signals for state, RxJS for async operations and effects.

### API Layer

- **ApiService\<T\>** (`core/api/`) — Abstract generic base class with CRUD methods returning `PaginatedResponse<T>`
- **ApiInterceptor** — Prepends `environment.apiUrl` to relative paths
- **AuthInterceptor** — Attaches credentials, handles 401 responses
- Feature services (ProjectService, UserService, VoteService, etc.) extend ApiService

### Authentication

Firebase Authentication with custom tokens. `AuthService` manages state via both signals and observables. Token stored in cookies for SSR compatibility. Route guard: `authGuard` (CanActivateFn).

### Routing

Routes use Serbian-language paths: `projekti`, `autentikacija`, `profil`, `dokumentacija`, `placanja`, `blog`. All features are lazy-loaded via `loadComponent`/`loadChildren`.

### SSR Render Modes (`app.routes.server.ts`)

- Server-rendered: `/`, `/projekti/**`, `/blog/**`
- Client-only: `/admin/**`, `/profil`
- Prerendered: `/dokumentacija/**`, `/placanja/**`

## Code Conventions

- **Component selector prefix**: `app-` (kebab-case elements, camelCase attributes)
- **Directive selector prefix**: `app` (camelCase)
- **Prettier**: 100 char width, single quotes, semicolons, Angular HTML parser
- **File naming**: Components use flat names without `.component` suffix (e.g., `landing.ts`, `landing.html`)
- **Environments**: `src/environments/` — `environment.ts` (prod), `environment.development.ts` (localhost:3000 API)

## Key Dependencies

- **UI**: Tailwind CSS 4 + Flowbite 3
- **Rich text**: ngx-quill / Quill 2
- **Auth**: AngularFire (Firebase)
- **Monitoring**: Sentry, Google Tag Manager, Firebase Performance
- **Images**: Unsplash API integration