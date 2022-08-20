import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBValidation,
  MDBSpinner,
  MDBInput,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Styles from "../Styles/Share.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createxplore, updatexplore } from "../redux/features/xploreSlice";
import joy from "../Images/joy.png";

const initialState = {
  title: "",
  location: "",
  description: "",
  tags: [],
};

const ShareXplore = () => {
  const [xploreData, setXploreData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const { title, location, description, tags } = xploreData;
  const { error, loading, userXplores } = useSelector((state) => ({
    ...state.xplore,
  }));
  const { profile } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleXplore = userXplores.find((elem) => elem._id === id);
      setXploreData({ ...singleXplore });
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tags.length) {
      setTagErrMsg("Please provide some tags");
    }
    if (title && description && tags && location) {
      if (!id) {
        const updatedXploreData = {
          ...xploreData,
          creator: profile?.username,
          owner: profile?.userId,
        };
        dispatch(createxplore({ updatedXploreData, navigate, toast }));
      } else {
        const updatedXplore = { ...xploreData };
        dispatch(updatexplore({ updatedXplore, navigate, toast, id }));
      }

      handleClear();
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setXploreData({ ...xploreData, [name]: value });
  };
  const handleAddTag = (tag) => {
    setTagErrMsg(null);
    setXploreData({ ...xploreData, tags: [...xploreData.tags, tag] });
  };
  const handleDelTag = (deltag) => {
    setXploreData({
      ...xploreData,
      tags: xploreData.tags.filter((tag) => tag !== deltag),
    });
  };
  const handleClear = () => {
    setXploreData({
      title: "",
      location: "",
      description: "",
      tags: [],
    });
  };
  return (
    <div>
      <MDBCard
        alignment="center"
        className={Styles.shareWrapper}
        style={{ backgroundColor: "rgb(230,230,250)" }}
      >
        <h5 className={Styles.title}>
          <img src={joy} alt="emoji" className={Styles.emoji} />
          {id ? "Update XPlore" : "Share Your XPlore"}
        </h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <MDBInput
                label="Title"
                type="text"
                value={title}
                name="title"
                onChange={handleChange}
                className="form-control"
                required
                invalid
                validation="Please provide title"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Location"
                type="text"
                value={location}
                name="location"
                onChange={handleChange}
                className="form-control"
                required
                invalid
                validation="Please provide location"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Description"
                type="text"
                value={description}
                name="description"
                onChange={handleChange}
                className="form-control"
                rows="4"
                required
                invalid
                textarea
                validation="Please provide description"
              />
            </div>
            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDelTag(tag)}
              />
              {tagErrMsg && <div>{tagErrMsg}</div>}
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => {
                  setXploreData({ ...xploreData, imageUrl: base64 });
                }}
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default ShareXplore;
