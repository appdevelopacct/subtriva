export const dynamic = "force-dynamic";
import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { fileData, mimeType } = await req.json();
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is missing. Please add it to your environment variables." },
        { status: 500 }
      );
    }
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });
    const base64Data = fileData.replace(/^data:.*;base64,/, "");
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType,
              },
            },
            {
              text: `Analyze this contractor compliance document (license, COI, permit, etc.). 
Extract the following information:
- Document Name / Type (e.g., General Liability Insurance, Electrical License, Building Permit)
- Owner Name / Company (The contractor or company this document belongs to)
- Expiration Date (Format as YYYY-MM-DD if found, else return null)
- Notes (Any important details, coverage amounts, license numbers, or restrictions)
- Is Valid/Original (Does this look like a legitimate, unaltered document? Return true/false)`,
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            documentName: { type: Type.STRING, description: "Name of the document type" },
            ownerName: { type: Type.STRING, description: "Contractor or company name" },
            expirationDate: { type: Type.STRING, description: "YYYY-MM-DD or null" },
            notes: { type: Type.STRING, description: "Important details" },
            isValid: { type: Type.BOOLEAN, description: "Is this a valid and legible document?" },
          },
          required: ["documentName", "ownerName", "notes", "isValid"],
        },
      },
    });
    const extractedData = JSON.parse(response.text || "{}");
    return NextResponse.json({ data: extractedData });
  } catch (error: any) {
    console.error("Gemini Scan Error:", error);
    return NextResponse.json(
      { error: "An error occurred while scanning the document." },
      { status: 500 }
    );
  }
}
