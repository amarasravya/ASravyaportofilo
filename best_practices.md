# 📘 Project Best Practices

## 1. Project Purpose
A full-stack personal portfolio for Amara Sravya. The frontend (React) presents sections like About, Projects, and Contact with animations and responsive design. The backend (Node/Express) exposes REST endpoints for portfolio content and a contact form. Optional MongoDB integration can persist portfolio data.

## 2. Project Structure
- Root
  - package.json: Orchestration scripts (dev, build, start), concurrently for running frontend/backend
  - README.md, DEPLOYMENT.md: Docs for setup and deployment
  - best_practices.md: This file
  - build.js, Procfile (deployment helpers)
  - db.js, PortfolioModel.js (present but empty; see notes below)
  - node_modules/ (root)
- backend/
  - server.js: Express app bootstrap, security middleware, CORS, rate limiting, routes, health check, error handling
  - routes/
    - portfolio.js: Portfolio data endpoints; DRY section getter
    - contact.js: Contact form submission + info endpoint with rate limiting and validation
  - .env, .env.example: Environment configuration
  - package.json: Backend dependencies and scripts
  - seeder.js: Seeder entry (currently empty in repo; see notes)
- frontend/
  - package.json: CRA scripts, testing libs, gh-pages
  - src/
    - components/: React components (About.js, Projects.js, Contact.js, etc.) with per-component CSS imports
    - App.css: Global styles/utilities (container, section, grid, card, btn)

Separation of concerns
- Frontend and backend isolated in dedicated folders with their own package.json
- Backend exposes REST APIs consumed by frontend via axios
- Styling organized into global utilities and component-level CSS files

Entry points and configuration
- Backend: backend/server.js
- Frontend: CRA defaults (src/index.js, src/App.js assumed)
- Environment: backend/.env with PORT, NODE_ENV, EMAIL_*, FRONTEND_URL, MONGO_URI (if using DB)

## 3. Test Strategy
Current state
- Frontend includes @testing-library dependencies; backend has no tests configured.

Recommended strategy
- Frontend (React Testing Library + Jest)
  - Unit tests for components with user-centric queries and events (test-id only as last resort)
  - Mock API with MSW (Mock Service Worker) for stable and realistic network behavior
  - Snapshot tests for critical presentational components with motion variants
- Backend (Jest + supertest)
  - Unit tests for validators (e.g., validateContactForm)
  - Integration tests for routes: /api/portfolio, /api/contact, /api/health
  - Error path tests (validation failures, rate-limited responses)
- Coverage
  - Target 80%+ lines/branches; enforce via Jest coverageThreshold
- Structure and naming
  - Frontend: frontend/src/__tests__/**/*.test.js or co-locate Component.test.js
  - Backend: backend/tests/**/*.test.js
- Mocking guidelines
  - Mock nodemailer transport with a stub transport (e.g., nodemailer-mock or jest.fn())
  - Mock DB calls (if using Mongoose) via jest mocks; for integration, spin up an in-memory MongoDB (mongodb-memory-server)

## 4. Code Style
JavaScript and React
- Use functional components and hooks (useState/useEffect) as in current codebase
- Prefer early returns for loading/error states
- Use axios for HTTP; centralize baseURL via env (see config)
- Keep components presentational; move data fetching to hooks or container components when complexity grows
- Keep animation variants pure and colocated with the component; avoid inline new objects inside render when re-renders become costly

Naming conventions
- Files: PascalCase for components (About.js), kebab-case for CSS (Projects.css present; consistent per-folder)
- Variables and functions: camelCase; React components: PascalCase
- Routes: kebab-case URL segments; use nouns and standard REST patterns

Commenting and documentation
- Keep comments focused on “why”; avoid restating code
- Document API contracts in README or a dedicated docs/API.md (status codes, shapes)

Error and exception handling
- Centralized Express error handler (already present)
- Validate and sanitize request payloads; return explicit 4xx with actionable messages
- In React, guard rendering with optional chaining and fallback UI for missing data
- Log server errors with contextual info; avoid leaking internals to clients

Formatting and linting
- Adopt Prettier + ESLint (recommended config: eslint-config-react-app or Airbnb + Prettier)
- Add npm scripts: lint, format; enforce in CI

