# PRISM

PRISM is a mindful sharing assistant. It checks text and images for sensitive details, gives the user a moment to pause, and offers a clear next action before content is shared.

## Product Flow

The primary flow is:

1. Choose **Check**.
2. Paste text or upload an image.
3. Select the destination and ownership context.
4. Review detected signals and recommendations.
5. Protect the image or continue intentionally.

The app can be used as a guest. An account is optional and currently exists only for the in-memory session profile, dashboard history, and practice progress.

## Requirements

- Node.js 18 or newer
- npm

## Local Development

Install dependencies:

```bash
npm install
```

Run the frontend only:

```bash
npm run dev
```

Run the API only:

```bash
npm run server
```

Run both together:

```bash
npm run dev:full
```

The frontend runs at `http://localhost:5173` and the API runs at `http://localhost:3001`.

Vite proxies local `/api` requests to the Express server. The backend keeps uploaded image data in memory and removes it after the action or its short TTL expires.

## Useful Commands

```bash
npm run build          # Create a production frontend build
npm run preview        # Preview the production build locally
npm run lint           # Run the repository ESLint configuration
node api/tests/test_scan.js  # Run backend scan tests
npx eslint src         # Lint the frontend source
```

## API

### `GET /api/health`

Returns the service status.

### `GET /api/config`

Returns destinations and ownership options used by the context-selection flow. The source of truth is [`api/data/app_config.json`](api/data/app_config.json).

### `POST /api/scan`

Accepts `multipart/form-data`:

- `text`: optional text to analyze
- `image`: optional image file, maximum 10 MB
- `destination`: configured destination value such as `social_media`, `private_chat`, `school`, or `public`

The response includes the scan ID, flags, risk signals, triggered modules, sanitized text, and recommended action.

### `POST /api/action`

Accepts JSON:

```json
{
  "scan_id": "scan-id-from-api-scan",
  "action": "protect"
}
```

Supported actions are `protect` and `continue`.

## Backend Configuration

Destination modules, ownership choices, and report labels are configured in [`api/data/app_config.json`](api/data/app_config.json). Updating that file changes the API response and the context-selection UI without duplicating the options in React.

The scan pipeline currently includes:

- `PROTECT`: OCR, PII detection, sensitive-document detection, and face detection when available
- `THINK`: contextual prompts when the Gemini integration is configured
- `VERIFY`: verification findings for configured destinations

## Deployment

### Vercel frontend

Use the repository root as the Vercel project root:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The production branch is whatever is configured in Vercel Project Settings -> Git. Merge `dev-melissa` into that branch to update the production site, or configure `dev-melissa` as the production branch.

### Render backend

Create a Render Web Service connected to the repository and branch you want to deploy:

- Root directory: repository root
- Build command: `npm install`
- Start command: `npm run server`
- Health check path: `/api/health`

Render provides the `PORT` environment variable, which the server already uses.

After Render gives you an HTTPS URL, set this Vercel environment variable for Preview and Production:

```text
VITE_API_URL=https://your-render-service.onrender.com
```

The frontend uses the local Vite proxy when `VITE_API_URL` is empty and uses this URL in deployed builds.

## Project Structure

```text
src/
  components/       Shared layouts and navigation
  context/          In-memory scan, session, history, and practice state
  pages/            Public, check, dashboard, profile, and information pages
api/
  server.js         Local Express server
  scan.js           Scan endpoint
  action.js         Protect/continue endpoint
  data/             Dynamic backend configuration and seed data
  lib/              Detection, module, storage, and logging helpers
  tests/            Backend scan tests
```

## Current Limitations

- Authentication is a frontend session simulation. Profiles and history reset on refresh.
- The API currently uses in-memory temporary storage and is not a permanent database.
- Face detection depends on the MediaPipe runtime and may be unavailable in some Node environments; OCR and text detection continue to work when it is unavailable.
- The repository-wide ESLint command includes the existing CommonJS API files. Use `npx eslint src` for the frontend lint check.
