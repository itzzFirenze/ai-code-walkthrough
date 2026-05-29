import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import History from './pages/History'

const App = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route
               path='/login'
               element={<Login />}
            />
            <Route
               path='/register'
               element={<Register />}
            />
            <Route
               path='/'
               element={
                  <ProtectedRoute>
                     <Home />
                  </ProtectedRoute>
               }
            />
            <Route
               path='/history'
               element={
                  <ProtectedRoute>
                     <History />
                  </ProtectedRoute>
               }
            />
         </Routes>
      </BrowserRouter>
   )
}

export default App