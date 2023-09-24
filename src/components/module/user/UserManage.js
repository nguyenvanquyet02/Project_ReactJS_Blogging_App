import { Button } from "../../index";
import { DashboardHeading } from "../dashboard";
import React from "react";
import UserTable from "./UserTable";
import { useAuth } from "../../../contexts/auth-context";
import { userRole } from "../../../utils/constants";

const UserManage = () => {
  // phan quyen chi admin moi ca the truy cap
  const { userInfo } = useAuth();
  if (+userInfo.role !== userRole.ADMIN) return null;
  return (
    <div>
      <div className="flex justify-between mb-10">
        <DashboardHeading
          title="Users"
          desc="Manage your user"
        ></DashboardHeading>
        <Button kind="primary" to="/manage/add-user">
          Add new user
        </Button>
      </div>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
