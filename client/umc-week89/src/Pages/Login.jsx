// Login.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, loginSuccess, loginFailure } from "../Redux/actions";
import "../Login.css";
import axios from "axios";
import PropTypes from "prop-types";

const Login = ({ setIsLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /.*/; // /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[com]{2,}$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value) => {
    const passwordRegex = /.*/; // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(value);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    if (!validateEmail(email)) {
      alert("올바른 이메일 주소 형식이 아닙니다.");
      return;
    }

    if (!validatePassword(password)) {
      alert("영문, 숫자, 특수문자 조합 8자리 이상이어야 합니다.");
      return;
    }

    dispatch(loginRequest());

    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        id: email,
        pw: password,
      });

      setTimeout(() => {
        dispatch(loginSuccess(response.data.userInfo));
        setIsLoggedIn(true); // 로그인 성공 시 isLoggedIn을 true로 설정
        navigate("/", { state: { isLoggedIn: true } });
      }, 1500);
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        let errorMessage = "로그인에 실패했습니다.";

        if (status === 400) {
          errorMessage = "아이디와 비밀번호를 입력해주세요.";
        } else if (status === 401) {
          errorMessage = "존재하지 않는 아이디입니다.";
        } else if (status === 402) {
          errorMessage = "비밀번호가 틀렸습니다.";
        }

        dispatch(loginFailure(errorMessage));
      } else {
        dispatch(loginFailure("네트워크 오류가 발생했습니다."));
      }
    }
  };

  return (
    <div className="login-page-content">
      <h2 className="login-title">로그인</h2>
      <p className="login-message">이메일과 비밀번호를 입력해주세요.</p>
      {/* 이메일 입력란 */}
      <label className="login-label" htmlFor="username">
        이메일 주소
      </label>
      <p>
        {/* 이메일 입력 안내 문구 */}
        <input
          className="login-input"
          id="username"
          name="username"
          value={email}
          onChange={handleEmailChange}
        />
      </p>
      {email && !validateEmail(email) && (
        <span className="error-message">
          올바른 이메일 주소 형식이 아닙니다.
        </span>
      )}

      {/* 비밀번호 입력란 */}
      <label className="login-label" htmlFor="password">
        비밀번호
      </label>
      <p>
        {/* 비밀번호 입력 안내 문구 */}
        <input
          className="login-input"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </p>
      {password && !validatePassword(password) && (
        <span className="error-message">
          영문, 숫자, 특수문자 조합 8자리 이상이어야 합니다.
        </span>
      )}

      {/* 로그인 버튼 */}
      <button
        className="login-btn2"
        title="로그인"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "확인"} {/* 항상 "확인"으로 유지 */}
      </button>
      <div className="login-links">
        {/* 로그인 링크들 */}
        <Link className="a1" to="/signin" title="회원가입">
          회원가입
        </Link>
        <span className="separator">|</span> {/* 구분선 */}
        <Link className="a1" to="/lookfor" title="아이디/비밀번호 찾기">
          아이디/비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};

Login.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired, // prop-types 추가
};

export default Login;
