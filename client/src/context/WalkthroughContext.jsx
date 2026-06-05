import { useState, useContext, createContext } from 'react'
import explainCode from '../services/api'
import { saveWalkthrough } from '../services/walkthroughService'
import { useAuth } from '../hooks/useAuth'

export const WalkthroughContext = createContext()

const WalkthroughProvider = ({ children }) => {
   const [code, setCode] = useState('')
   const [explanation, setExplanation] = useState('')
   const [loading, setLoading] = useState(false)
   const [trace, setTrace] = useState([])
   const [output, setOutput] = useState('')
   const [error, setError] = useState('')
   const [language, setLanguage] = useState('javascript')
   const [currentStepIndex, setCurrentStepIndex] = useState(0)
   const { token } = useAuth()

   const handleExplain = async () => {
      if (!code.trim()) return
      try {
         setLoading(true)
         setError('')
         const data = await explainCode(code, language)
         if (data.success) {
            setExplanation(data.explanation)
            setTrace(data.trace || [])
            setCurrentStepIndex(0)
            setOutput(data.output || '')
            await saveWalkthrough({ language, code, ...data }, token)
         } else {
            setError(data.message || 'Something went wrong')
         }
      } catch (err) {
         setError('Failed to generate walkthrough')
         console.error(err)
      } finally {
         setLoading(false)
      }
   }

   return (
      <WalkthroughContext.Provider
         value={{
            language, setLanguage,
            code, setCode,
            explanation, setExplanation,
            trace, setTrace,
            output, setOutput,
            loading, setLoading,
            error, setError,
            currentStepIndex, setCurrentStepIndex,
            handleExplain,
         }}
      >
         {children}
      </WalkthroughContext.Provider>
   )
}

export const useWalkthrough = () => useContext(WalkthroughContext)

export { WalkthroughProvider }