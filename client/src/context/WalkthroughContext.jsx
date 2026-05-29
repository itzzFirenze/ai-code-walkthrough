import { useState, useContext, createContext } from "react"
import explainCode from "../services/api"
import { saveWalkthrough } from '../services/walkthroughService'
import { useAuth } from '../hooks/useAuth'

export const WalkthroughContext = createContext()

const WalkthroughProvider = ({ children }) => {
   const [code, setCode] = useState('')
   const [explanation, setExplanation] = useState('')
   const [loading, setLoading] = useState(false)
   const [steps, setSteps] = useState([])
   const [error, setError] = useState("")
   const [language, setLanguage] = useState("javascript")

   const { token } = useAuth()

   const handleExplain = async () => {
      if (!code.trim()) return

      setLoading(true)
      setError("")
      const data = await explainCode(code, language)
      if (data.success) {
         setExplanation(data.explanation)
         setSteps(data.steps || [])
         await saveWalkthrough({
            language,
            code,
            explanation: data.explanation,
            steps: data.steps
         }, token)
      } else {
         setError(data.message || "Something went wrong")
      }
      setLoading(false)
   }

   return (
      <WalkthroughContext.Provider
         value={{
            language, setLanguage,
            code, setCode,
            explanation, setExplanation,
            loading, setLoading,
            steps, setSteps,
            error, setError,
            handleExplain
         }}
      >
         {children}
      </WalkthroughContext.Provider>
   )
}

export const useWalkthrough = () => {
   return useContext(WalkthroughContext)
}

export {
   WalkthroughProvider
}