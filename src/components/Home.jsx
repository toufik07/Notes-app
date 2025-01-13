import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToPaste , updatePaste } from '../Redux/pasteSlice';
import toast from 'react-hot-toast';
import { LuCopy } from 'react-icons/lu';

function Home() {
    const [title, setTitle] = useState("");
    const [content,setContent] = useState("");
    const pastes = useSelector((state) => state.pastes.pastes)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const param = useParams()

    const submitData = ()=>{
        
        const paste = {
            title:title,
            content:content,
            id:param.id ||
               Date.now().toString(36),
            createdAt : new Date().toISOString()
        }

        if(param.id){
            // update
            dispatch(updatePaste(paste))
            navigate('/pastes')
        }
        else{
            // create
            dispatch(addToPaste(paste))
        }

        setTitle('');
        setContent('');
    }

    useEffect(()=>{
         if(param.id){
            const index = pastes.findIndex((paste) => paste.id === param.id)
            if(index >= 0){
                setTitle(pastes[index].title)
                setContent(pastes[index].content)
            }
            else{
                toast.error("id not found")
            }
         }
    },[param.id])
    return (
        <div className=" md:w-3/4 m-auto">
            <div className='flex mt-4 gap-5'>
                <input type="text" name="" id=""
                    placeholder='Enter title here'
                    className=' text-white border-[1.1px] p-1 
                    w-3/4 rounded-md focus:outline-none 
                    border-slate-500 bg-gray-900 pl-2 focus:border-white'
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                />

                <button onClick={submitData}
                className=' bg-slate-600 
                text-white p-2 rounded-md 
                w-1/4 font-bold hover:border-white
                hover:[border-width:1.1px]'>
                    {
                        param.id ? "Update Paste" : "Add Paste"
                    }
                </button>
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
                bg-gray-900 text-white focus:border-white rounded-t-none'
                placeholder='Enter Content here'
                rows={15}
                value={content}
                onChange={(e)=>{setContent(e.target.value)}}
                >
                </textarea>
            </div>
        </div>
    )
}

export default Home
