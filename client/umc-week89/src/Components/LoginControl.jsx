import React, { useState } from "react";

const LoginControl = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setLoggedIn(true);
  };

  const handleLogoutClick = () => {
    setLoggedIn(false);
  };

  return (
    <div className="login-control">
      {isLoggedIn ? (
        <div className="login-content">
          <button className="login-btn" onClick={handleLogoutClick}>
            로그아웃
          </button>
          <div className="welcome-message">
            <p>환영합니다!</p>
          </div>
        </div>
      ) : (
        <div className="login-content">
          <button className="login-btn" onClick={handleLoginClick}>
            로그인
          </button>
          <div className="welcome-message">
            <p>로그인 해주세요!</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default LoginControl;
