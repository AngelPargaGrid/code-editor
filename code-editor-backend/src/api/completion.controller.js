import { geminiModel } from '../core/gemini/client.js';

export const completionController = {
  /**
   * @param {Object} req - Request object de Express
   * @param {Object} res - Response object de Express
   */
  async completeCode(req, res) {
    try {
      const { code, language } = req.body;

      if (!code) {
        return res.status(400).json({ error: "Missing 'code' field" });
      }

      const suggestion = await geminiModel.generateCodeCompletion(code, language);
      
      res.json({ suggestion: suggestion });
    } catch (err) {
      console.error("Gemini error:", err);
      res.status(500).json({ error: "Gemini request failed" });
    }
  }
};
