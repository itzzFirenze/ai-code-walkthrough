import { useWalkthrough } from '../context/WalkthroughContext'

const GenerateButton = () => {
   const { handleExplain, loading, code } = useWalkthrough()

   return (
      <button
         onClick={handleExplain}
         disabled={loading || !code?.trim()}
         className={`w-full py-3 text-sm font-mono rounded border transition-all ${loading || !code?.trim()
               ? 'bg-transparent text-[#444] border-[#2a2a2a] cursor-not-allowed'
               : 'bg-[#e8e8e8] text-[#0e0e0e] border-[#e8e8e8] hover:bg-[#d0d0d0] hover:border-[#d0d0d0] active:scale-[0.99]'
            }`}
      >
         {loading ? (
            <span className='flex items-center justify-center gap-2'>
               <span className='inline-block w-3 h-3 border border-[#555] border-t-transparent rounded-full animate-spin' />
               generating trace...
            </span>
         ) : (
            '→ generate walkthrough'
         )}
      </button>
   )
}

export default GenerateButton