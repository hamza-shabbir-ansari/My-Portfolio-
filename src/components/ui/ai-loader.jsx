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
  width: 76px;
  height: 76px;
  display: flex;
  position: relative;
  filter: drop-shadow(0 0 16px rgba(251, 191, 36, 0.5)) drop-shadow(0 0 30px rgba(245, 158, 11, 0.3));
}
@media (min-width: 640px) {
  .loader-wrapper {
    width: 84px;
    height: 84px;
  }
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
      inset 0 4px 8px #ffffff, 
      inset 0 10px 14px #fde047, 
      inset 0 20px 20px #fbbf24, 
      inset 0 30px 26px #f59e0b, 
      inset 0 38px 30px #78350f;
  }
  50% {
    transform: rotate(270deg);
    box-shadow: 
      inset 0 4px 8px #ffffff, 
      inset 0 10px 14px #fbbf24, 
      inset 0 20px 20px #f59e0b, 
      inset 0 30px 26px #2dd4bf, 
      inset 0 38px 30px #0f766e;
  }
  to {
    transform: rotate(450deg);
    box-shadow: 
      inset 0 4px 8px #ffffff, 
      inset 0 10px 14px #fde047, 
      inset 0 20px 20px #fbbf24, 
      inset 0 30px 26px #f59e0b, 
      inset 0 38px 30px #78350f;
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
