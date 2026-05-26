import { useState } from 'react'
import explainCode from './services/api'
import ExplanationBox from './components/ExplanationBox'
import ExecutionSteps from './components/ExecutionSteps'
import { languages } from './constants/languages'
import CodeEditor from './components/CodeEditor'

const App = () => {
   const [code, setCode] = useState('')
   const [explanation, setExplanation] = useState('')
   const [loading, setLoading] = useState(false)
   const [steps, setSteps] = useState([])
   const [error, setError] = useState("")
   const [language, setLanguage] = useState("javascript")

   const handleExplain = async () => {
      if (!code.trim()) return

      setLoading(true)
      setError("")
      const data = await explainCode(code, language)
      if (data.success) {
         setExplanation(data.explanation)
         setSteps(data.steps || [])
      } else {
         setError(data.message || "Something went wrong")
      }
      setLoading(false)
   }

   return (
      <div className='min-h-screen bg-zinc-900 text-white flex-col items-center justify-center'>
         {error && (
            <div className='mt-4 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg'>
               {error}
            </div>
         )}
         <h1 className='text-4xl font-bold'>
            AI Code Walkthrough
         </h1>
         <div className='mb-4'>
            <label className='block mb-2 text-zinc-300 font-medium'>
               Programming Language
            </label>
            <select
               value={language}
               onChange={(e) => setLanguage(e.target.value)}
               className='bg-zinc-800 border border-zinc-700 rounded-lg px-12 py-3 outline-none text-white'
            >
               {languages.map((lang) => (
                  <option value={lang} key={lang}>
                     {lang.label}
                  </option>
               ))}
            </select>
         </div>
         <CodeEditor
            code={code}
            setCode={setCode}
            language={language}
         />
         <button
            onClick={handleExplain}
            className='mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition'
         >
            {loading ? "Generating..." : "Explain Code"}
         </button>
         {loading && (
            <p className='text-zinc-400'>
               Generating explanation...
            </p>
         )}
         {explanation && (
            <ExplanationBox explanation={explanation} />
         )}
         {steps.length > 0 && (
            <ExecutionSteps steps={steps} />
         )}
         {/* {diagram && (
            <div className='mt-8'>
               <h2 className='text-2xl font-bold mb-4'>
                  Execute Flow Diagram
               </h2>
               <MermaidDiagram chart={diagram} />
            </div>
         )} */}
      </div>
   )
}

export default App