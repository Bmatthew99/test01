import React from "react";
import Lottie from "lottie-react";
import animationData from "./animation/logos.json";

import "./Login.css";

const LoginAnimation = () => {
  return (
    <div className="login-animation-container">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default LoginAnimation;