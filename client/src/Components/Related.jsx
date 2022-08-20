import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../Styles/Related.module.css";

const Related = ({ relatedXplores, xploreId }) => {
  const navigate = useNavigate();
  return (
    <>
      {relatedXplores && relatedXplores.length > 0 && (
        <>
          {relatedXplores.length > 1 && (
            <h4
              className="mb-4"
              style={{ fontWeight: "bold", color: "rgb(145, 95, 109)" }}
            >
              Related Xplores
            </h4>
          )}
          <MDBRow className="row-cols-sm-1 row-cols-md-3 g-4">
            {relatedXplores
              .filter((elem) => elem._id !== xploreId)
              .splice(0, 3)
              .map((elem, index) => (
                <MDBCol key={index}>
                  <MDBCard>
                    <Link to={`/xplore/${elem._id}`}>
                      <MDBCardImage
                        src={elem.imageUrl}
                        alt={elem.title}
                        position="top"
                        className={Styles.image}
                      />
                    </Link>
                    <MDBCardBody>
                      <MDBCardTitle className={`text-start ${Styles.title}`}>
                        {elem.title}
                      </MDBCardTitle>
                      <MDBCardText className={`text-start ${Styles.location}`}>
                        {elem.location}
                      </MDBCardText>
                      <MDBBtn
                        size="sm"
                        rounded
                        color="info"
                        onClick={() => {
                          navigate(`/xplore/${elem._id}`);
                        }}
                        className={Styles.btn}
                      >
                        Know More
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
        </>
      )}
    </>
  );
};

export default Related;
