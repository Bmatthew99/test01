import React from "react";
import Lottie from "lottie-react";
import animationData2 from "./animation/emoji.json"; // Вторая анимация
import "./Login.css"; // Подключаем стили

const SecondAnimation = () => {
  return (
    <div className="second-animation-container">
      <Lottie 
        animationData={animationData2} loop={true} />
    </div>
  );
};

export default SecondAnimation;