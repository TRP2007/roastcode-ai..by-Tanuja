import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
}

const ai = new GoogleGenAI({
    apiKey,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const code =
            typeof body.code === "string" ? body.code.trim() : "";

        const language =
            typeof body.language === "string"
                ? body.language
                : "Unknown";

        const roastLevel =
            typeof body.roastLevel === "string"
                ? body.roastLevel
                : "Halka";

        const persona =
            typeof body.persona === "string"
                ? body.persona
                : "Desi Developer";

        const errorMessage =
            typeof body.errorMessage === "string"
                ? body.errorMessage.trim()
                : "";

        if (!code) {
            return NextResponse.json(
                {
                    error: "Please enter some code first.",
                },
                { status: 400 }
            );
        }

        if (code.length > 12000) {
            return NextResponse.json(
                {
                    error: "Code is too long. Maximum allowed is 12,000 characters.",
                },
                { status: 400 }
            );
        }

        const prompt = `
You are Code Roaster, an expert software engineer, debugger,
code reviewer and performance analyst.

Analyze the user's ${language} code carefully.

Roast level: ${roastLevel}
Persona: ${persona}

Optional error/stack trace:
${errorMessage || "None provided"}

IMPORTANT:
- Only report problems that actually exist.
- Do not invent bugs.
- Separate real bugs from style issues.
- Give technically correct fixes.
- Analyze time and space complexity where meaningful.
- Generate useful test cases.
- Return complete corrected code.
- Keep the roast humorous but never sacrifice technical accuracy.

Return ONLY valid JSON with this exact structure:

{
  "score": 0,
  "summary": "short overall assessment",
  "roast": "humorous but technically accurate roast",
  "issues": [
    {
      "severity": "FATAL BUG",
      "title": "short issue title",
      "explanation": "clear explanation",
      "fix": "specific fix"
    }
  ],
  "optimization": "important optimization suggestions",
  "complexity": {
    "time": "time complexity",
    "space": "space complexity",
    "explanation": "short explanation"
  },
  "fixedCode": "complete corrected code",
  "testCases": [
    {
      "input": "test input",
      "expectedOutput": "expected output",
      "purpose": "what this test checks"
    }
  ]
}

Rules:
- score must be an integer from 0 to 100.
- severity must be exactly one of:
  "FATAL BUG"
  "CODE SMELL"
  "OPTIMIZATION"
- testCases should contain 2 to 5 useful tests.
- fixedCode must contain the full corrected program.
- Return JSON only.
- Do not use markdown code fences.

USER CODE:

${code}
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.5,
            },
        });

        const text = response.text?.trim();

        if (!text) {
            return NextResponse.json(
                {
                    error: "Gemini returned an empty response.",
                },
                { status: 500 }
            );
        }

        let result;

        try {
            result = JSON.parse(text);
        } catch {
            console.error("Invalid Gemini JSON:", text);

            return NextResponse.json(
                {
                    error: "Gemini returned an invalid response.",
                },
                { status: 500 }
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Roast API error:", error);

        return NextResponse.json(
            {
                error:
                    "Unable to analyze the code right now. Please try again.",
            },
            { status: 500 }
        );
    }
}