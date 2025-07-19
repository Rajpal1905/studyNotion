import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Navbar } from './components/common/Navbar'
import { OpenRoute } from './components/core/Auth/OpenRoute'
import { ForgotPassword } from './pages/ForgotPassword'
import { UpdatePassword } from './pages/UpdatePassword'
import { VerifyEmail } from './pages/VerifyEmail'

function App() {
  return (
    <div className=' w-screen min-h-screen flex flex-col bg-richblack-900 font-inter  '>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path='login'
          element={
            <OpenRoute>
              <Login
                formType={'login'} />
            </OpenRoute>

          }
        />


        <Route
          path='signup'
          element={
            <OpenRoute>
              <Signup formType={'signup'} />
            </OpenRoute>
          }
        />
        <Route
          path='forget-password'
          element={
            <OpenRoute>
              <ForgotPassword  />
            </OpenRoute>
          }
        />
        <Route
          path='verify-email'
          element={
            <OpenRoute>
              <VerifyEmail  />
            </OpenRoute>
          }
        />
        <Route
          path='update-password/:id'
          element={
            <OpenRoute>
              <UpdatePassword  />
            </OpenRoute>
          }
        />


      </Routes>
    </div>
  )
}

export default App