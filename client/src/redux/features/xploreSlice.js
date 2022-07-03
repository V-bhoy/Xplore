import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from '../api';

export const createxplore  = createAsyncThunk("xplore/createxplore", async({updatedXploreData,navigate,toast},{rejectWithValue})=>{
   try{
      console.log(updatedXploreData);
      const res = await api.createXPlore(updatedXploreData);
      console.log(res);
      toast.success("Added your xplore!");
      navigate("/");
      return res.data;
   }
   catch(error){
      console.log(error);
      return rejectWithValue(error.response.data);
   }
})

export const getxplore  = createAsyncThunk("xplore/getxplore", async(page,{rejectWithValue})=>{
    try{
       const res = await api.getXPlore(page);
       return res.data;
    }
    catch(error){
       return rejectWithValue(error.response.data);
    }
 });

 export const getsinglexplore  = createAsyncThunk("xplore/getsinglexplore", async(id,{rejectWithValue})=>{
    try{
       const res = await api.getSingleXPlore(id);
       return res.data;
    }
    catch(error){
       return rejectWithValue(error.response.data);
    }
 });

 export const getuserxplore  = createAsyncThunk("xplore/getuserxplore", async(id,{rejectWithValue})=>{
    try{
       const res = await api.getUserXPlores(id);
       return res.data;
    }
    catch(error){
       return rejectWithValue(error.response.data);
    }
 });

 export const deletexplore  = createAsyncThunk("xplore/deletexplore", async({id,toast},{rejectWithValue})=>{
    try{
       const res = await api.deleteXplore(id);
       toast.success("Xplore deleted successfully");
       return res.data;
    }
    catch(error){
       return rejectWithValue(error.response.data);
    }
 });

 export const updatexplore  = createAsyncThunk("xplore/updatexplore", async({id,updatedXplore, toast, navigate},{rejectWithValue})=>{
    try{
       const res = await api.updateXPlore(updatedXplore, id);
       toast.success("Xplore updated successfully");
       navigate("/");
       return res.data;
    }
    catch(error){
       return rejectWithValue(error.response.data);
    }
 });

 export const searchxplore  = createAsyncThunk("xplore/searchxplore", async(search,{rejectWithValue})=>{
    try{
       const res = await api.getXploreBySearch(search);

       return res.data;
    }
    catch(error){
       return rejectWithValue(error.response.data);
    }
 });
 export const tagxplore  = createAsyncThunk("xplore/tagxplore", async(tag,{rejectWithValue})=>{
    try{
       const res = await api.getTagXplore(tag);

       return res.data;
    }
    catch(error){
       return rejectWithValue(error.response.data);
    }
 });
 export const getrelatedxplore  = createAsyncThunk("xplore/getrelatedxplore", async(tags,{rejectWithValue})=>{
    try{
       const res = await api.getRelatedXplore(tags);

       return res.data;
    }
    catch(error){
       return rejectWithValue(error.response.data);
    }
 });

 export const likexplore  = createAsyncThunk("xplore/likexplore", async({id},{rejectWithValue})=>{
    try{
       const res = await api.likeXplore(id);
       return res.data;
    }
    catch(error){
       return rejectWithValue(error.response.data);
    }
 });

const initialState = {
    xplore: {},
    xplores:[],
    userXplores:[],
    tagXplores:[],
    relatedXplores:[],
    currentPage: 1,
    numberOfPages: null,
    loading: false,
    error: ""
}

const xploreSlice = createSlice({
    name: "xplore",
    initialState,
    reducers:{
         setCurrentPage: (state,action)=>{
             state.currentPage = action.payload ;
         }
    },
    extraReducers:{
        [createxplore.pending]:(state)=>{
            state.loading= true;
        },
        [createxplore.fulfilled]:(state,action)=>{
            state.loading=false;
            state.xplores = [action.payload];
        },
        [createxplore.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [getxplore.pending]:(state)=>{
            state.loading= true;
        },
        [getxplore.fulfilled]:(state,action)=>{
            state.loading=false;
            state.xplores = action.payload.data;
            state.numberOfPages = action.payload.numberOfPages;
            state.currentPage = action.payload.currentPage;
        },
        [getxplore.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [getsinglexplore.pending]:(state)=>{
            state.loading= true;
        },
        [getsinglexplore.fulfilled]:(state,action)=>{
            state.loading=false;
            state.xplore = action.payload;
        },
        [getsinglexplore.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [getuserxplore.pending]:(state)=>{
            state.loading= true;
        },
        [getuserxplore.fulfilled]:(state,action)=>{
            state.loading=false;
            state.userXplores = action.payload;
        },
        [getuserxplore.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [deletexplore.pending]:(state)=>{
            state.loading= true;
        },
        [deletexplore.fulfilled]:(state,action)=>{
            state.loading=false;
            const {arg: {id}} = action.meta;
            if(id){
                state.userXplores = state.userXplores.filter((elem)=>elem._id !== id);
                state.xplores = state.xplores.filter((elem)=>elem._id !== id);
            }
        },
        [deletexplore.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [updatexplore.pending]:(state)=>{
            state.loading= true;
        },
        [updatexplore.fulfilled]:(state,action)=>{
            state.loading=false;
            const {arg: {id}} = action.meta;
            if(id){
                state.userXplores = state.userXplores.map((elem)=>elem._id === id? action.payload : elem);
                state.xplores = state.xplores.map((elem)=>elem._id === id? action.payload: elem);
            }
        },
        [updatexplore.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [searchxplore.pending]:(state)=>{
            state.loading= true;
        },
        [searchxplore.fulfilled]:(state,action)=>{
            state.loading=false;
            state.xplores = action.payload;
            state.currentPage = 1;
            state.numberOfPages = 1;
        },
        [searchxplore.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [tagxplore.pending]:(state)=>{
            state.loading= true;
        },
        [tagxplore.fulfilled]:(state,action)=>{
            state.loading=false;
            state.tagXplores = action.payload;
        },
        [tagxplore.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [getrelatedxplore.pending]:(state)=>{
            state.loading= true;
        },
        [getrelatedxplore.fulfilled]:(state,action)=>{
            state.loading=false;
            state.relatedXplores = action.payload;
        },
        [getrelatedxplore.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [likexplore.pending]:(state)=>{
            state.loading = true;
        },
        [likexplore.fulfilled]:(state,action)=>{
            state.loading=false;
            console.log(action.meta);
            const {arg: {id}} = action.meta;
            if(id){
                state.xplores = state.xplores.map((elem)=>elem._id === id? action.payload: elem);
                state.userXplores = state.userXplores.map((elem)=>elem._id===id?action.payload: elem);
                state.tagXplores = state.tagXplores.map((elem)=>elem._id===id?action.payload: elem);
            }
        },
        [likexplore.rejected]:(state,action)=>{

            state.error = action.payload.message;
        }
    }
})

export const { setCurrentPage } = xploreSlice.actions;
export default xploreSlice.reducer;