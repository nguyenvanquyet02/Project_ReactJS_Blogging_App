import React from 'react';
import { useState } from 'react';
import { LabelStatus, Table } from '../../index';
import { useEffect } from 'react';
import { ActionEdit, ActionDelete } from '../../action'
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';
import { userRole, userStatus } from '../../../utils/constants';
const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getDataUsers() {
      const colRef = collection(db, "users");
      onSnapshot(colRef, snapshot => {
        const result = [];
        snapshot.forEach(doc => {
          result.push({
            id: doc.id,
            ...doc.data()
          })
        });
        setUserList(result);
      })
    }
    getDataUsers();
  }, []);
  const handleDeleteUser = () => { }
  const renderRoleLabel = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin"
      case userRole.MOD:
        return "Moderator"
      case userRole.USER:
        return "User"
      default:
        return "User"
    }
  }
  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type='success'>Active</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type='danger'>Rejected</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type='warning'>Pending</LabelStatus>;

      default:
        break;
    }
  }
  const rederUserItem = (user) => {
    if (!user) return null;
    console.log(user);
    return (
      <tr key={user.id}>
        <td title={user.id}>{user.id.slice(0, 6) + "..."}</td>
        <td>
          <div className='flex items-center gap-x-3'>
            <img
              src={user.avatar} alt={user.fullname}
              className='flex-shrink-0 object-cover w-10 h-10 rounded-md'
            />
            <spdivan className='flex-1'>
              <h3 className='font-semibold'>{user.fullname}</h3>
              <time className='text-xs text-gray-400'>
                {new Date(user.createdAt.seconds * 1000).toLocaleDateString("vi-VI")}
              </time>
            </spdivan>
          </div>
        </td>
        <td>{user.username}</td>
        <td>{user.email.split("@")[0] + "@..."}</td>
        <td>{renderLabelStatus(+user.status)}</td>
        <td>{renderRoleLabel(+user.role)}</td>
        <td>
          <div className="flex items-center gap-x-3">
            <ActionEdit onClick={() => navigate(`/manage/update-user?id=${user.id}`)}></ActionEdit>
            <ActionDelete onClick={() => handleDeleteUser(user.id)}></ActionDelete>
          </div>
        </td>
      </tr>)
  }
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Infor</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList?.length > 0 && userList.map(user => rederUserItem(user))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;