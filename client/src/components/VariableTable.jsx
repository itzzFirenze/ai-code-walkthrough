const VariableTable = ({ variables }) => {
   const entries = Object.entries(variables || {})

   if (!entries.length) {
      return <p className='text-xs font-mono text-[#555]'>no variables</p>
   }

   return (
      <table className='w-full text-xs font-mono border-collapse'>
         <thead>
            <tr className='border-b border-[#2a2a2a]'>
               <th className='text-left py-1.5 pr-4 text-[#555] font-normal uppercase tracking-wider text-[11px]'>var</th>
               <th className='text-left py-1.5 text-[#555] font-normal uppercase tracking-wider text-[11px]'>value</th>
            </tr>
         </thead>
         <tbody>
            {entries.map(([key, value]) => (
               <tr key={key} className='border-b border-[#1e1e1e] last:border-0'>
                  <td className='py-1.5 pr-4 text-[#7eafd4]'>{key}</td>
                  <td className='py-1.5 text-[#c8c8c8] break-all'>
                     {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   )
}

export default VariableTable