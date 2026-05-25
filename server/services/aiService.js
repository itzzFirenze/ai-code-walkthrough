const { GoogleGenAI } = require('@google/genai')

const ai = new GoogleGenAI({
   apiKey: process.env.GEMINI_API_KEY
});

const generateCodeExplanation = async (code) => {
   // const prompt = `You are a beginner-friendly programming tutor(But don't start the conversation by introducing yourself).

   // Explain the following code clearly and step-by-step.

   // Structure the response using markdown.

   // Include:
   // - Summary
   // - Step-by-step explanation
   // - Important variables
   // - Functions used
   // - Beginner notes

   // Code:

   // ${code}`
   //    const prompt = `

   // You are a beginner-friendly programming tutor.

   // Analyze the following code, Explain the code clearly and step-by-step and respond ONLY in valid JSON format.

   // The JSON must contain:

   // {
   //   "explanation": "markdown explanation here",
   //   "diagram": "valid mermaid flowchart syntax here"
   // }

   // Rules:
   // - Summary
   // - Step-by-step explanation
   // - Important variables
   // - Functions used
   // - Beginner notes
   // - explanation must be markdown
   // - diagram must use Mermaid flowchart syntax
   // - keep explanations beginner friendly
   // - diagram should visualize execution flow clearly
   // - do not include extra text outside JSON

   // Code:

   // ${code}

   // `
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

Code:

${code}

`

   const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
   })

   const rawText = response.text

   const cleanedText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

   const parsedData = JSON.parse(cleanedText)

   return parsedData
}

module.exports = {
   generateCodeExplanation
}