import React from "react";
import { MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

const Likes = ({ likes }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const id = user?._id;
  console.log(likes);
  if (likes.length > 0) {
    return likes.find((like) => like === id) ? (
      <>
        <MDBIcon fas icon="thumbs-up" />
        &nbsp;
        {likes.length > 2 ? (
          <MDBTooltip tag="a" title={`You and ${likes.length - 1} other likes`}>
            {likes.length} Likes
          </MDBTooltip>
        ) : (
          `${likes.length} like${likes.length > 1 ? "s" : ""}`
        )}
      </>
    ) : (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp; {likes.length} {likes.length === 1 ? "like" : "likes"}
      </>
    );
  }
  return (
    <>
      <MDBIcon far icon="thumbs-up" />
      &nbsp; Like
    </>
  );
};

export default Likes;
