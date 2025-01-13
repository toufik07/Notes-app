import React from 'react'
import { Link , useLocation} from 'react-router-dom'

function Navbar() {
  const location = useLocation();

  const isActive = (path)=>location.pathname === path

  return (
    <div className='bg-slate-600 text-white flex justify-around font-bold md:w-3/4 m-auto gap-4'>
    <Link to={'/'} className={` p-2
      ${isActive('/')? 'text-white bg-slate-950':'text-slate-950'}
    `}>Home</Link>
    <Link to={'/pastes'} className={` p-2
      ${isActive('/pastes')? 'text-white bg-slate-950':'text-slate-950'}
    `}
    >Pastes</Link>
  </div>
  )
}

export default Navbar
