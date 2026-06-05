import { useState } from 'react'
import { useWalkthrough } from '../context/WalkthroughContext'

const ExecutionSteps = () => {
   const { trace } = useWalkthrough()
   const [currentStepIndex, setCurrentStepIndex] = useState(0)

   if (!trace?.length) return null

   const currentStep = trace[currentStepIndex]
   const progress = ((currentStepIndex + 1) / trace.length) * 100

   return (
      <div className='mt-8'>
         <div className='flex items-center gap-3 mb-3'>
            <span className='text-xs font-mono text-[#555] uppercase tracking-widest'>execution trace</span>
            <div className='flex-1 border-t border-[#1e1e1e]' />
            <span className='text-xs font-mono text-[#555]'>{currentStepIndex + 1}/{trace.length}</span>
         </div>

         <div className='border border-[#2a2a2a] rounded overflow-hidden'>
            {/* progress bar */}
            <div className='h-[2px] bg-[#1e1e1e]'>
               <div
                  className='h-full bg-[#e8e8e8] transition-all duration-300'
                  style={{ width: `${progress}%` }}
               />
            </div>

            {/* step content */}
            <div className='bg-[#111] p-5'>
               <div className='flex items-start justify-between gap-4 mb-4'>
                  <div>
                     <p className='text-xs font-mono text-[#555] mb-1'>step {currentStepIndex + 1}</p>
                     <h3 className='text-sm font-mono font-semibold text-[#e8e8e8]'>
                        {currentStep.title}
                     </h3>
                  </div>
               </div>

               <p className='text-sm font-mono text-[#888] leading-relaxed mb-5'>
                  {currentStep.description}
               </p>

               {currentStep.array && (
                  <div className='mb-5'>
                     <p className='text-[11px] font-mono text-[#555] uppercase tracking-wider mb-2'>array state</p>
                     <div className='flex gap-2 flex-wrap'>
                        {currentStep.array.map((value, index) => {
                           const isHighlighted = currentStep.highlights?.includes(index)
                           return (
                              <div
                                 key={index}
                                 className={`w-12 h-12 rounded border flex items-center justify-center text-sm font-mono font-semibold transition-all duration-200 ${isHighlighted
                                       ? 'bg-[#e8e8e8] text-[#0e0e0e] border-[#e8e8e8]'
                                       : 'bg-[#1a1a1a] text-[#888] border-[#2a2a2a]'
                                    }`}
                              >
                                 {value}
                              </div>
                           )
                        })}
                     </div>
                  </div>
               )}

               {/* navigation */}
               <div className='flex items-center gap-2 pt-4 border-t border-[#1e1e1e]'>
                  <button
                     onClick={() => setCurrentStepIndex((p) => p - 1)}
                     disabled={currentStepIndex === 0}
                     className='px-4 py-2 text-xs font-mono rounded border border-[#2a2a2a] text-[#888] hover:border-[#444] hover:text-[#ccc] disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
                  >
                     ← prev
                  </button>
                  <button
                     onClick={() => setCurrentStepIndex((p) => p + 1)}
                     disabled={currentStepIndex === trace.length - 1}
                     className='px-4 py-2 text-xs font-mono rounded border border-[#2a2a2a] text-[#888] hover:border-[#444] hover:text-[#ccc] disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
                  >
                     next →
                  </button>

                  {/* step dots */}
                  <div className='flex items-center gap-1 ml-auto'>
                     {trace.map((_, i) => (
                        <button
                           key={i}
                           onClick={() => setCurrentStepIndex(i)}
                           className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentStepIndex ? 'bg-[#e8e8e8]' : 'bg-[#333] hover:bg-[#555]'
                              }`}
                        />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ExecutionSteps