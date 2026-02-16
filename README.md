# 🌱 PlantBook

Plant identification and field guide app with AI-powered image recognition and GPS-based plant discovery.

## Features

- 📸 **Plant Identification** - Upload photos or use your camera to identify plants instantly
- 🗺️ **Location-Based Discovery** - Find plants native to your area using GPS coordinates
- 📚 **Comprehensive Field Guide** - Browse an extensive database of plant species
- 🌿 **Detailed Information** - Scientific names, care instructions, toxicity warnings, and more
- 💚 **User-Friendly** - Clean, mobile-first design optimized for field use

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **OpenAI Vision API** (for plant identification)
- **Supabase** (authentication + database - ready to integrate)
- **Prisma ORM** (database schema defined)

## Current Status

**AI-Powered Identification Ready!** The app uses OpenAI GPT-4 Vision for real plant identification.

**Setup Required:**
1. Add your OpenAI API key to environment variables
2. (Optional) Connect Supabase database for user accounts
3. (Optional) Expand plant database with more species

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Deployment

Ready to deploy to Vercel with zero configuration:

1. Push to GitHub
2. Import to Vercel
3. Add environment variables (when ready):
   - `OPENAI_API_KEY` - for plant identification
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `DATABASE_URL`

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Home page with main actions
│   ├── identify/         # Plant identification interface
│   ├── plants/           # Browse plants & plant details
│   └── api/
│       ├── identify/     # Image identification endpoint
│       └── plants/       # Plant data API
├── components/           # Reusable UI components
└── lib/                  # Utilities (Prisma, OpenAI, Supabase)
```

## Future Enhancements

- Real-time plant identification with OpenAI Vision API
- User accounts with saved plant collections
- Community contributions and plant sightings
- Offline mode with cached plant data
- Advanced filtering (by season, difficulty, etc.)
- Plant care reminders and tracking

---

Built with ❤️ by handi.deputy

