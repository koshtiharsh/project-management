import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface initialStateTypes {
    isSidbarCollapse:boolean;
    isDarkMode : boolean;
}

const initialState:initialStateTypes ={
    isSidbarCollapse:false,
    isDarkMode: false
}


export const globalSlice = createSlice({
    name:'global',
    initialState,
    reducers:{
        setIsSidebarCollapsed:(state,action: PayloadAction<boolean>)=>{
            state.isSidbarCollapse = action.payload;
        },
        setIsDarkMode:(state,action: PayloadAction<boolean>)=>{
            state.isDarkMode = action.payload;
        },
    }

})



export const {setIsDarkMode,setIsSidebarCollapsed} = globalSlice.actions;

export default globalSlice.reducer;