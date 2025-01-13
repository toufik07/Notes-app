import React, { useEffect, useState } from 'react'
import { LuCopy } from 'react-icons/lu';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function View() {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const param = useParams();
    const pastes = useSelector((state)=> state.pastes.pastes)

    useEffect(() =>{
       const index = pastes.findIndex((paste)=>paste.id === param.id)
       if(index >= 0){
         setTitle(pastes[index].title)
         setContent(pastes[index].content)
       }       
    },[param.id])

    return (
        <div className=" md:w-3/4 m-auto ">
            <div className='flex mt-4 gap-5'>
                <input type="text" name="" id=""
                    placeholder='Enter title here'
                    className=' text-white border-[1.1px] p-1 
            w-full rounded-md focus:outline-none 
            border-slate-500 bg-gray-900 pl-2 focus:border-white'
                    value={title}
                    disabled
                    onChange={(e) => { setTitle(e.target.value) }}
                />
            </div>

            <div className="flex mt-4 flex-col">
                <div className=" flex justify-between
                bg-slate-600 text-white rounded-t-md 
                border-slate-600 border-[1.1px]">
                    <div className="flex p-1 mt-1">
                        <div className="w-3 h-3 rounded-xl border mr-1 bg-red-500 border-none"></div>
                        <div className="w-3 h-3 rounded-xl border mr-1 bg-yellow-500 border-none"></div>
                        <div className="w-3 h-3 rounded-xl border mr-1 bg-green-500 border-none"></div>
                    </div>
                    <LuCopy className=' m-2'
                       onClick={()=>{
                        navigator.clipboard.writeText(content)
                        toast.success("text copied to clipboard")
                      }}
                    />
                </div>
                <textarea name="" id=""
                    className=' border-[1.1px] w-full focus:outline-none 
                  border-slate-500 rounded-md p-2   
                  bg-gray-900 text-white focus:border-white
                    border-t-0 rounded-t-none'
                    placeholder='Enter Content here'
                    rows={15}
                    value={content}
                    disabled
                    onChange={(e) => { setContent(e.target.value) }}
                >
                </textarea>
            </div>
        </div>

    )
}

export default View
