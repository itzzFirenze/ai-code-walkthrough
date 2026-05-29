import { useWalkthrough } from "../context/WalkthroughContext"

const ErrorMessage = () => {
   const { error } = useWalkthrough()
   return (
      <div>
         {error && (
            <div className='mt-4 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg'>
               {error}
            </div>
         )}
      </div>
   )
}

export default ErrorMessage