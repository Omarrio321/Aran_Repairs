import { GoogleGenAI } from "@google/genai";
import { RepairOption, DeviceType } from "../types";
import { REPAIRS } from "../data";

// Initialize the Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface DiagnosisResult {
  diagnosis: string;
  recommendedRepairId: string | null;
  confidence: string;
  deviceType?: DeviceType;
}

export const diagnoseIssue = async (
  userDescription: string, 
  currentDeviceType?: DeviceType
): Promise<DiagnosisResult> => {
  if (!process.env.API_KEY) {
    console.warn("API Key missing for Gemini");
    return {
      diagnosis: "AI diagnosis is currently unavailable (API Key missing).",
      recommendedRepairId: null,
      confidence: "low"
    };
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // Construct a context-aware prompt
    const repairList = currentDeviceType 
      ? REPAIRS[currentDeviceType].map(r => `${r.id}: ${r.name}`).join(', ') 
      : "Generic phone repairs: screen, battery, water damage, charging port";

    const prompt = `
      You are an expert device repair technician AI.
      User Problem: "${userDescription}"
      Context: User is looking for repairs for a ${currentDeviceType || 'device'}.
      
      Available Repair Services: [${repairList}]

      Task:
      1. Analyze the problem.
      2. Suggest the most likely technical issue.
      3. Recommend the BEST matching repair ID from the list provided above if applicable. If no specific repair matches well, return null.
      4. Provide a confidence level (Low, Medium, High).

      Return strictly valid JSON in this format:
      {
        "diagnosis": "Short explanation of the technical fault (max 2 sentences).",
        "recommendedRepairId": "id_from_list_or_null",
        "confidence": "High/Medium/Low"
      }
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const result = JSON.parse(text) as DiagnosisResult;
    return result;

  } catch (error) {
    console.error("Gemini diagnosis failed:", error);
    return {
      diagnosis: "We couldn't automatically diagnose the issue. Please select a repair manually.",
      recommendedRepairId: null,
      confidence: "low"
    };
  }
};
