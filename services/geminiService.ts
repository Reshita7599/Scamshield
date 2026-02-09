import { GoogleGenAI, Schema, Type } from "@google/genai";
import { RiskLevel, SecurityAnalysisResult } from "../types";

// In Vite (local development), env vars are accessed via import.meta.env
// We check both specific VITE_API_KEY and general API_KEY for compatibility
const apiKey = (import.meta as any).env?.VITE_API_KEY || process.env.API_KEY;

if (!apiKey) {
  console.warn("Missing API Key. Please add VITE_API_KEY to your .env file.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_KEY" });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    riskLevel: {
      type: Type.STRING,
      enum: [RiskLevel.SAFE, RiskLevel.SUSPICIOUS, RiskLevel.MALICIOUS, RiskLevel.UNKNOWN],
    },
    score: {
      type: Type.INTEGER,
      description: "A safety score from 0 (very dangerous) to 100 (very safe)",
    },
    summary: {
      type: Type.STRING,
      description: "A brief summary of the findings.",
    },
    details: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of specific technical reasons for the verdict.",
    },
    recommendation: {
      type: Type.STRING,
      description: "Actionable advice for the user.",
    },
  },
  required: ["riskLevel", "score", "summary", "details", "recommendation"],
};

export const analyzeSecurityData = async (
  input: string,
  type: 'URL' | 'EMAIL' | 'CODE'
): Promise<SecurityAnalysisResult> => {
  const modelId = "gemini-2.5-flash"; // Good balance of speed and reasoning
  
  let prompt = "";
  
  switch (type) {
    case 'URL':
      prompt = `Analyze this URL for cybersecurity threats (Phishing, Malware, XSS, etc.). URL: "${input}"`;
      break;
    case 'EMAIL':
      prompt = `Analyze this email content for SPAM, Phishing, or Social Engineering attacks. Content: "${input}"`;
      break;
    case 'CODE':
      prompt = `Analyze this code snippet for security vulnerabilities (SQL Injection, Buffer Overflow, Hardcoded secrets, etc.). Code: "${input}"`;
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are an expert cybersecurity analyst. Be conservative and highlight potential risks. Output JSON only."
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as SecurityAnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      riskLevel: RiskLevel.UNKNOWN,
      score: 0,
      summary: "Analysis failed due to an error.",
      details: ["API connection failed or input was invalid.", "Check your VITE_API_KEY in .env file."],
      recommendation: "Try again later."
    };
  }
};

export const checkPasswordStrength = async (password: string): Promise<SecurityAnalysisResult> => {
   // Specialized prompt for passwords
   try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the strength of this password: "${password}". Do not reveal the password in output.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are a password cracking expert. Estimate entropy and guessability. Score 0 (weak) to 100 (strong)."
      },
    });
     const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as SecurityAnalysisResult;
   } catch (error) {
     return {
        riskLevel: RiskLevel.UNKNOWN,
        score: 0,
        summary: "Error checking password",
        details: [],
        recommendation: "Use a longer password."
     }
   }
}

export const generateCommunityReply = async (userPost: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `A user posted this in a cybersecurity community: "${userPost}". Write a helpful, short, professional reply as 'ScamShield AI Moderator'. Focus on safety tips or validation.`,
            config: {
                systemInstruction: "You are a helpful cybersecurity community moderator."
            }
        });
        return response.text || "Thank you for sharing! Stay safe.";
    } catch (e) {
        return "Thanks for your contribution to the community!";
    }
}