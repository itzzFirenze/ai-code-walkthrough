import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
   apiKey: process.env.GEMINI_API_KEY
});

const generateCodeExplanation = async (code, language) => {

   const prompt = `

      You are a beginner-friendly programming tutor.

      Analyze the following code and respond ONLY in valid JSON.

      Response format:

      {
      "explanation": "markdown explanation",
      "steps": [
         {
            "step": 1,
            "title": "short step title",
            "description": "beginner friendly explanation",
            "array": [example array state],
            "highlights": [indices being focused]
         }
      ]
      }

      Rules:
      - Output ONLY valid JSON
      - explanation must use markdown
      - steps must explain execution sequentially
      - array should represent current state
      - highlights should indicate active indices
      - keep explanations beginner friendly
      - Return "Not a valid program" if the code is not an actual code or just jibberish
      - Always generate valid parsable JSON
      - Do not wrap JSON in markdown
      - Ensure all arrays use proper JSON syntax

      Code:

      ${code}

      Programming language:

      ${language}

      `
   const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
   })

   const rawText = response.text
   try {
      const cleanedText = rawText
         .replace(/```json/g, "")
         .replace(/```/g, "")
         .trim()

      const parsedData = JSON.parse(cleanedText)

      return {
         explanation: parsedData.explanation || "No explanation generated",
         steps: parsedData.steps || []
      }
   } catch (err) {
      console.log("AI parsing error")

      return {
         explanation: `
            # Error

            The AI returned an invalid response format.

            Please try again.
         `,
         steps: [],
      }
   }
}

export {
   generateCodeExplanation
}