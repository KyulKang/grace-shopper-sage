import React from "react";
import { Link } from "react-router-dom";

const BackToProfile = (props) => {
  const { id } = props;

  return (
    <div>
      <Link to={`/user/${id ? id : ""}`}>Back to Profile</Link>
    </div>
  );
};

export default BackToProfile;
