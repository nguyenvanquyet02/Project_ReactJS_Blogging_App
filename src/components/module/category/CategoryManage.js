import { collection, onSnapshot } from "firebase/firestore";
import { ActionDelete, ActionEdit, ActionView } from "../../action";
import { Button, LabelStatus, Table } from "../../index";
import { DashboardHeading } from "../dashboard";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-config";
import { categoryStatus } from "../../../utils/constants";

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const colref = collection(db, "categories");
    onSnapshot(colref, snapshot => {
      const result = [];
      snapshot.forEach(doc => {
        result.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setCategoryList(result);
    })
  }, []);
  return (
    <>
      <div className="flex justify-between">
        <DashboardHeading
          title="Categories"
          desc="Manage your category"
        ></DashboardHeading>
        <Button to="/manage/add-category" >Add category</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList?.length > 0 && categoryList.map(category =>
          (<tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>
              <span className="italic text-gray-500 cursor-pointer">{category.slug}</span>
            </td>
            <td>
              {category.status === categoryStatus.APPROVED && <LabelStatus type="success">
                Approved
              </LabelStatus>}
              {category.status === categoryStatus.UNAPPROVED && <LabelStatus type="danger">
                Unapproved
              </LabelStatus>}
            </td>
            <td>
              <div className="flex items-center gap-x-3">
                <ActionView></ActionView>
                <ActionEdit></ActionEdit>
                <ActionDelete></ActionDelete>
              </div>
            </td>
          </tr>))}
        </tbody>
      </Table>
    </>
  );
};

export default CategoryManage;
