import React,{useState, useEffect} from 'react'
import {MDBCard, MDBCardBody, MDBInput, MDBValidation, MDBBtn, MDBIcon, MDBSpinner} from 'mdb-react-ui-kit';
import { useNavigate} from 'react-router-dom'
import Styles from '../Styles/Login.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updatepassword } from '../redux/features/authSlice';


const initialState={
    email: "",
    password: "",
    confirmPassword: ""
}

const UpdatePass = () => {
    const [formData, setFormData] = useState(initialState);
    const {email, password, confirmPassword} = formData;
    const {loading, error } = useSelector((state)=>({...state.auth}))
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
          error && toast.error(error);
    },[error])

    const handleSubmit=(e)=>{
          e.preventDefault();
          if(password !== confirmPassword){
              return toast.error("Password should match!");
          }
          if(email && password){
            console.group(formData);
            dispatch(updatepassword({formData, navigate, toast}));
          }
    }
    const handleChange=(e)=>{
        let {name , value} = e.target;
        setFormData({...formData,[name]:value});
    }
    
  return (
    <div className= {Styles.loginWrapper}>
        <MDBCard alignment='center'>
            <MDBIcon fas icon='user-circle' className='fa-2x'/>
            <h5>Reset Password</h5>
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                     <div className="col-md-12">
                        <MDBInput value={email} label="Email" type="email" name="email" onChange={handleChange} required invalid validation="Please provide your email" />
                     </div>
                     <div className='col-md-12'>   
                        <MDBInput value={password} label="Password" type="password" name="password" onChange={handleChange} required invalid validation="Please provide your password"/>
                     </div>
                      <div className='col-md-12'>   
                        <MDBInput value={confirmPassword} label="Confirm Password" type="password" name="confirmPassword" onChange={handleChange} required invalid validation="Please confirm your password"/>
                     </div>
                     <div className="col-12">
                        <MDBBtn className='mt-2' style={{width:"100%"}}>
                            {loading && (<MDBSpinner size="sm" role="status" tag="span" className='me-2'/>)}
                            Reset
                        </MDBBtn>
                     </div>
                </MDBValidation>
            </MDBCardBody>
        </MDBCard>
    </div>
  )
}

export default UpdatePass
