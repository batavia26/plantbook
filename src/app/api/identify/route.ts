import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Return mock data if no API key configured
      return NextResponse.json({
        commonName: 'Demo Plant (OpenAI not configured)',
        scientificName: 'Plantus demonstratus',
        confidence: 75,
        description:
          'Configure OPENAI_API_KEY in environment variables to enable real plant identification using GPT-4 Vision.',
        family: 'Demo Family',
        nativeRegions: ['Demonstration Mode'],
        careInstructions: 'Add your OpenAI API key to enable real identification',
      });
    }

    // Use OpenAI Vision API directly via fetch
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `You are a botanical expert. Analyze this plant image and provide identification in JSON format with these fields:
              
{
  "commonName": "common name of the plant",
  "scientificName": "scientific name (genus species)",
  "confidence": confidence percentage (0-100),
  "description": "brief description of the plant",
  "family": "botanical family",
  "nativeRegions": ["array", "of", "native regions"],
  "careInstructions": "brief care tips",
  "toxicity": "toxicity information"
}

If you cannot identify the plant with confidence, say so honestly and provide your best guess with lower confidence. Return ONLY the JSON, no other text.`,
              },
              {
                type: 'image_url',
                image_url: {
                  url: image,
                },
              },
            ],
          },
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'OpenAI API request failed');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from response');
    }

    const result = JSON.parse(jsonMatch[0]);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Identification error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to identify plant',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
