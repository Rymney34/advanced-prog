
import { useNavigate } from "react-router-dom";
import React from "react";

const withRouter = (WrappedComponent) => {
  return function WithRouter(props) {
    const navigate = useNavigate();
    return <WrappedComponent {...props} navigate={navigate} />;
  };
};

export default withRouter;
