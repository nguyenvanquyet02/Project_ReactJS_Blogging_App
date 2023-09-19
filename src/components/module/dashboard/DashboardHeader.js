import { Button } from "../../index";
import React from "react";
import styled from "styled-components";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px 40px;
  border-bottom: 1px solid #eee;
  display: flex;
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
  return (
    <DashboardHeaderStyles>
      <div className="sidebar-logo">
        <img srcSet="/logo.png 2x" alt="" />
        <span>Blogging App</span>
      </div>
      <div className="flex items-center gap-6">
        <Button to="/dashboard" className="header-button" height="52px">
          Write new post
        </Button>
        <div className="header-avatar">
          <img
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
            alt=""
          />
        </div>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;