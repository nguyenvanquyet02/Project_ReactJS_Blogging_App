// import { Table } from "../components";
import React from "react";
import { useAuth } from "../contexts/auth-context";
import { userRole } from "../utils/constants";

const DashboardPage = () => {
  // phan quyen chi admin moi ca the truy cap
  const { userInfo } = useAuth();
  if (+userInfo.role !== userRole.ADMIN) return null;
  return (
    <div>
      <h1 className="dashboard-heading">Dashboard page</h1>
    </div>
  );
};

export default DashboardPage;
