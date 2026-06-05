import { generateCodeExplanation } from '../services/aiService.js';

const explainCode = async (req, res) => {
   try {
      const { code, language } = req.body;

      if (!code) {
         return res.status(400).json({ message: "Code is required!" })
      }

      const result = await generateCodeExplanation(code, language)

      return res.status(200).json({
         success: true,
         message: "Explanation generated",
         ...result
      })
   } catch (error) {
      console.error("Controller Error:", error);
      return res.status(500).json({
         success: false,
         message: error.message || "Internal server error occurred during AI processing"
      });
   }
}

export {
   explainCode
}