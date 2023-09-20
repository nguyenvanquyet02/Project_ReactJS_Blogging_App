import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { ActionDelete, ActionEdit, ActionView } from "../../action";
import { Button, LabelStatus, Table } from "../../index";
import { DashboardHeading } from "../dashboard";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-config";
import { categoryStatus } from "../../../utils/constants";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  // get category list from colection "categories" firebase
  useEffect(() => {
    const colref = collection(db, "categories");
    // sd onSnapshot - realtime
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

  // this func is used for deleting category
  const handleDeleteCategory = async (categoryId) => {
    try {
      const colRef = doc(db, "categories", categoryId)
      // coding poppup confirm delete category
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(colRef);
          Swal.fire(
            'Deleted!',
            'Your category has been deleted.',
            'success'
          )
          toast.success("Delete category successfully!!!")
        }
      })
    } catch (error) {
      toast.error("ERROR! Delete category failed!!!")
    }
  }
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
                <ActionEdit onClick={() => navigate(`/manage/update-category?id=${category.id}`)}></ActionEdit>
                <ActionDelete onClick={() => handleDeleteCategory(category.id)}></ActionDelete>
              </div>
            </td>
          </tr>))}
        </tbody>
      </Table>
    </>
  );
};

export default CategoryManage;
