import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deletexplore,
  getuserxplore,
  likexplore,
} from "../redux/features/xploreSlice";
import Spinner from "../Components/Spinner";
import { toast } from "react-toastify";
import good from "../Images/good.png";
import Styles from "../Styles/Dash.module.css";
import Likes from "../Components/Likes";

const Dashboard = () => {
  const { profile } = useSelector((state) => ({ ...state.auth }));
  const { userXplores, loading } = useSelector((state) => ({
    ...state.xplore,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = profile?.userId;

  useEffect(() => {
    if (id) {
      dispatch(getuserxplore(id));
    }
    // eslint-disable-next-line
  }, [id]);

  const excerpt = (str) => {
    if (str.length > 95) {
      str = str.substring(0, 95) + " ...";
    }
    return str;
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this xplore?")) {
      dispatch(deletexplore({ id, toast }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={{ marginTop: "100px" }}>
      <h4 className={`text-center ${Styles.head}`}>
        <img src={good} alt="emoji" className={Styles.emoji} />
        Dashboard: <span>{profile?.name}</span>
      </h4>
      <hr />
      <MDBContainer>
        <MDBRow className="row-cols-md-2 row-cols-lg-3 row-cols-sm-1 g-5">
          {userXplores &&
            userXplores.map((elem, index) => (
              <MDBCardGroup key={index} className="p-4">
                <MDBCard style={{ maxWidth: "22rem" }}>
                  <div className="bg-image hover-zoom hover-overlay">
                    <MDBCardImage
                      className={`rounded ${Styles.image}`}
                      src={elem.imageUrl}
                      alt={elem.title}
                    />
                    <div
                      className={`mask ${Styles.box}`}
                      style={{ background: "rgba(4,4,4,0.3)" }}
                    ></div>
                  </div>

                  <MDBCardBody>
                    <MDBCardTitle className={`text-start ${Styles.title}`}>
                      {elem.title}
                    </MDBCardTitle>
                    <MDBCardText className={`text-start ${Styles.location}`}>
                      {elem.location}
                    </MDBCardText>
                    <MDBBtn
                      onClick={() => {
                        let id = elem._id;
                        dispatch(likexplore({ id }));
                      }}
                      color="none"
                      tag="a"
                      className={Styles.btn}
                    >
                      <Likes likes={elem.likes} />
                    </MDBBtn>
                    <MDBCardText className={`text-start ${Styles.desc}`}>
                      <small className="text-muted">
                        {excerpt(elem.description)}
                      </small>
                    </MDBCardText>
                    <div className={Styles.tags}>
                      {elem.tags.map((tag) => (
                        <Link
                          to={`/xplore/search/${tag}`}
                          className={Styles.tag}
                        >
                          {" "}
                          #{tag}
                        </Link>
                      ))}
                    </div>
                    <Link to={`/xplore/${elem._id}`} className={Styles.link}>
                      Read More
                    </Link>
                    <div className={Styles.edit}>
                      <MDBBtn
                        className="mt-1"
                        tag="a"
                        color="none"
                        onClick={() => {
                          handleDelete(elem._id);
                        }}
                      >
                        <MDBIcon
                          fas
                          icon="trash"
                          size="lg"
                          style={{ marginRight: "0.8rem", cursor: "pointer" }}
                        />
                      </MDBBtn>

                      <MDBBtn
                        className="mt-1"
                        tag="a"
                        color="none"
                        onClick={() => {
                          navigate(`/edit/${elem._id}`);
                        }}
                      >
                        <MDBIcon
                          fas
                          icon="edit"
                          size="lg"
                          style={{ cursor: "pointer" }}
                        />
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCardGroup>
            ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Dashboard;
