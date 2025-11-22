import { GoogleGenAI } from "@google/genai";

// Initialize the client
// Note: In a real production app, you might handle this differently,
// but for this environment we strictly follow the guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEditedImage = async (
  base64Image: string,
  prompt: string
): Promise<string> => {
  try {
    // Clean the base64 string if it contains the data URL prefix
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
    
    // Determine mimeType from the base64 string header if possible, default to image/jpeg
    let mimeType = 'image/jpeg';
    if (base64Image.startsWith('data:image/png')) {
      mimeType = 'image/png';
    } else if (base64Image.startsWith('data:image/webp')) {
      mimeType = 'image/webp';
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      // Note: For simple edits, we don't necessarily need specific config, 
      // but we can add generationConfig if needed. 
      // 2.5 Flash Image usually handles "Edit this..." prompts well by default.
    });

    // Parse response to find the image
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};