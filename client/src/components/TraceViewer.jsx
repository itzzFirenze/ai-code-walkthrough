import { useEffect } from 'react'
import VariableTable from './VariableTable'
import ChangeList from './ChangeList'
import { useWalkthrough } from '../context/WalkthroughContext'

const EVENT_COLORS = {
   call: 'text-[#7eafd4] bg-[#0e1a24] border-[#1a3a52]',
   return: 'text-[#8fca8f] bg-[#0e1a0e] border-[#1a3a1a]',
   exception: 'text-[#e05a5a] bg-[#1a0a0a] border-[#5a1f1f]',
   line: 'text-[#aaa] bg-[#1a1a1a] border-[#2a2a2a]',
}

const formatEvent = (event) =>
   event?.replaceAll('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())

const TraceViewer = ({ trace, output }) => {
   const { currentStepIndex, setCurrentStepIndex } = useWalkthrough()

   useEffect(() => {
      setCurrentStepIndex(0)
   }, [trace, setCurrentStepIndex])

   if (!trace?.length || !trace[currentStepIndex]) return null

   const currentStep = trace[currentStepIndex]
   const prevStep = trace[currentStepIndex - 1]
   const progress = ((currentStepIndex + 1) / trace.length) * 100

   const changedVariables = {}
   for (const key in currentStep.variables) {
      if (prevStep?.variables?.[key] !== currentStep.variables[key]) {
         changedVariables[key] = currentStep.variables[key]
      }
   }

   const eventColor = EVENT_COLORS[currentStep.event] || EVENT_COLORS.line

   return (
      <div className='mt-8'>
         {/* section label */}
         <div className='flex items-center gap-3 mb-3'>
            <span className='text-xs font-mono text-[#555] uppercase tracking-widest'>trace</span>
            <div className='flex-1 border-t border-[#1e1e1e]' />
            <span className='text-xs font-mono text-[#555]'>
               {currentStepIndex + 1}/{trace.length}
            </span>
         </div>

         <div className='border border-[#2a2a2a] rounded overflow-hidden'>
            {/* progress bar */}
            <div className='h-[2px] bg-[#1e1e1e]'>
               <div
                  className='h-full bg-[#e8e8e8] transition-all duration-300'
                  style={{ width: `${progress}%` }}
               />
            </div>

            {/* step header */}
            <div className='px-5 py-4 border-b border-[#1e1e1e] bg-[#111]'>
               <div className='flex items-start justify-between gap-4'>
                  <div className='flex-1'>
                     <div className='flex items-center gap-2 mb-2 flex-wrap'>
                        {currentStep.event && (
                           <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${eventColor}`}>
                              {formatEvent(currentStep.event)}
                           </span>
                        )}
                        {currentStep.line != null && (
                           <span className='text-[11px] font-mono text-[#555]'>
                              line {currentStep.line}
                           </span>
                        )}
                     </div>
                     <h3 className='text-sm font-mono font-semibold text-[#e8e8e8]'>
                        {currentStep.title}
                     </h3>
                     {currentStep.description && (
                        <p className='mt-1.5 text-xs font-mono text-[#777] leading-relaxed'>
                           {currentStep.description}
                        </p>
                     )}
                  </div>
               </div>
            </div>

            {/* variables */}
            <div className='grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#1e1e1e]'>
               <div className='px-5 py-4 bg-[#0e0e0e]'>
                  <p className='text-[11px] font-mono text-[#555] uppercase tracking-wider mb-3'>variables</p>
                  <VariableTable
                     variables={
                        Object.keys(changedVariables).length
                           ? changedVariables
                           : currentStep.variables
                     }
                  />
               </div>
               <div className='px-5 py-4 bg-[#0e0e0e]'>
                  <ChangeList
                     previousVariables={prevStep?.variables}
                     currentVariables={currentStep.variables}
                  />
               </div>
            </div>

            {/* navigation */}
            <div className='flex items-end justify-end gap-2 px-5 py-3 border-t border-[#1e1e1e] bg-[#111]'>
               <button
                  disabled={currentStepIndex === 0}
                  onClick={() => setCurrentStepIndex((p) => Math.max(p - 1, 0))}
                  className='px-4 py-1.5 text-xs font-mono rounded border border-[#2a2a2a] text-[#888] hover:border-[#444] hover:text-[#ccc] disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
               >
                  ← prev
               </button>
               <button
                  disabled={currentStepIndex === trace.length - 1}
                  onClick={() => setCurrentStepIndex((p) => Math.min(p + 1, trace.length - 1))}
                  className='px-4 py-1.5 text-xs font-mono rounded border border-[#2a2a2a] text-[#888] hover:border-[#444] hover:text-[#ccc] disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
               >
                  next →
               </button>

               {/* step dots */}
               {/* <div className='flex items-center gap-1 ml-auto overflow-x-auto max-w-xs'>
                  {trace.map((_, i) => (
                     <button
                        key={i}
                        onClick={() => setCurrentStepIndex(i)}
                        className={`shrink-0 w-1.5 h-1.5 rounded-full transition-all ${i === currentStepIndex ? 'bg-[#e8e8e8]' : 'bg-[#333] hover:bg-[#555]'
                           }`}
                     />
                  ))}
               </div> */}
            </div>
         </div>

         {/* program output */}
         {output && (
            <div className='mt-4'>
               <div className='flex items-center gap-3 mb-2'>
                  <span className='text-xs font-mono text-[#555] uppercase tracking-widest'>output</span>
                  <div className='flex-1 border-t border-[#1e1e1e]' />
               </div>
               <pre className='border border-[#2a2a2a] rounded bg-[#0e0e0e] px-5 py-4 text-xs font-mono text-[#8fca8f] leading-relaxed overflow-x-auto whitespace-pre'>
                  {output}
               </pre>
            </div>
         )}
      </div>
   )
}

export default TraceViewer