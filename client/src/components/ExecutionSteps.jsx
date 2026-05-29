import { useState } from "react"
import { useWalkthrough } from "../context/WalkthroughContext"

const ExecutionSteps = () => {
   const { steps } = useWalkthrough()
   const [currentStepIndex, setCurrentStepIndex] = useState(0)

   const currentStep = steps[currentStepIndex]

   const goToNextStep = () => {
      if (currentStepIndex < steps.length - 1) {
         setCurrentStepIndex(prev => prev + 1)
      }
   }

   const goToPrevStep = () => {
      if (currentStepIndex > 0) {
         setCurrentStepIndex(prev => prev - 1)
      }
   }

   return (
      <div className="mt-10">
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">
               Step-by-Step Execution
            </h2>
            <div className="text-zinc-400">
               Step {currentStepIndex + 1} of {steps.length}
            </div>
         </div>
         <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-3">
               {currentStep.title}
            </h3>
            <p className="text-zinc-300 mb-8">
               {currentStep.description}
            </p>
            {currentStep.array && (
               <div className="flex gap-3 flex-wrap mb-8">
                  {currentStep.array.map((value, index) => {
                     const isHighlighted = currentStep.highlights?.includes(index)

                     return (
                        <div
                           key={index}
                           className={`w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold transition-all duration-300 ${isHighlighted ? "bg-blue-600 scale-110" : "bg-zinc-700"}`}
                        >
                           {value}
                        </div>
                     )
                  })}
               </div>
            )}
            <div className="flex gap-4">

               <button
                  onClick={goToPrevStep}
                  disabled={currentStepIndex === 0}
                  className="bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 rounded-lg transition"
               >
                  Previous
               </button>

               <button
                  onClick={goToNextStep}
                  disabled={currentStepIndex === steps.length - 1}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 rounded-lg transition"
               >
                  Next
               </button>

            </div>
         </div>
      </div>
   )
}

export default ExecutionSteps