## 5. Common Patterns
Backend
- Security middleware: helmet, CORS with environment-specific origin, express-rate-limit
- Health check endpoint: GET /api/health
- DRY section resolver for portfolio routes: getSection(section)
- 404 and error middleware ordering at the end

Frontend
- Framer Motion variants: container and item variants for staggered animations
- Global utility classes: container, section, grid-X, card, btn; component-specific CSS per feature
- Axios data fetching within useEffect; loading/error states
- Defensive UI: placeholders for images (Project image placeholder, About image fallback)

## 6. Do's and Don'ts
Do
- Keep environment-specific config in .env (never commit secrets); mirror in .env.example
- Configure CORS using FRONTEND_URL in production
- Rate limit sensitive endpoints (contact) with stricter limits than general API
- Validate all user inputs server-side (email regex, length caps already present)
- Use async/await with try/catch; return consistent JSON shapes for success/error
- Prefer relative imports within a module boundary; keep routes thin and reusable
- For axios, set a single baseURL and interceptors for errors/timeouts
- Add loading skeletons/spinners for perceived performance

Don't
- Don’t hardcode production origins or secrets in code
- Don’t return 500 for validation errors; use 4xx with clear messages
- Don’t couple React components tightly to data shapes; handle optional fields
- Don’t block UI on large image loads; use placeholders and lazy loading
- Don’t mutate props or shared state; treat data as immutable

## 7. Tools & Dependencies
Frontend
- React, React Router (present in package), Framer Motion for animations, Axios for HTTP, React Icons, Testing Library
- Scripts: start, build, test, deploy (gh-pages)

Backend
- Express, helmet, cors, express-rate-limit, nodemailer; dotenv for env loading
- Scripts: dev (nodemon), start

Root orchestration
- concurrently for running server and client via npm run dev

Setup essentials
- Environment variables (backend/.env)
  - NODE_ENV=development|production
  - PORT=5000
  - FRONTEND_URL=http://localhost:3000
  - EMAIL_USER, EMAIL_PASS, CONTACT_EMAIL
  - MONGO_URI (only if using MongoDB)
- Run
  - npm run install-deps
  - npm run dev (concurrently runs frontend and backend)
- Build/deploy
  - Frontend: npm run build (in root script delegates to frontend)
  - GitHub Pages (frontend): uses gh-pages; ensure homepage matches repo

Configuration patterns
- CORS: use FRONTEND_URL in production; allow http://localhost:3000 in development
- Axios base URL in frontend
  - Use REACT_APP_API_URL or set proxy in frontend for local dev

## 8. Other Notes (for contributors and code generation)
Known inconsistencies to address
- Backend portfolio model
  - routes/portfolio.js imports ../models/PortfolioModel, but backend/models/PortfolioModel.js is missing
  - backend/package.json does not include mongoose (yet README mentions it). Either add Mongoose and define the model, or refactor routes to read from a static source.
- Seeder
  - backend/seeder.js is empty; README references seeding from backend/data/portfolioData.js which is not present. Provide data file and implement seeder or remove references.
- Duplicate/empty root files
  - Root db.js and PortfolioModel.js are empty; either remove or move proper implementations under backend/ (preferred path: backend/models/PortfolioModel.js, backend/config/db.js)
- Nodemailer transport
  - contact.js uses nodemailer.createTransporter which should be nodemailer.createTransport. Adjust and unit test email sending path.

Suggested structure (if enabling MongoDB)
- backend/
  - config/db.js: connect() that reads MONGO_URI and initializes connection
  - models/PortfolioModel.js: define schema with sections { personal, education, experience, skills, projects, achievements, honors }
  - data/portfolioData.js: seed data source
  - seeder.js: imports connect and data, writes to DB

API stability
- Keep JSON shapes stable; version endpoints if necessary (e.g., /api/v1/portfolio)
- Include health, readiness probes for deployment

Frontend API configuration
- If backend is on a different origin, set REACT_APP_API_URL and use axios.create({ baseURL })
- Consider an axios interceptor for errors and timeouts

Performance
- Consider React.lazy + Suspense for route-based code splitting
- Optimize images and use loading="lazy" (already used for project images)

Accessibility
- Ensure interactive elements have accessible names; keep color contrast in mind

Security
- Always validate and sanitize user inputs server-side
- Never log secrets; scrub sensitive data from logs

Release and CI
- Add simple CI to run lint, tests, and build on PRs

