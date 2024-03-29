import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import HomePage from './page/home'
import LoginPage from './page/login'
import RegisterPage from './page/register'
import HomeAfterLogin from './page/homeAfterLogin'
import UserRegister from './page/userRegister'
import InstructorRegister from './page/instructorRegister'
import AdminOrganizationRegister from './page/adminOrganizationRegister'
import UserProfile from './page/user/userProfile'
import CertificateGenerator from './page/user/certificate/CertificateGenerator'
import HomeAfterLoginAdmin from './page/admin/homeAfterLoginAdmin'
import AllowAdmin from './page/admin/allowAdmin'
import AllowInstructor from './page/admin/allowInstructor'

const routers = createBrowserRouter(
  [
    { path:"/", element:<HomePage/>},
    { path:"/login", element:<LoginPage/>},
    { path:"/register", element:<RegisterPage/>},
    { path:"/userRegister", element:<UserRegister/>},
    { path:"/instructorRegister", element:<InstructorRegister/>},
    { path:"/adminOrganizationRegister", element:<AdminOrganizationRegister/>},
    { path:"/homeAfterLogin", element:<HomeAfterLogin/>},
    { path:"/homeAfterLoginAdmin", element:<HomeAfterLoginAdmin/>},
    { path:"/allowAdmin", element:<AllowAdmin/>},
    { path:"/allowInstructor", element:<AllowInstructor/>},
    { path:"/userProfile", element:<UserProfile/>},
    { path:"/certificateGen", element:<CertificateGenerator/>},
  ]
)


function App() {

  return( <RouterProvider router={routers}/>
  )
}

export default App
