export const dynamic = "force-dynamic";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { prompt, history = [] } = await req.json();
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { text: "Error: Gemini API key is missing. Please add it to your environment variables." },
        { status: 500 }
      );
    }
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });
    const systemInstruction = `You are Subtriva AI, a specialized and professional assistant for contractor compliance management.
Your ONLY purpose is to help users with:
- Subcontractor licenses and permits.
- Certificates of Insurance (COIs) and insurance documents.
- Renewal and expiration rules, latest laws and regulations by state.
- General construction business and contractor compliance management.
Abuse prevention:
If the user asks you to do anything outside this scope (e.g., write code, tell jokes, answer general knowledge questions, write an essay not about construction compliance), you must politely refuse and remind them that you are a specialized assistant for contractor compliance and document management only.`;
    const contents = history.map((msg: { role: string; text: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.text }],
    }));
    contents.push({
      role: "user",
      parts: [{ text: prompt }],
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { text: "An error occurred while communicating with the AI assistant." },
      { status: 500 }
    );
  }
}