With these practices, contributors and tools can generate code that integrates cleanly with the project’s patterns and constraints.# 📘 Project Best Practices

## 1. Project Purpose
A full-stack personal portfolio for Amara Sravya. The frontend (React) presents sections like About, Projects, and Contact with animations and responsive design. The backend (Node/Express) exposes REST endpoints for portfolio content and a contact form. Optional MongoDB integration can persist portfolio data.

## 2. Project Structure
- Root
  - package.json: Orchestration scripts (dev, build, start), concurrently for running frontend/backend
  - README.md, DEPLOYMENT.md: Docs for setup and deployment
  - best_practices.md: This file
  - build.js, Procfile (deployment helpers)
  - db.js, PortfolioModel.js (present but empty; see notes below)
  - node_modules/ (root)
- backend/
  - server.js: Express app bootstrap, security middleware, CORS, rate limiting, routes, health check, error handling
  - routes/
    - portfolio.js: Portfolio data endpoints; DRY section getter
    - contact.js: Contact form submission + info endpoint with rate limiting and validation
  - .env, .env.example: Environment configuration
  - package.json: Backend dependencies and scripts
  - seeder.js: Seeder entry (currently empty in repo; see notes)
- frontend/
  - package.json: CRA scripts, testing libs, gh-pages
  - src/
    - components/: React components (About.js, Projects.js, Contact.js, etc.) with per-component CSS imports
    - App.css: Global styles/utilities (container, section, grid, card, btn)

Separation of concerns
- Frontend and backend isolated in dedicated folders with their own package.json
- Backend exposes REST APIs consumed by frontend via axios
- Styling organized into global utilities and component-level CSS files

Entry points and configuration
- Backend: backend/server.js
- Frontend: CRA defaults (src/index.js, src/App.js assumed)
- Environment: backend/.env with PORT, NODE_ENV, EMAIL_*, FRONTEND_URL, MONGO_URI (if using DB)

## 3. Test Strategy
Current state
- Frontend includes @testing-library dependencies; backend has no tests configured.

Recommended strategy
- Frontend (React Testing Library + Jest)
  - Unit tests for components with user-centric queries and events (test-id only as last resort)
  - Mock API with MSW (Mock Service Worker) for stable and realistic network behavior
  - Snapshot tests for critical presentational components with motion variants
- Backend (Jest + supertest)
  - Unit tests for validators (e.g., validateContactForm)
  - Integration tests for routes: /api/portfolio, /api/contact, /api/health
  - Error path tests (validation failures, rate-limited responses)
- Coverage
  - Target 80%+ lines/branches; enforce via Jest coverageThreshold
- Structure and naming
  - Frontend: frontend/src/__tests__/**/*.test.js or co-locate Component.test.js
  - Backend: backend/tests/**/*.test.js
- Mocking guidelines
  - Mock nodemailer transport with a stub transport (e.g., nodemailer-mock or jest.fn())
  - Mock DB calls (if using Mongoose) via jest mocks; for integration, spin up an in-memory MongoDB (mongodb-memory-server)

## 4. Code Style
JavaScript and React
- Use functional components and hooks (useState/useEffect) as in current codebase
- Prefer early returns for loading/error states
- Use axios for HTTP; centralize baseURL via env (see config)
- Keep components presentational; move data fetching to hooks or container components when complexity grows
- Keep animation variants pure and colocated with the component; avoid inline new objects inside render when re-renders become costly

Naming conventions
- Files: PascalCase for components (About.js), kebab-case for CSS (Projects.css present; consistent per-folder)
- Variables and functions: camelCase; React components: PascalCase
- Routes: kebab-case URL segments; use nouns and standard REST patterns

Commenting and documentation
- Keep comments focused on “why”; avoid restating code
- Document API contracts in README or a dedicated docs/API.md (status codes, shapes)

Error and exception handling
- Centralized Express error handler (already present)
- Validate and sanitize request payloads; return explicit 4xx with actionable messages
- In React, guard rendering with optional chaining and fallback UI for missing data
- Log server errors with contextual info; avoid leaking internals to clients

Formatting and linting
- Adopt Prettier + ESLint (recommended config: eslint-config-react-app or Airbnb + Prettier)
- Add npm scripts: lint, format; enforce in CI

## 5. Common Patterns
Backend
- Security middleware: helmet, CORS with environment-specific origin, express-rate-limit
- Health check endpoint: GET /api/health
- DRY section resolver for portfolio routes: getSection(section)
- 404 and error middleware ordering at the end

