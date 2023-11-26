// LoginBtn.jsx

import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const LoginBtn = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      // 로그아웃 시
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="login-control">
      <button className="login-btn" onClick={handleClick}>
        {isLoggedIn ? "로그아웃" : "로그인"}
      </button>
    </div>
  );
};

LoginBtn.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired, // 로그아웃 함수 prop-types에 추가
};

export default LoginBtn;
