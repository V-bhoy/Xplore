import axios from 'axios';


const API = axios.create({ baseURL: "https://xplore-server.herokuapp.com"});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`
    }
    return req;
})

export const Login = (formData) => API.post("/user/login",formData);
export const Signup = (formData)=> API.post("/user/signup",formData);
export const updatePassword = (formData)=>API.patch("/user/editPassword",formData);

export const createXPlore = (formData)=> API.post("/xplore",formData);
export const getXPlore = (page)=>API.get(`/xplore?page=${page}`);
export const getSingleXPlore = (id)=>API.get(`/xplore/${id}`);
export const deleteXplore = (id)=>API.delete(`/xplore/${id}`);
export const updateXPlore = (updatedXplore,id)=>API.patch(`/xplore/${id}`,updatedXplore);
export const getUserXPlores = (id)=>API.get(`/xplore/userXplores/${id}`);

export const getXploreBySearch = (searchQuery) => API.get(`/xplore/search?q=${searchQuery}`)
export const getTagXplore = (tag)=>API.get(`/xplore/search/${tag}`);
export const getRelatedXplore = (tags)=>API.post(`/xplore/relatedXplore`,tags);
export const likeXplore = (id)=> API.patch(`/xplore/like/${id}`)

export const getFav = () => API.get("/profile/fav");
export const updateProfile = (updatedProfile, userId) => API.post(`/profile/edit/${userId}`,updatedProfile);
export const updateFav = (id) => API.patch(`/profile/fav/${id}`)