Frontend
- Framer Motion variants: container and item variants for staggered animations
- Global utility classes: container, section, grid-X, card, btn; component-specific CSS per feature
- Axios data fetching within useEffect; loading/error states
- Defensive UI: placeholders for images (Project image placeholder, About image fallback)

## 6. Do's and Don'ts
Do
- Keep environment-specific config in .env (never commit secrets); mirror in .env.example
- Configure CORS using FRONTEND_URL in production
- Rate limit sensitive endpoints (contact) with stricter limits than general API
- Validate all user inputs server-side (email regex, length caps already present)
- Use async/await with try/catch; return consistent JSON shapes for success/error
- Prefer relative imports within a module boundary; keep routes thin and reusable
- For axios, set a single baseURL and interceptors for errors/timeouts
- Add loading skeletons/spinners for perceived performance

Don't
- Don’t hardcode production origins or secrets in code
- Don’t return 500 for validation errors; use 4xx with clear messages
- Don’t couple React components tightly to data shapes; handle optional fields
- Don’t block UI on large image loads; use placeholders and lazy loading
- Don’t mutate props or shared state; treat data as immutable

## 7. Tools & Dependencies
Frontend
- React, React Router (present in package), Framer Motion for animations, Axios for HTTP, React Icons, Testing Library
- Scripts: start, build, test, deploy (gh-pages)

Backend
- Express, helmet, cors, express-rate-limit, nodemailer; dotenv for env loading
- Scripts: dev (nodemon), start

Root orchestration
- concurrently for running server and client via npm run dev

Setup essentials
- Environment variables (backend/.env)
  - NODE_ENV=development|production
  - PORT=5000
  - FRONTEND_URL=http://localhost:3000
  - EMAIL_USER, EMAIL_PASS, CONTACT_EMAIL
  - MONGO_URI (only if using MongoDB)
- Run
  - npm run install-deps
  - npm run dev (concurrently runs frontend and backend)
- Build/deploy
  - Frontend: npm run build (in root script delegates to frontend)
  - GitHub Pages (frontend): uses gh-pages; ensure homepage matches repo

Configuration patterns
- CORS: use FRONTEND_URL in production; allow http://localhost:3000 in development
- Axios base URL in frontend
  - Use REACT_APP_API_URL or set proxy in frontend for local dev

## 8. Other Notes (for contributors and code generation)
Known inconsistencies to address
- Backend portfolio model
  - routes/portfolio.js imports ../models/PortfolioModel, but backend/models/PortfolioModel.js is missing
  - backend/package.json does not include mongoose (yet README mentions it). Either add Mongoose and define the model, or refactor routes to read from a static source.
- Seeder
  - backend/seeder.js is empty; README references seeding from backend/data/portfolioData.js which is not present. Provide data file and implement seeder or remove references.
- Duplicate/empty root files
  - Root db.js and PortfolioModel.js are empty; either remove or move proper implementations under backend/ (preferred path: backend/models/PortfolioModel.js, backend/config/db.js)
- Nodemailer transport
  - contact.js uses nodemailer.createTransporter which should be nodemailer.createTransport. Adjust and unit test email sending path.

Suggested structure (if enabling MongoDB)
- backend/
  - config/db.js: connect() that reads MONGO_URI and initializes connection
  - models/PortfolioModel.js: define schema with sections { personal, education, experience, skills, projects, achievements, honors }
  - data/portfolioData.js: seed data source
  - seeder.js: imports connect and data, writes to DB

API stability
- Keep JSON shapes stable; version endpoints if necessary (e.g., /api/v1/portfolio)
- Include health, readiness probes for deployment

Frontend API configuration
- If backend is on a different origin, set REACT_APP_API_URL and use axios.create({ baseURL })
- Consider an axios interceptor for errors and timeouts

Performance
- Consider React.lazy + Suspense for route-based code splitting
- Optimize images and use loading="lazy" (already used for project images)

Accessibility
- Ensure interactive elements have accessible names; keep color contrast in mind

Security
- Always validate and sanitize user inputs server-side
- Never log secrets; scrub sensitive data from logs

Release and CI
- Add simple CI to run lint, tests, and build on PRs

With these practices, contributors and tools can generate code that integrates cleanly with the project’s patterns and constraints.# 📘 Project Best Practices

