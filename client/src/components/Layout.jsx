import Navbar from "./Navbar"

const Layout = ({ children }) => {
   return (
      <div className="min-h-screen bg-zinc-950">
         <Navbar />
         <main>
            {children}
         </main>
      </div>
   )
}

export default Layout