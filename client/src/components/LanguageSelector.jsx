import { languages } from "../constants/languages"
import { useWalkthrough } from "../context/WalkthroughContext"

const LanguageSelector = () => {
   const { language, setLanguage } = useWalkthrough()

   return (
      <div className='mb-4'>
         <label className='block mb-2 text-zinc-300 font-medium'>
            Programming Language
         </label>
         <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className='bg-zinc-800 border border-zinc-700 rounded-lg px-12 py-3 outline-none text-white'
         >
            {languages.map((lang) => (
               <option value={lang.value} key={lang.value}>
                  {lang.label}
               </option>
            ))}
         </select>
      </div>
   )
}

export default LanguageSelector