## 1. Project Purpose
A full-stack personal portfolio for Amara Sravya. The frontend (React) presents sections like About, Projects, and Contact with animations and responsive design. The backend (Node/Express) exposes REST endpoints for portfolio content and a contact form. Optional MongoDB integration can persist portfolio data.

## 2. Project Structure
- Root
  - package.json: Orchestration scripts (dev, build, start), concurrently for running frontend/backend
  - README.md, DEPLOYMENT.md: Docs for setup and deployment
  - best_practices.md: This file
  - build.js, Procfile (deployment helpers)
  - db.js, PortfolioModel.js (present but empty; see notes below)
  - node_modules/ (root)
- backend/
  - server.js: Express app bootstrap, security middleware, CORS, rate limiting, routes, health check, error handling
  - routes/
    - portfolio.js: Portfolio data endpoints; DRY section getter
    - contact.js: Contact form submission + info endpoint with rate limiting and validation
  - .env, .env.example: Environment configuration
  - package.json: Backend dependencies and scripts
  - seeder.js: Seeder entry (currently empty in repo; see notes)
- frontend/
  - package.json: CRA scripts, testing libs, gh-pages
  - src/
    - components/: React components (About.js, Projects.js, Contact.js, etc.) with per-component CSS imports
    - App.css: Global styles/utilities (container, section, grid, card, btn)

Separation of concerns
- Frontend and backend isolated in dedicated folders with their own package.json
- Backend exposes REST APIs consumed by frontend via axios
- Styling organized into global utilities and component-level CSS files

Entry points and configuration
- Backend: backend/server.js
- Frontend: CRA defaults (src/index.js, src/App.js assumed)
- Environment: backend/.env with PORT, NODE_ENV, EMAIL_*, FRONTEND_URL, MONGO_URI (if using DB)

## 3. Test Strategy
Current state
- Frontend includes @testing-library dependencies; backend has no tests configured.

Recommended strategy
- Frontend (React Testing Library + Jest)
  - Unit tests for components with user-centric queries and events (test-id only as last resort)
  - Mock API with MSW (Mock Service Worker) for stable and realistic network behavior
  - Snapshot tests for critical presentational components with motion variants
- Backend (Jest + supertest)
  - Unit tests for validators (e.g., validateContactForm)
  - Integration tests for routes: /api/portfolio, /api/contact, /api/health
  - Error path tests (validation failures, rate-limited responses)
- Coverage
  - Target 80%+ lines/branches; enforce via Jest coverageThreshold
- Structure and naming
  - Frontend: frontend/src/__tests__/**/*.test.js or co-locate Component.test.js
  - Backend: backend/tests/**/*.test.js
- Mocking guidelines
  - Mock nodemailer transport with a stub transport (e.g., nodemailer-mock or jest.fn())
  - Mock DB calls (if using Mongoose) via jest mocks; for integration, spin up an in-memory MongoDB (mongodb-memory-server)

## 4. Code Style
JavaScript and React
- Use functional components and hooks (useState/useEffect) as in current codebase
- Prefer early returns for loading/error states
- Use axios for HTTP; centralize baseURL via env (see config)
- Keep components presentational; move data fetching to hooks or container components when complexity grows
- Keep animation variants pure and colocated with the component; avoid inline new objects inside render when re-renders become costly

Naming conventions
- Files: PascalCase for components (About.js), kebab-case for CSS (Projects.css present; consistent per-folder)
- Variables and functions: camelCase; React components: PascalCase
- Routes: kebab-case URL segments; use nouns and standard REST patterns

Commenting and documentation
- Keep comments focused on “why”; avoid restating code
- Document API contracts in README or a dedicated docs/API.md (status codes, shapes)

Error and exception handling
- Centralized Express error handler (already present)
- Validate and sanitize request payloads; return explicit 4xx with actionable messages
- In React, guard rendering with optional chaining and fallback UI for missing data
- Log server errors with contextual info; avoid leaking internals to clients

Formatting and linting
- Adopt Prettier + ESLint (recommended config: eslint-config-react-app or Airbnb + Prettier)
- Add npm scripts: lint, format; enforce in CI

## 5. Common Patterns
Backend
- Security middleware: helmet, CORS with environment-specific origin, express-rate-limit
- Health check endpoint: GET /api/health
- DRY section resolver for portfolio routes: getSection(section)
- 404 and error middleware ordering at the end

