import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../Styles/SignUp.module.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { signup } from "../redux/features/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { firstName, lastName, email, username, password, confirmPassword } =
    formValue;
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password should match");
    }
    if (email && password && firstName && lastName && username) {
      dispatch(signup({ formValue, navigate, toast }));
    }
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div className={Styles.signupWrapper}>
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-6">
              <MDBInput
                value={firstName}
                label="First name"
                type="text"
                name="firstName"
                onChange={handleChange}
                required
                invalid
                validation="Please provide first name"
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                value={lastName}
                label="Last name"
                type="text"
                name="lastName"
                onChange={handleChange}
                required
                invalid
                validation="Please provide last name"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                value={email}
                label="Email"
                type="email"
                name="email"
                onChange={handleChange}
                required
                invalid
                validation="Please provide your email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                value={username}
                label="Username"
                type="text"
                name="username"
                onChange={handleChange}
                required
                invalid
                validation="Please provide your username"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                value={password}
                label="Password"
                type="password"
                name="password"
                onChange={handleChange}
                required
                invalid
                validation="Please provide your password"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                value={confirmPassword}
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                required
                invalid
                validation="Please confirm your password"
              />
            </div>
            <div className="col-12">
              <MDBBtn className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Sign up
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already have an account? Sign In!</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default SignUp;
