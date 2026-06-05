import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
   const navigate = useNavigate()
   const location = useLocation()
   const { user, logout } = useAuth()

   const handleLogout = () => {
      logout()
      navigate('/login')
   }

   const isActive = (path) => location.pathname === path

   return (
      <nav className='border-b border-[#2a2a2a] bg-[#0e0e0e] px-6 py-3 flex items-center justify-between'>
         <Link to='/' className='font-mono text-sm font-semibold text-[#e8e8e8] tracking-tight'>
            walkthrough
         </Link>

         <div className='flex items-center gap-1'>
            <Link
               to='/'
               className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${isActive('/')
                     ? 'text-[#e8e8e8] bg-[#1e1e1e]'
                     : 'text-[#666] hover:text-[#aaa]'
                  }`}
            >
               home
            </Link>
            <Link
               to='/history'
               className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${isActive('/history')
                     ? 'text-[#e8e8e8] bg-[#1e1e1e]'
                     : 'text-[#666] hover:text-[#aaa]'
                  }`}
            >
               history
            </Link>

            <div className='w-px h-4 bg-[#2a2a2a] mx-2' />

            {user?.name && (
               <span className='text-xs font-mono text-[#555] mr-2'>{user.name}</span>
            )}

            <button
               onClick={handleLogout}
               className='px-3 py-1.5 text-xs font-mono rounded border border-[#2a2a2a] text-[#666] hover:border-[#5a1f1f] hover:text-[#e05a5a] transition-colors'
            >
               logout
            </button>
         </div>
      </nav>
   )
}

export default Navbar