Frontend
- Framer Motion variants: container and item variants for staggered animations
- Global utility classes: container, section, grid-X, card, btn; component-specific CSS per feature
- Axios data fetching within useEffect; loading/error states
- Defensive UI: placeholders for images (Project image placeholder, About image fallback)

## 6. Do's and Don'ts
Do
- Keep environment-specific config in .env (never commit secrets); mirror in .env.example
- Configure CORS using FRONTEND_URL in production
- Rate limit sensitive endpoints (contact) with stricter limits than general API
- Validate all user inputs server-side (email regex, length caps already present)
- Use async/await with try/catch; return consistent JSON shapes for success/error
- Prefer relative imports within a module boundary; keep routes thin and reusable
- For axios, set a single baseURL and interceptors for errors/timeouts
- Add loading skeletons/spinners for perceived performance

Don't
- Don’t hardcode production origins or secrets in code
- Don’t return 500 for validation errors; use 4xx with clear messages
- Don’t couple React components tightly to data shapes; handle optional fields
- Don’t block UI on large image loads; use placeholders and lazy loading
- Don’t mutate props or shared state; treat data as immutable

## 7. Tools & Dependencies
Frontend
- React, React Router (present in package), Framer Motion for animations, Axios for HTTP, React Icons, Testing Library
- Scripts: start, build, test, deploy (gh-pages)

Backend
- Express, helmet, cors, express-rate-limit, nodemailer; dotenv for env loading
- Scripts: dev (nodemon), start

Root orchestration
- concurrently for running server and client via npm run dev

Setup essentials
- Environment variables (backend/.env)
  - NODE_ENV=development|production
  - PORT=5000
  - FRONTEND_URL=http://localhost:3000
  - EMAIL_USER, EMAIL_PASS, CONTACT_EMAIL
  - MONGO_URI (only if using MongoDB)
- Run
  - npm run install-deps
  - npm run dev (concurrently runs frontend and backend)
- Build/deploy
  - Frontend: npm run build (in root script delegates to frontend)
  - GitHub Pages (frontend): uses gh-pages; ensure homepage matches repo

Configuration patterns
- CORS: use FRONTEND_URL in production; allow http://localhost:3000 in development
- Axios base URL in frontend
  - Use REACT_APP_API_URL or set proxy in frontend for local dev

## 8. Other Notes (for contributors and code generation)
Known inconsistencies to address
- Backend portfolio model
  - routes/portfolio.js imports ../models/PortfolioModel, but backend/models/PortfolioModel.js is missing
  - backend/package.json does not include mongoose (yet README mentions it). Either add Mongoose and define the model, or refactor routes to read from a static source.
- Seeder
  - backend/seeder.js is empty; README references seeding from backend/data/portfolioData.js which is not present. Provide data file and implement seeder or remove references.
- Duplicate/empty root files
  - Root db.js and PortfolioModel.js are empty; either remove or move proper implementations under backend/ (preferred path: backend/models/PortfolioModel.js, backend/config/db.js)
- Nodemailer transport
  - contact.js uses nodemailer.createTransporter which should be nodemailer.createTransport. Adjust and unit test email sending path.

Suggested structure (if enabling MongoDB)
- backend/
  - config/db.js: connect() that reads MONGO_URI and initializes connection
  - models/PortfolioModel.js: define schema with sections { personal, education, experience, skills, projects, achievements, honors }
  - data/portfolioData.js: seed data source
  - seeder.js: imports connect and data, writes to DB

API stability
- Keep JSON shapes stable; version endpoints if necessary (e.g., /api/v1/portfolio)
- Include health, readiness probes for deployment

Frontend API configuration
- If backend is on a different origin, set REACT_APP_API_URL and use axios.create({ baseURL })
- Consider an axios interceptor for errors and timeouts

Performance
- Consider React.lazy + Suspense for route-based code splitting
- Optimize images and use loading="lazy" (already used for project images)

Accessibility
- Ensure interactive elements have accessible names; keep color contrast in mind

Security
- Always validate and sanitize user inputs server-side
- Never log secrets; scrub sensitive data from logs

Release and CI
- Add simple CI to run lint, tests, and build on PRs

With these practices, contributors and tools can generate code that integrates cleanly with the project’s patterns and constraints.