import { Route, Routes } from 'react-router-dom'
import './App.css'
import  {Home}  from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Navbar } from './components/common/Navbar'

function App() {
  return (
    <div className = ' w-screen min-h-screen flex flex-col bg-richblack-900 font-inter  '>
    <Navbar/> 
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/login' element={ <Login formType={'login'}/>}/>
      <Route path='/signup' element={<Signup formType={'signup'}/>}/>
     </Routes>
    </div>
  )
}

export default App