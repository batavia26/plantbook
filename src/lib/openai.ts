import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface PlantIdentificationResult {
  plantName: string;
  scientificName: string;
  family: string;
  confidence: number;
  description: string;
  careInstructions: {
    water: string;
    sunlight: string;
    soil: string;
    temperature: string;
  };
  toxicity: string;
  suggestions: Array<{
    name: string;
    scientificName: string;
    confidence: number;
  }>;
}

export async function identifyPlant(
  imageBase64: string
): Promise<PlantIdentificationResult> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are an expert botanist and plant identification specialist. When given an image of a plant, identify it and provide detailed information. Always respond in valid JSON format with the following structure:
{
  "plantName": "Common Name",
  "scientificName": "Genus species",
  "family": "Family name",
  "confidence": 0.0-1.0,
  "description": "Brief description of the plant",
  "careInstructions": {
    "water": "Watering needs",
    "sunlight": "Light requirements",
    "soil": "Soil preferences",
    "temperature": "Temperature range"
  },
  "toxicity": "Non-toxic / Toxic to pets / Toxic to humans / etc.",
  "suggestions": [
    {"name": "Alternative 1", "scientificName": "Genus species", "confidence": 0.0-1.0},
    {"name": "Alternative 2", "scientificName": "Genus species", "confidence": 0.0-1.0}
  ]
}
If you cannot identify the plant, set confidence to 0 and provide your best guesses in suggestions.`,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Please identify this plant and provide detailed information about it.",
          },
          {
            type: "image_url",
            image_url: {
              url: imageBase64.startsWith("data:")
                ? imageBase64
                : `data:image/jpeg;base64,${imageBase64}`,
            },
          },
        ],
      },
    ],
    max_tokens: 1000,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from OpenAI");
  }

  return JSON.parse(content) as PlantIdentificationResult;
}

export default openai;
