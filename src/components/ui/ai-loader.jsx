import React from 'react';

const loaderStyles = `
.loader-wrapper {
  color: #fff;
  -webkit-user-select: none;
  user-select: none;
  background-color: transparent;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 170px;
  display: flex;
  position: relative;
  filter: drop-shadow(0 0 25px rgba(251, 191, 36, 0.65)) drop-shadow(0 0 50px rgba(245, 158, 11, 0.45));
}
.loader {
  aspect-ratio: 1;
  z-index: 0;
  background-color: transparent;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  animation: 2s linear infinite loader-rotate;
  position: absolute;
  top: 0;
  left: 0;
}
@keyframes loader-rotate {
  0% {
    transform: rotate(90deg);
    box-shadow: 
      inset 0 10px 20px #ffffff, 
      inset 0 25px 35px #fde047, 
      inset 0 50px 50px #fbbf24, 
      inset 0 75px 65px #f59e0b, 
      inset 0 95px 75px #78350f;
  }
  50% {
    transform: rotate(270deg);
    box-shadow: 
      inset 0 10px 20px #ffffff, 
      inset 0 25px 35px #fbbf24, 
      inset 0 50px 50px #f59e0b, 
      inset 0 75px 65px #2dd4bf, 
      inset 0 95px 75px #0f766e;
  }
  to {
    transform: rotate(450deg);
    box-shadow: 
      inset 0 10px 20px #ffffff, 
      inset 0 25px 35px #fde047, 
      inset 0 50px 50px #fbbf24, 
      inset 0 75px 65px #f59e0b, 
      inset 0 95px 75px #78350f;
  }
}
`;

export const AiLoader = ({ className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <style>{loaderStyles}</style>
      <div className="loader-wrapper">
        <div className="loader" />
      </div>
    </div>
  );
};

export default AiLoader;
