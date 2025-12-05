import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from '../../config/env.js';


class GeminiClient {
  constructor() {
    config.validate();

    this.genAI = new GoogleGenerativeAI(config.googleApiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
  }

  /**
   * @param {string} code - context code
   * @param {string} language - language
   * @returns {Promise<string>} 
   */
  async generateCodeCompletion(code, language = 'javascript') {
    const prompt = `
You are a helpful coding assistant. Continue the user's code by suggesting the next logical lines.

Language: ${language}

User code:
${code}

Guidelines:
- Continue the code without repeating the user's input.
- Respond ONLY with raw code.
- Do not include comments, explanations, or markdown formatting.
- Do not wrap the output in backticks.
- Limit your response to 1–5 lines unless more is explicitly required by the context.
`;


    const result = await this.model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return result.response.text();
  }
}

export const geminiModel = new GeminiClient();