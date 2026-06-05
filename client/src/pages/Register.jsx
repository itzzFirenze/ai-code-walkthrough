import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../services/authServices.js"
import { useAuth } from "../hooks/useAuth.js"

const Register = () => {
   const navigate = useNavigate()

   const { login } = useAuth()

   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: ""
   })
   const [error, setError] = useState("")

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
      if (error) setError("")
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setError("")
      try {
         const data = await registerUser(formData)

         login(data.user, data.token)

         navigate('/')
      } catch (err) {
         const errMessage = err.response?.data?.message || "Something went wrong"
         setError(errMessage)
         console.log(err)
      }
   }

   return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
         <form onSubmit={handleSubmit} className="bg-zinc-800 p-8 rounded-xl w-full max-w-md space-y-4">
            <h1 className="text-3xl font-bold">
               Register
            </h1>
            {error &&
               <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm font-medium">
                  {error}
               </div>
            }
            <input
               type="text"
               name="name"
               placeholder="name"
               value={formData.name}
               onChange={handleChange}
               className="w-full px-4 py-3 rounded-lg bg-zinc-700"
            />
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
               Register
            </button>
            <div className="text-center">
               Already have an account?
               <Link
                  to="/login"
                  className="text-blue-500 hover:underline"
               >
                  Login
               </Link>
            </div>
         </form>
      </div>
   )
}

export default Register