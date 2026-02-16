import { NextRequest, NextResponse } from 'next/server';

// Mock plant database - in production, fetch from Prisma/Supabase
const MOCK_PLANTS = [
  {
    id: '1',
    commonName: 'California Poppy',
    scientificName: 'Eschscholzia californica',
    family: 'Papaveraceae',
    description:
      'The California poppy is a species of flowering plant in the family Papaveraceae, native to the United States and Mexico. It is an annual plant growing to 5–60 cm tall.',
    careInstructions: 'Full sun, well-drained soil, drought tolerant',
    nativeRegions: ['California', 'North America'],
    toxicity: 'Non-toxic',
    imageUrl: null,
  },
  {
    id: '2',
    commonName: 'Coast Redwood',
    scientificName: 'Sequoia sempervirens',
    family: 'Cupressaceae',
    description:
      'The coast redwood is the sole living species of the genus Sequoia. It is an evergreen, long-lived, monoecious tree living 1,200–2,200 years or more.',
    careInstructions: 'Moist, well-drained soil, full sun to partial shade',
    nativeRegions: ['California', 'Oregon'],
    toxicity: 'Non-toxic',
    imageUrl: null,
  },
  {
    id: '3',
    commonName: 'English Lavender',
    scientificName: 'Lavandula angustifolia',
    family: 'Lamiaceae',
    description:
      'Lavandula angustifolia is a flowering plant in the family Lamiaceae, native to the Mediterranean. It is a strongly aromatic shrub growing as high as 1 to 2 meters tall.',
    careInstructions: 'Full sun, well-drained soil, drought tolerant when established',
    nativeRegions: ['Mediterranean', 'Europe'],
    toxicity: 'Non-toxic (aromatic)',
    imageUrl: null,
  },
  {
    id: '4',
    commonName: 'Japanese Maple',
    scientificName: 'Acer palmatum',
    family: 'Sapindaceae',
    description:
      'Acer palmatum, commonly known as Japanese maple, is a species of woody plant native to Japan, Korea, China, and Russia. It is a deciduous tree reaching 6–10 m in height.',
    careInstructions: 'Partial shade, moist well-drained soil, protect from strong winds',
    nativeRegions: ['Japan', 'East Asia'],
    toxicity: 'Non-toxic',
    imageUrl: null,
  },
  {
    id: '5',
    commonName: 'African Violet',
    scientificName: 'Saintpaulia',
    family: 'Gesneriaceae',
    description:
      'Saintpaulia is a genus of flowering plants in the family Gesneriaceae, native to Tanzania and Kenya. Commonly grown as a houseplant.',
    careInstructions: 'Indirect light, consistent moisture, room temperature',
    nativeRegions: ['East Africa', 'Tanzania'],
    toxicity: 'Non-toxic',
    imageUrl: null,
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const location = searchParams.get('location');

  let filteredPlants = MOCK_PLANTS;

  if (location) {
    filteredPlants = MOCK_PLANTS.filter((plant) =>
      plant.nativeRegions.some((region) =>
        region.toLowerCase().includes(location.toLowerCase())
      )
    );
  }

  return NextResponse.json({ plants: filteredPlants });
}
