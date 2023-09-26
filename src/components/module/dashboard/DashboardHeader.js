import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../../contexts/auth-context";
import { userRole } from "../../../utils/constants";
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
    img {
      width: 52px;
      height: 52px;
      object-fit: cover;
      border-radius: 100rem;
      border: 1px solid #eee;
    }
    .userInfo{
      display: flex;
      align-items: center;
      column-gap: 12px;

      .infor{
        flex: 1;
        h3{
          font-weight: 700;
        }
        p{
          font-size: 14px;
          color: #ccc;
        }
      }
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
const renderRole = (role) => {
  switch (role) {
    case userRole.ADMIN:
      return "Admin"
    case userRole.USER:
      return "User"
    case userRole.MOD:
      return "Moderator"
    default:
      break;
  }
}
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
            <div className="userInfo">
              <img
                src={userInfo?.avatar}
                alt={userInfo?.username}
              />
              <div className="infor">
                <h3>{userInfo?.fullname}</h3>
                <p>{renderRole(+userInfo?.role)}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
