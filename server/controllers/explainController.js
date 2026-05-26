const { generateCodeExplanation } = require('../services/aiService')

const explainCode = async (req, res) => {
   try {
      const { code, language } = req.body;

      if (!code) {
         return res.statsu(400).json({ message: "Code is required!" })
      }

      const result = await generateCodeExplanation(code, language)

      return res.status(200).json({
         success: true,
         message: "Explanation generated",
         explanation: result.explanation,
         steps: result.steps
      })
   } catch (error) {

   }
}

module.exports = {
   explainCode
}