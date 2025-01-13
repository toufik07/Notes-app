import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

export const pasteSlice = createSlice({
    name: 'pastes',

    initialState: {
        pastes: localStorage.getItem("pastes")
            ? JSON.parse(localStorage.getItem("pastes"))
            : []
    },

    reducers: {
        // add paste
        addToPaste: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item)=>item.title === paste.title)
            console.log(index);
            
            if (index < 0) {
                state.pastes.push(paste);
                localStorage.setItem("pastes",
                    JSON.stringify(state.pastes)
                )
                toast.success("paste created Successfully")
            }
            else{
                toast.error("title should not be similar")
            }
        },

        // update paste
        updatePaste: (state, action) => {
           
            const paste = action.payload;
            const index = state.pastes.findIndex((item)=>item.id === paste.id)

            if(index >= 0){
                state.pastes[index] = paste;

                localStorage.setItem("pastes",
                    JSON.stringify(state.pastes)
                );

                toast.success("paste updated")
            }
        },

        // removing all paste
        removeAllPaste: (state, action) => {
           state.pastes = [];
           localStorage.removeItem("pastes");
           toast.success("all pastes are removed")
        },

        // remove paste
        removePaste: (state, action) => {
           const paste = action.payload;
           const index = state.pastes.findIndex((item)=>item.id === paste.id)

           if(index >= 0){
            state.pastes.splice(index,1);

            localStorage.setItem("pastes",
                JSON.stringify(state.pastes)
            )
            toast.success("paste removed")
           }
        },

    },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updatePaste, removeAllPaste, removePaste } = pasteSlice.actions

export default pasteSlice.reducer