import React,{ useEffect } from 'react';
import './App.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {Routes, Route} from 'react-router-dom'; 
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Header from './Components/Header';
import { useDispatch } from 'react-redux';
import{ setUser}  from './redux/features/authSlice';
import ShareXplore from './Pages/ShareXplore';
import Xplore from './Pages/Xplore';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './Components/PrivateRoute';
import NotFound from './Pages/NotFound';
import TagXplores from './Pages/TagXplores';
import Profile from './Pages/Profile';
import EditProfile from './Pages/EditProfile';
import UpdatePass from './Pages/UpdatePass';

function App() {

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
   
   useEffect(()=>{
      dispatch(setUser(user));
   },[])


  return (
    <div className="App">
        <Header />
        <ToastContainer />
         <Routes>
             <Route path="/" element={<Home/>}></Route>
             <Route path="xplore/search" element={<Home/>}></Route>
             <Route path="xplore/search/:tag" element={<TagXplores/>}></Route>
             <Route path="signup" element={<SignUp/>}></Route>
             <Route path="login" element={<Login />}></Route>
             <Route path="editPassword" element={<UpdatePass/>}></Route>
             <Route path="profile" element={<Profile/>}></Route>
             <Route path="profile/edit" element={<EditProfile/>}></Route>
             <Route path="share" element={<PrivateRoute><ShareXplore/></PrivateRoute>}></Route>
             <Route path="edit/:id" element={<PrivateRoute><ShareXplore/></PrivateRoute>}/>
             <Route path="xplore/:id" element={<Xplore/>}></Route>
             <Route path="dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
             <Route path="*" element={<NotFound/>}></Route>
         </Routes>
    </div>
  );
}

export default App;
