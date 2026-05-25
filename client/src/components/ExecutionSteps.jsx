
const ExecutionSteps = ({ steps }) => {
   return (
      <div className="mt-10 space-y-6">
         <h2 className="text-3xl font-bold">
            Step-by-Step execution
         </h2>
         {steps.map((stepData) => (
            <div
               key={stepData.step}
               className="bg-zinc-800 border border-zinc-700 rounded-xl"
            >
               <h3 className="text-xl font-semibold mb-2">
                  {stepData.title}
               </h3>
               <p className="text-zinc-300 mb-6">
                  {stepData.description}
               </p>

               {stepData.array && (
                  <div className="flex gap-3 flex-wrap">
                     {stepData.array.map((value, index) => {
                        const isHighlighted = stepData.highlights?.includes(index)

                        return (
                           <div
                              key={index}
                              className={`w-14 h-14 rounded-lg flex items-center justify-center font-bold text-lg transition ${isHighlighted ? "bg-blue-600" : "bg-zinc-700"}`}
                           >
                              {value}
                           </div>
                        )
                     })}
                  </div>
               )}
            </div>
         ))}
      </div>
   )
}

export default ExecutionSteps