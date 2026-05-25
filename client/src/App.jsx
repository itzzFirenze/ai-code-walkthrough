import { useState } from 'react'
import explainCode from './services/api'
import ExplanationBox from './components/ExplanationBox'
// import MermaidDiagram from './components/MermaidDiagram'
import ExecutionSteps from './components/ExecutionSteps'

const App = () => {
   const [code, setCode] = useState('')
   const [explanation, setExplanation] = useState('')
   const [loading, setLoading] = useState(false)
   const [steps, setSteps] = useState([])
   // const [diagram, setDiagram] = useState("")

   const handleExplain = async () => {
      if (!code.trim()) return

      setLoading(true)
      const data = await explainCode(code)

      setExplanation(data.explanation)
      setSteps(data.steps || [])
      // setDiagram(data.diagram)
      setLoading(false)
   }

   return (
      <div className='min-h-screen bg-zinc-900 text-white flex-col items-center justify-center'>
         <h1 className='text-4xl font-bold'>
            AI Code Walkthrough
         </h1>
         <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder='Enter your code here...'
            className='w-full h-64 bg-zinc-800 border border-zinc-700 rounded-lg p-4 outline-none resize-none'
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