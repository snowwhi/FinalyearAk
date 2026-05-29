import Navbar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
       <div className="flex flex-col min-h-dvh">
      <Navbar />
      <main className="grow relative overflow-hidden pt-16 md:pt-20 bg-[#F8FAFC]">
        <Outlet />
      </main>
      <Footer /> 
    </div>
</>
  )
}

export default Layout