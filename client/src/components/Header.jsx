const Header = () => {
   return (
      <div className='border-b border-[#2a2a2a] pb-6'>
         <div className='flex items-baseline gap-3'>
            <h1 className='text-xl font-mono font-semibold tracking-tight text-[#e8e8e8]'>
               code walkthrough
            </h1>
            <span className='text-xs font-mono text-[#555] uppercase tracking-widest'>v1.0</span>
         </div>
         <p className='mt-1 text-sm text-[#666] font-mono'>
            paste code → get a step-by-step execution trace
         </p>
      </div>
   )
}

export default Header