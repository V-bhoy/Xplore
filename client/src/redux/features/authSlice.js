import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from '../api'


export const login = createAsyncThunk("auth/login",async({formValue, navigate,toast},{rejectWithValue})=>{
    try{
         const res = await api.Login(formValue);
         toast.success("Login Successfully");
         navigate("/");
         return res.data;
    }
    catch(err){
       return rejectWithValue(err.response.data);
    }
})
export const signup = createAsyncThunk("auth/signup",async({formValue, navigate,toast},{rejectWithValue})=>{
    try{
         const res = await api.Signup(formValue);
         toast.success("Signed Up Successfully");
         navigate("/login");
         return res.data;
    }
    catch(err){
       return rejectWithValue(err.response.data);
    }
})
export const getfav = createAsyncThunk("auth/getfav",async(_,{rejectWithValue})=>{
    try{
        const res = await api.getFav();
        return res.data;
    }
    catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const updateprofile = createAsyncThunk("auth/updateprofile", async({updatedProfile,userId,toast,navigate},{rejectWithValue})=>{
    try{
          const res = await api.updateProfile(updatedProfile, userId);
          toast.success("Updated profile successfully");
          navigate("/profile");
          return res.data.profile;
    }
    catch(err){
        return rejectWithValue(err.response.data);
     }
})
export const updatefav = createAsyncThunk("auth/updatefav",async(id,{rejectWithValue})=>{
    try{
        const res = await api.updateFav(id);
        return res.data.updated;
    }
    catch(err){
        return rejectWithValue(err.response.data);
     }
})
export const updatepassword = createAsyncThunk("auth/updatepassword",async({formData, navigate, toast},{rejectWithValue})=>{
    try{
        const res = await api.updatePassword(formData);
        console.log(res.data);
        toast.success("Updated successfully");
        navigate("/login");
        return res.data;
    }
    catch(err){
        return rejectWithValue(err.response.data);
    }
    
})


const initialState = {
    profile:null,
    user: null,
    favs:[],
    error:"",
    loading: false
}


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setUser : (state, action)=>{
            if(action.payload!==null){
                state.user = action.payload.user;
                state.profile = action.payload.profile;
            }
        },
        logOutUser: (state)=>{
            localStorage.clear();
            state.user = null;
            state.profile= null;
        }
    },
    extraReducers:{
        [login.pending]:(state)=>{
            state.loading=true
        },
        [login.fulfilled]:(state,action)=>{
            state.loading= false;
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
            state.user = action.payload.user;
            state.profile = action.payload.profile;
        },
        [login.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [signup.pending]:(state)=>{
            state.loading=true
        },
        [signup.fulfilled]:(state,action)=>{
            state.loading= false;
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
            state.user = action.payload.user;
            state.profile = action.payload.profile;
        },
        [signup.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [updateprofile.pending]:(state)=>{
            state.loading=true;
        },
        [updateprofile.fulfilled]:(state,action)=>{
            state.loading= false;
            const profileData = JSON.parse(localStorage.getItem('profile'));
            for(var key in profileData){
                if(key==='profile'){
                    profileData[key] = action.payload;
                }
            }
            localStorage.setItem("profile",JSON.stringify(profileData));
            state.profile = action.payload;
        },
        [updateprofile.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [getfav.pending]: (state)=>{
            state.loading = true;
        },
        [getfav.fulfilled]:(state,action)=>{
            state.loading = false;
            state.favs = action.payload;
        },
        [getfav.rejected]: (state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [updatefav.pending]:(state)=>{
            state.loading=true;
        },
        [updatefav.fulfilled]:(state,action)=>{
            state.loading= false;
            const profileData = JSON.parse(localStorage.getItem('profile'));
            for(var key in profileData){
                if(key==='profile'){
                    console.log(action.payload)
                    profileData[key] = action.payload;
                }
            }
            localStorage.setItem("profile",JSON.stringify(profileData));
            state.profile = action.payload;
        },
        [updatefav.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [updatepassword.pending]:(state)=>{
            state.loading=true;
        },
        [updatepassword.fulfilled]:(state,action)=>{
            state.loading= false;
            state.user = action.payload;
        },
        [updatepassword.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        }
    }
});

export const { setUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;