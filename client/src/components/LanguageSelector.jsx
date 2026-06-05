import { useWalkthrough } from '../context/WalkthroughContext'
import { languages } from '../constants/languages'

const LanguageSelector = () => {
   const { language, setLanguage } = useWalkthrough()

   return (
      <div className='flex items-center gap-2 flex-wrap'>
         <span className='text-xs font-mono text-[#555] uppercase tracking-widest mr-1'>lang</span>
         {languages.map(({ label, value }) => (
            <button
               key={value}
               onClick={() => setLanguage(value)}
               className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${language === value
                     ? 'bg-[#e8e8e8] text-[#0e0e0e] border-[#e8e8e8]'
                     : 'bg-transparent text-[#888] border-[#2a2a2a] hover:border-[#444] hover:text-[#ccc]'
                  }`}
            >
               {label}
            </button>
         ))}
      </div>
   )
}

export default LanguageSelector