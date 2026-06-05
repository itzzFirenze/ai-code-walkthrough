import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
   apiKey: process.env.GEMINI_API_KEY
});

const generateCodeExplanation = async (code, language) => {

   // const prompt = `

   //    You are a beginner-friendly programming tutor.

   //    Analyze the following code and respond ONLY in valid JSON.

   //    Response format:

   //    {
   //    "explanation": "markdown explanation",
   //    "steps": [
   //       {
   //          "step": 1,
   //          "title": "short step title",
   //          "description": "beginner friendly explanation",
   //          "array": [example array state],
   //          "highlights": [indices being focused]
   //       }
   //    ]
   //    }

   //    Rules:
   //    - Output ONLY valid JSON
   //    - explanation must use markdown
   //    - steps must explain execution sequentially
   //    - array should represent current state
   //    - highlights should indicate active indices
   //    - keep explanations beginner friendly
   //    - Return "Not a valid program" if the code is not an actual code or just jibberish
   //    - Always generate valid parsable JSON
   //    - Do not wrap JSON in markdown
   //    - Ensure all arrays use proper JSON syntax

   //    Code:

   //    ${code}

   //    Programming language:

   //    ${language}

   //    `
   const prompt = `
      You are a programming tutor.

      Analyze the following ${language} code.

      Code:
      ${code}

      Return ONLY valid JSON.

      Format:

      {
      "explanation": "short beginner-friendly explanation",

      "trace": [
         {
            "step": 1,
            "line": 4,
            "even": "swap",
            "title": "...",
            "description": "...",
            "variables": {
               "i": 0,
               "j": 1
            },
            "state": {
               "arr": [34,64,25]
            }
         }
      ],

      "output": "..."
      }

      Rules:

      1. Show execution step-by-step.
      2. Include a trace entry whenever:
         - a variable changes
         - a loop iteration begins
         - a condition is evaluated
         - a function is called
         - a function returns
         - output is produced

      3. Every trace entry MUST contain:
         - step
         - line
         - event
         - title
         - description
         - variables
         - state
         - highlights

      4. Never omit fields. Use null, {} or [] if needed.

      5. Arrays must be returned as JSON arrays, not strings.
      6. Numbers must be returned as numbers.
      7. Booleans must be returned as true/false.
      8. line must match the actual code line number.
      9. Return ONLY valid JSON.
      10. Do not wrap JSON in markdown.
      11. If the input is not valid code return:
         {
         "error": true,
         "message": "Not a valid program"
         }
      `

   const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt
   })

   const rawText = response.text
   try {
      const cleanedText = rawText
         .replace(/```json/g, "")
         .replace(/```/g, "")
         .trim()

      const parsedData = JSON.parse(cleanedText)

      return parsedData

   } catch (err) {
      console.error(err)

      return {
         explanation:
            "Unable to generate walkthrough.",

         trace: [],

         output: ""
      }
   }
}

export {
   generateCodeExplanation
}