import React, { useState } from "react";
import {
  MDBValidation,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { updateprofile } from "../redux/features/authSlice";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import Styles from "../Styles/EditProfile.module.css";
import edit from "../Images/edit.png";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({});
  const { profile } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const userId = profile?.userId;
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedProfile = profileData;
    dispatch(updateprofile({ updatedProfile, userId, toast, navigate }));
    setProfileData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 0) {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  return (
    <MDBContainer>
      <MDBCard
        className={Styles.wrapper}
        style={{ backgroundColor: "rgb(230,230,250)" }}
      >
        <MDBCardTitle
          style={{
            color: "rgb(145, 95, 109)",
            fontWeight: "bold",
            fontSize: "1.8rem",
          }}
        >
          <img src={edit} alt="edit-emoji" className={Styles.emoji} />
          Edit your Profile
        </MDBCardTitle>
        <MDBCardBody>
          <div className="d-flex p-3">
            <p style={{ fontWeight: "800", marginRight: "2rem" }}>
              Choose your profile-pic:
            </p>
            <FileBase
              type="file"
              id="profile-image"
              multiple={false}
              onDone={({ base64 }) => {
                const updatedProfile = { profileUrl: base64 };
                dispatch(
                  updateprofile({ updatedProfile, userId, toast, navigate })
                );
              }}
            />
          </div>
          <MDBValidation className="row g-3" noValidate onSubmit={handleEdit}>
            <div className="col-md-12">
              <MDBInput
                label="Website"
                name="website"
                type="text"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Bio"
                type="text"
                name="bio"
                onChange={handleChange}
                className="form-control"
                rows="4"
                textarea
                required
                invalid
                validation="Please enter your bio"
              />
            </div>
            <div className="col-md-12">
              <MDBBtn>Edit</MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default EditProfile;
