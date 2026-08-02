# Datum

Enterprise AEC dashboard for structural engineering intelligence — project tracking, bids, compliance, RFIs, sustainability, and reports in a strict monochrome dark UI.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- MUI Material icons
- TanStack Query, Axios
- Inter (interface) + Noto Serif Display (wordmark)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app proxies API calls to a backend at `NEXT_PUBLIC_API_URL` (see `.env.local`). The IFC upload, parse, and drawings flows surface real API error/empty states when the backend is offline.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — lint
