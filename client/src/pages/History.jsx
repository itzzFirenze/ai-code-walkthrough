import { getWalkthroughsHistory } from '../services/walkthroughService'
import { useAuth } from '../hooks/useAuth'
import { useState, useEffect } from 'react'
import ExplanationBox from '../components/ExplanationBox'
import { WalkthroughContext } from '../context/WalkthroughContext'
import ExecutionSteps from '../components/ExecutionSteps'
import Layout from '../components/Layout'

const History = () => {
   const { token } = useAuth()
   const [history, setHistory] = useState([])
   const [loading, setLoading] = useState(true)
   const [expanded, setExpanded] = useState({})

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

   const toggle = (id, section) => {
      setExpanded((prev) => ({
         ...prev,
         [`${id}-${section}`]: !prev[`${id}-${section}`],
      }))
   }

   const isOpen = (id, section) => !!expanded[`${id}-${section}`]

   if (loading) {
      return (
         <Layout>
            <div className='min-h-screen bg-[#0e0e0e] flex items-center justify-center'>
               <div className='flex items-center gap-2 text-xs font-mono text-[#555]'>
                  <span className='inline-block w-3 h-3 border border-[#444] border-t-transparent rounded-full animate-spin' />
                  loading history...
               </div>
            </div>
         </Layout>
      )
   }

   return (
      <Layout>
         <div className='min-h-screen bg-[#0e0e0e] text-[#e8e8e8]'>
            <div className='max-w-4xl mx-auto px-6 py-10'>

               {/* header */}
               <div className='border-b border-[#2a2a2a] pb-6 mb-8'>
                  <h1 className='text-xl font-mono font-semibold text-[#e8e8e8]'>history</h1>
                  <p className='mt-1 text-sm font-mono text-[#666]'>
                     {history.length} walkthrough{history.length !== 1 ? 's' : ''}
                  </p>
               </div>

               {history.length === 0 ? (
                  <div className='border border-[#2a2a2a] rounded bg-[#111] px-5 py-10 text-center'>
                     <p className='text-sm font-mono text-[#555]'>no walkthroughs yet</p>
                  </div>
               ) : (
                  <div className='space-y-3'>
                     {history.map((item) => (
                        <div
                           key={item._id}
                           className='border border-[#2a2a2a] rounded bg-[#111] overflow-hidden'
                        >
                           {/* row header */}
                           <div className='flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]'>
                              <div className='flex items-center gap-3'>
                                 <span className='text-xs font-mono px-2 py-0.5 rounded border border-[#2a2a2a] text-[#7eafd4] bg-[#0e1a24]'>
                                    {item.language}
                                 </span>
                                 <span className='text-xs font-mono text-[#555]'>
                                    {new Date(item.createdAt).toLocaleString(undefined, {
                                       month: 'short',
                                       day: 'numeric',
                                       year: 'numeric',
                                       hour: '2-digit',
                                       minute: '2-digit',
                                    })}
                                 </span>
                              </div>
                              <div className='flex items-center gap-1'>
                                 {item.explanation && (
                                    <button
                                       onClick={() => toggle(item._id, 'explanation')}
                                       className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${isOpen(item._id, 'explanation')
                                             ? 'border-[#444] text-[#ccc] bg-[#1e1e1e]'
                                             : 'border-[#2a2a2a] text-[#555] hover:border-[#444] hover:text-[#aaa]'
                                          }`}
                                    >
                                       explanation
                                    </button>
                                 )}
                                 {item.steps?.length > 0 && (
                                    <button
                                       onClick={() => toggle(item._id, 'steps')}
                                       className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${isOpen(item._id, 'steps')
                                             ? 'border-[#444] text-[#ccc] bg-[#1e1e1e]'
                                             : 'border-[#2a2a2a] text-[#555] hover:border-[#444] hover:text-[#aaa]'
                                          }`}
                                    >
                                       trace
                                    </button>
                                 )}
                              </div>
                           </div>

                           {/* code block */}
                           <pre className='px-5 py-4 text-xs font-mono text-[#888] leading-relaxed overflow-x-auto bg-[#0e0e0e] border-b border-[#1e1e1e] whitespace-pre'>
                              {item.code}
                           </pre>

                           {/* expandable explanation */}
                           {item.explanation && isOpen(item._id, 'explanation') && (
                              <div className='border-t border-[#1e1e1e] px-5 py-4'>
                                 <WalkthroughContext.Provider value={{ explanation: item.explanation }}>
                                    <ExplanationBox />
                                 </WalkthroughContext.Provider>
                              </div>
                           )}

                           {/* expandable trace */}
                           {item.steps?.length > 0 && isOpen(item._id, 'steps') && (
                              <div className='border-t border-[#1e1e1e] px-5 py-4'>
                                 <WalkthroughContext.Provider value={{ trace: item.steps }}>
                                    <ExecutionSteps />
                                 </WalkthroughContext.Provider>
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </Layout>
   )
}

export default History