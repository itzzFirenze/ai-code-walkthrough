import { getWalkthroughsHistory } from "../services/walkthroughService"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"
import { useEffect } from "react"
import ExplanationBox from "../components/ExplanationBox"
import { WalkthroughContext } from "../context/WalkthroughContext"
import ExecutionSteps from "../components/ExecutionSteps"

const History = () => {
   const { token } = useAuth()

   const [history, setHistory] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const fetchHistory = async () => {
         try {
            const data = await getWalkthroughsHistory(token)
            setHistory(data.walkthroughs)
         } catch (error) {
            console.log(error)
         } finally {
            setLoading(false)
         }
      }
      fetchHistory()
   }, [token])

   if (loading) {
      return (
         <div className="p-8 text-white">
            Loading...
         </div>
      )
   }

   return (
      <div className="min-h-screen bg-zinc-900 text-white p-8">
         <h1 className="text-4xl font-bold mb-8">
            Walkthrough History
         </h1>
         <div className="space-y-4">
            {history.map((item) => (
               <div
                  key={item._id}
                  className="bg-zinc-800 border border-zinc-800 rounded-xl p-5"
               >
                  <div className="flex items-center justify-between mb-3">
                     <span className="bg-blue-600 px-3 py-1 rounded-lg text-sm">
                        {item.language}
                     </span>
                     <span className="text-zinc-400 text-sm">
                        {new Date(item.createdAt).toLocaleString()}
                     </span>
                  </div>
                  <pre className="bg-zinc-900 p-4 rounded-lg overflow-x-auto text-sm">
                     {item.code}
                  </pre>
                  {item.explanation && (
                     <WalkthroughContext.Provider value={{ explanation: item.explanation }}>
                        <ExplanationBox />
                     </WalkthroughContext.Provider>
                  )}
                  {item.steps.length > 0 && (
                     <WalkthroughContext.Provider value={{ steps: item.steps }}>
                        <ExecutionSteps />
                     </WalkthroughContext.Provider>
                  )}
               </div>
            ))}
         </div>
      </div>
   )
}

export default History