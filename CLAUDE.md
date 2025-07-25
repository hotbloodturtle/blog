# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint checks

## Architecture Overview

This is a Next.js 15.4.4 blog application using the App Router with TypeScript and Tailwind CSS 4.

### Key Technologies
- **Next.js 15.4.4** with App Router
- **React 19.1.0** 
- **TypeScript 5** with strict mode enabled
- **Tailwind CSS 4** with PostCSS integration
- **ESLint** with Next.js recommended configs

### Project Structure
- `app/` - Next.js App Router directory containing pages and layouts
  - `layout.tsx` - Root layout with Korean language setting
  - `page.tsx` - Homepage component
  - `globals.css` - Global Tailwind CSS imports
- `public/` - Static assets (currently empty after cleanup)

### Key Configuration Files
- `next.config.ts` - Next.js configuration (minimal setup)
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*` maps to root)
- `eslint.config.mjs` - ESLint flat config extending Next.js rules
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS 4

### Development Notes
- Uses Turbopack for faster development builds
- Korean language is set as default in the root layout
- Path aliases are configured for cleaner imports (`@/` prefix)
- Tailwind CSS 4 uses the new PostCSS plugin architecture