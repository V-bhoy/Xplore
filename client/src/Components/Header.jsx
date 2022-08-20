import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../redux/features/authSlice";
import { searchxplore } from "../redux/features/xploreSlice";
import { useNavigate , Link} from "react-router-dom";
import Styles from "../Styles/Header.module.css";
import xplore from "../Images/xplore.png";

const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const { user, profile } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchxplore(search));
      navigate(`/xplore/search?q=${search}`);
      setSearch("");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <MDBNavbar fixed="top" expand="lg" className={Styles.navbar}>
      <MDBContainer>
        <MDBNavbarBrand href="/" className={Styles.title}>
          XPlore
          <img src={xplore} alt="xplore-icon" className={Styles.icon} />
        </MDBNavbarBrand>
        <div className={Styles.searchBox}>
          <form
            className={`d-flex input-group w-auto  ${Styles.search}`}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="input-group-append">
              <span
                className="input-group-text"
                style={{ backgroundColor: "rgb(230,230,250)" }}
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                {" "}
                <MDBIcon fas icon="search" className={Styles.searchIcon} />
              </span>
            </div>
          </form>
        </div>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShow(!show)}
        >
          <MDBIcon fas icon="bars" />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav
            right
            fullWidth={false}
            className={`mb-2 mb-lg-0 ${Styles.right}`}
          >
            <MDBNavbarItem>
              <Link to="/">
                <p className={Styles.link}>Home</p>
              </Link>
            </MDBNavbarItem>
            {user?._id && (
              <>
                <MDBNavbarItem>
                  <Link to="/share">
                    <p className={Styles.link}>Share</p>
                  </Link>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <Link to="/dashboard">
                    <p className={Styles.link}>Dashboard</p>
                  </Link>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <Link to="/profile">
                    {profile?.profileUrl ? (
                      <img
                        src={profile?.profileUrl}
                        alt="user-profile"
                        className={Styles.mainProfile}
                      />
                    ) : (
                      <MDBIcon fas icon="user" className={Styles.profile} />
                    )}
                  </Link>
                </MDBNavbarItem>
              </>
            )}
            {user?._id ? (
              <MDBNavbarItem>
                <Link to="/">
                  <MDBIcon
                    icon="sign-out-alt"
                    onClick={handleLogout}
                    className={Styles.logout}
                  />
                </Link>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <Link to="/login">
                  <p className={Styles.link}>Login</p>
                </Link>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
