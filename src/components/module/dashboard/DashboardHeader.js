import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../../contexts/auth-context";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px 40px;
  z-index: 100;
  border-bottom: 1px solid #eee;
  display: flex;
  position: sticky;
  top: 0;
  right: 0;
  align-items: center;
  justify-content: space-between;
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
      border: 1px solid #eee;
    }
  }
  .sidebar-logo {
    display: flex;
    align-items: center;
    font-weight: 600;
    gap: 0 20px;
    img {
      max-width: 40px;
    }
  }
`;

const DashboardHeader = () => {
  const { userInfo } = useAuth();
  return (
    <DashboardHeaderStyles>
      <Link to="/">
        <div className="sidebar-logo">
          <img srcSet="/logo.png 2x" alt="" />
          <span>Blogging App</span>
        </div>
      </Link>
      <div className="flex items-center gap-6">

        <div className="header-avatar">
          <Link to="/profile">
            <img
              src={userInfo?.avatar}
              alt={userInfo?.username}
            />
          </Link>
        </div>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
