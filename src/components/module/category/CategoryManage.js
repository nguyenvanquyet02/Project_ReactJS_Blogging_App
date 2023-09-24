import { collection, deleteDoc, doc, getDocs, limit, onSnapshot, query, startAfter, where } from "firebase/firestore";
import { ActionDelete, ActionEdit, ActionView } from "../../action";
import { Button, LabelStatus, Table } from "../../index";
import { DashboardHeading } from "../dashboard";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-config";
import { categoryStatus, userRole } from "../../../utils/constants";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useAuth } from "../../../contexts/auth-context";

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState({});
  const [total, setTotal] = useState(0);
  const categoryPerPage = 3;
  // get category list from colection "categories" firebase and load more
  useEffect(() => {
    async function fetchData() {
      const colref = collection(db, "categories");
      const newRef = filter
        ? query(
          colref,
          where("name", ">=", filter),
          where("name", "<=", filter + "utf8")
        )
        : query(colref, limit(categoryPerPage));

      const documentSnapshots = await getDocs(newRef);

      // Get the last visible document (truoc)
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colref, snapshot => {
        setTotal(snapshot.size)
      })
      // sd onSnapshot - realtime
      onSnapshot(newRef, snapshot => {
        const result = [];
        snapshot.forEach(doc => {
          result.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setCategoryList(result);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);
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

  // this func is used for handling debounce input filter
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 1000)

  // this func is used for handling load more category
  const handleLoadMoreCategory = async () => {
    // Construct a new query starting at this document,
    const nextRef = query(collection(db, "categories"),
      startAfter(lastDoc || 0),
      limit(categoryPerPage));
    onSnapshot(nextRef, snapshot => {
      const result = [];
      snapshot.forEach(doc => {
        result.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setCategoryList([...categoryList, ...result]);
    });
    const documentSnapshots = await getDocs(nextRef);

    // Get the last visible document (truoc)
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    // set lai last doc truoc do
    setLastDoc(lastVisible);
  }
  // phan quyen chi admin moi ca the truy cap
  const { userInfo } = useAuth();
  if (+userInfo.role !== userRole.ADMIN) return null;
  return (
    <>
      <div className="flex justify-between">
        <DashboardHeading
          title="Categories"
          desc="Manage your category"
        ></DashboardHeading>
        <Button to="/manage/add-category" >Create category</Button>
      </div>
      <div className="mb-6 flex justify-end">
        <input
          type="text"
          placeholder="Search category..."
          className="py-4 px-5 border border-gray-400 rounded-lg"
          onChange={handleInputFilter}
        />
      </div>
      <div className="max-h-[300px] overflow-y-scroll">
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
              <td title={category.id}>{category.id.slice(0, 6) + "..."}</td>
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
      </div>

      {total > categoryList.length && <Button className='mx-auto mt-6' style={{ width: "200px" }} onClick={handleLoadMoreCategory}>Load more</Button>}
    </>
  );
};

export default CategoryManage;
