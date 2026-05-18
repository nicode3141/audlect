![Static Badge](https://img.shields.io/badge/nextjs-%3E%3D%2015.2.3-FFC857.svg) ![Static Badge](https://img.shields.io/badge/license-MIT-428f7e.svg?logo=open%20source%20initiative&logoColor=white&labelColor=555555)

# Audlect - Vote on music with your friends!

With audlect, your guest can participate in song votes to create the perfect playlist for everyone.

### Features

Create Votes: Users can initiate song votes through Spotify search, using a songs name or url.

Voting: Users can express their preferences by liking votes created by others, influencing the overall popularity of a song.

Secure Sign-In: Utilizing Keycloak, the app ensures secure user authentication for a personalized experience.

Vote Management: Users have the ability to delete their votes, particularly those with less than two likes, to prevent fraudulent activities and maintain the integrity of the voting system.

30s Song Previews: Thanks to the use of Spotify API and its' song preview feature, you can listen votes without a spotify account

Vote Report: If a user considers that a vote does not align with the event or violates guidelines, there's an option to formally report it for review -> info@nicodenetworks.com

### Project Structure — Where things go

| Path                     | Put here                                                     |
| ------------------------ | ------------------------------------------------------------ |
| `src/app/`               | Routes & pages (Next.js file-based routing)                  |
| `src/features/<name>/`   | Everything for one business domain (components, hooks, etc.) |
| `src/components/ui/`     | Reusable UI primitives (Button, Input, Card, etc.)           |
| `src/components/layout/` | Layout shell (nav, sidebar, footer)                          |
| `src/server/db/`         | Database schema & client (Drizzle)                           |
| `src/server/api/`        | tRPC routers (API endpoints)                                 |
| `src/lib/`               | Shared pure utilities, config, auth helpers                  |
| `src/hooks/`             | Generic reusable hooks (used in 2+ features)                 |
| `src/context/`           | Global React context providers                               |
| `src/types/`             | Shared TypeScript types                                      |
| `src/styles/`            | Global CSS only                                              |
| `src/localization/`      | Error codes & string messages                                |
| `public/`                | Static assets served at `/`                                  |

**Rule of thumb:** Shared across features → `src/components/` or `src/hooks/`. Specific to one feature → `src/features/<name>/`.

### Dev Status

currently in early development

### Milestone v2.0

See Issues

### Roadmap

<b>Migrate to Next.JS:</b>

1. [x] Set up example voting
2. [x] Set up DB Structure
3. [x] From REST to tRPC
4. [x] Move to Tailwind

<b>Next Steps:</b>

1. [x] Set up Auth with Clerk
2. [x] Protected Routes
3. [ ] Voting Management
4. [ ] Home Page

<b>Include:</b>

1. [ ] Sentry for Monitoring
2. [ ] Posthog for analytics
