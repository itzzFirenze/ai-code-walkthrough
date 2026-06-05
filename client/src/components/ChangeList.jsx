const ChangeList = ({ previousVariables, currentVariables }) => {
   const changes = []

   for (const key in currentVariables) {
      const previous = previousVariables?.[key]
      const current = currentVariables[key]
      if (previous !== current) {
         changes.push({ key, previous, current })
      }
   }

   if (!changes.length) return null

   return (
      <div>
         <p className='text-[11px] font-mono text-[#555] uppercase tracking-wider mb-2'>changes</p>
         <div className='space-y-1.5'>
            {changes.map((change) => (
               <div key={change.key} className='flex items-center gap-2 text-xs font-mono bg-[#141414] border border-[#2a2a2a] rounded px-3 py-2'>
                  <span className='text-[#7eafd4]'>{change.key}</span>
                  <span className='text-[#444]'>=</span>
                  <span className='text-[#888] line-through text-[11px]'>
                     {change.previous === undefined ? '—' : String(change.previous)}
                  </span>
                  <span className='text-[#444]'>→</span>
                  <span className='text-[#8fca8f]'>{String(change.current)}</span>
               </div>
            ))}
         </div>
      </div>
   )
}

export default ChangeList