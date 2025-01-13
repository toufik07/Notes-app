import React, { useState } from 'react'
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { FiShare } from "react-icons/fi";
import { GoEye } from "react-icons/go";
import { LuCopy } from "react-icons/lu";
import { MdDateRange } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { IoSearchOutline } from "react-icons/io5";
import { removePaste } from '../Redux/pasteSlice';
import toast from 'react-hot-toast';

function Pastes() {
    const pastes = useSelector((state) => state.pastes.pastes)
    const [search, setSearch] = useState('');
    const dispatch = useDispatch()


    const filteredData = pastes.filter((paste) =>
        paste.title.toLowerCase().includes(search.toLowerCase())
        &&
        paste.content !== ""
    );


    return (
        <div className=' m-auto bg-gray-900 md:w-3/4 border-2 mt-4 text-white border-slate-500'>

            <h1 className=' text-xl font-bold border-b-2 p-3 border-slate-500'>All Pastes</h1>

           <div className=" flex items-center mt-2 text-white 
           border-[1px] p-1 w-4/5 m-auto rounded-md focus:outline-none 
         border-slate-600 hover:border-white">
                <IoSearchOutline className=' ml-2'/>
                <input type="text" name="" id=""
                    placeholder='Search here'
                    className=' 
                    w-full  bg-gray-900 pl-2 focus:outline-none'
                    value={search}
                    onChange={(e) => { setSearch(e.target.value) }}
                    
                />

           </div>

            <div className="p-3">
                {
                    filteredData.map((paste) => {
                        return (
                            <div className=" p-2 border-[1.2px] border-slate-600 flex mb-4 flex-col sm:flex-row" key={paste.id}>
                                <div className=" sm:w-3/5 w-full p-2 text-center sm:text-start">
                                    <p className=' text-2xl'>{paste.title}</p>
                                    <p className=' text-sm'>{paste.content}</p>
                                </div>
                                <div className=" flex flex-col sm:w-2/5 items-end pr-4 m-auto">
                                    <div className=" flex">
                                        <Link to={'/'+ paste.id}
                                        className='p-1 border-[1.2px] border-slate-600 rounded-sm mr-2 bg-gray-800'><RiEdit2Line /></Link>
                                        <button onClick={()=>{dispatch(removePaste(paste))}}
                                         className='p-1 border-[1.2px] border-slate-600 rounded-sm mr-2 bg-gray-800'><RiDeleteBin6Line /></button>
                                        <button onClick={()=>{
                                            navigator.clipboard.writeText("http://localhost:3000/pastes/"+paste.id)
                                            toast.success("Link copied to clipboard")
                                        }}
                                         className='p-1 border-[1.2px] border-slate-600 rounded-sm mr-2 bg-gray-800'><FiShare /></button>
                                        <Link  to={'/pastes/'+paste.id}
                                        className='p-1 border-[1.2px] border-slate-600 rounded-sm mr-2 bg-gray-800'><GoEye /></Link>
                                        <button onClick={()=>{
                                            navigator.clipboard.writeText(paste.content)
                                            toast.success("text copied to clipboard")
                                        }}
                                        className='p-1 border-[1.2px] border-slate-600 rounded-sm bg-gray-800'><LuCopy /></button>
                                    </div>
                                    <div className=" flex items-center p-2 gap-1">
                                        <MdDateRange />
                                        {paste.createdAt.split('T')[0]}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Pastes
