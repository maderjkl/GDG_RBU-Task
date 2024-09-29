
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import UserLogin from './pages/userlogin'
import UserSignup from './pages/userSignu'
import AdminLogin from './pages/AdminLogin'
import AddMovie from './pages/Adminpanel'
import { Toaster } from 'react-hot-toast'
function App() {
  

  return (
    <>
    <Routes>
      <Route path="/home" element={<Homepage />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/signup" element={<UserSignup />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/addmovie" element={<AddMovie />} />

    </Routes>
    <Toaster/>
    </>
  )
}

export default App
