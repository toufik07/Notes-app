import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='bg-slate-600 text-white flex justify-around font-bold md:w-3/4 m-auto'>
    <Link to={'/'} className=' p-2'>Home</Link>
    <Link to={'/pastes'} className=' p-2'>Pastes</Link>
  </div>
  )
}

export default Navbar
