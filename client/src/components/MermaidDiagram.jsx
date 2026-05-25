import { useEffect, useRef } from "react"
import mermaid from 'mermaid'

mermaid.initialize({
   startOnLoad: true,
   theme: "dark",
   securityLevel: "loose"
})

const MermaidDiagram = ({ chart }) => {
   const chartRef = useRef(null)

   useEffect(() => {
      const renderDiagram = async () => {
         if (!chartRef.current || !chart) return

         try {
            const id = `mermaid-${Date.now()}`
            const { svg } = await mermaid.render(id, chart)

            chartRef.current.innerHTML = svg
         } catch (error) {
            console.log("Mermaid render error:", error)

            chartRef.current.innerHTML = `
               <p style="color:red;">
                  Failed to render diagram
               </p>
            `
         }
      }
      renderDiagram()
   }, [chart])

   return (
      <div
         ref={chartRef}
         className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 overflow-x-auto"
      />
   )
}

export default MermaidDiagram