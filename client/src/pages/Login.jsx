import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth.js"
import { loginUser } from "../services/authServices"

const Login = () => {
   const navigate = useNavigate()

   const [formData, setFormData] = useState({
      email: "",
      password: ""
   })
   const [error, setError] = useState("")

   const { login } = useAuth()

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
      if (error) setError("")
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setError("")
      try {
         const data = await loginUser(formData)

         login(data.user, data.token)

         navigate('/')
      } catch (err) {
         const errMessage = err.response?.data?.message
         setError(errMessage)
         console.log(err)
      }
   }

   return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
         <form onSubmit={handleSubmit} className="bg-zinc-800 p-8 rounded-xl w-full max-w-md space-y-4">
            <h1 className="text-3xl font-bold">
               Login
            </h1>
            {error &&
               <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm font-medium">
                  {error}
               </div>
            }
            <input
               type="email"
               name="email"
               placeholder="email"
               value={formData.email}
               onChange={handleChange}
               className="w-full px-4 py-3 rounded-lg bg-zinc-700"
            />
            <input
               type="password"
               name="password"
               placeholder="password"
               value={formData.password}
               onChange={handleChange}
               className="w-full px-4 py-3 rounded-lg bg-zinc-700"
            />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg">
               Login
            </button>
            <div className="text-center">
               Create Account
               <Link
                  to="/register"
                  className="text-blue-500 hover:underline"
               >
                  Register
               </Link>
            </div>
         </form>
      </div>
   )
}

export default Login