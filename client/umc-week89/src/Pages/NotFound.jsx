import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h2>해당 페이지를 찾지 못했습니다.</h2>
      <p>주소가 잘못되었거나 더 이상 제공되지 않는 페이지입니다.</p>
      <p>
        <Link to="/" className="to-main-page">
          메인 페이지로 이동
        </Link>
      </p>
      <Outlet />
    </div>
  );
}
