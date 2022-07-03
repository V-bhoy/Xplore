import React,{useState, useEffect} from 'react';
import {MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner} from 'mdb-react-ui-kit';
import {Link, useNavigate} from 'react-router-dom'
import Styles from '../Styles/Login.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../redux/features/authSlice';

const initialState={
    username: "",
    password: ""
}


const Login = () => {
    const [formValue, setFormValue] = useState(initialState);
    const {username, password} = formValue;
    const {loading, error } = useSelector((state)=>({...state.auth}))
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
          error && toast.error(error);
    },[error])

    const handleSubmit=(e)=>{
          e.preventDefault();
          if(username && password){
            dispatch(login({formValue, navigate, toast}));
          }
    }
    const handleChange=(e)=>{
        let {name , value} = e.target;
        setFormValue({...formValue,[name]:value});
    }

  return (
    <div className= {Styles.loginWrapper}>
        <MDBCard alignment='center'>
            <MDBIcon fas icon='user-circle' className='fa-2x'/>
            <h5>Sign In</h5>
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                     <div className="col-md-12">
                        <MDBInput value={username} label="Username" type="text" name="username" onChange={handleChange} required invalid validation="Please provide your username" />
                     </div>
                     <div className='col-md-12'>   
                        <MDBInput value={password} label="Password" type="password" name="password" onChange={handleChange} required invalid validation="Please provide your password"/>
                     </div>
                     <div className="col-12">
                        <MDBBtn className='mt-2' style={{width:"100%"}}>
                            {loading && (<MDBSpinner size="sm" role="status" tag="span" className='me-2'/>)}
                            Login
                        </MDBBtn>
                     </div>
                </MDBValidation>
            </MDBCardBody>
            <MDBCardFooter>
                <Link to="/signup">
                    <p>Don't have an account? Sign Up!</p>
                </Link>
                <Link to="/editPassword">
                    <p>Forgot password?</p>
                </Link>
            </MDBCardFooter>
        </MDBCard>
    </div>
  )
}

export default Login