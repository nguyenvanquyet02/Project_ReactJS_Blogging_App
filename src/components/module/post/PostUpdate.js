import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Button, Field, ImageUpload, Input, Label, Radio, Toggle } from "../../index";
import { Dropdown } from "../../base/dropdown";
import { categoryStatus, postStatus } from "../../../utils/constants";
import { toast } from "react-toastify";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { useFirebaseImage } from "../../../hooks";
// using react quill to update content field
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const PostUpdate = () => {
  // get param id of post
  const [params] = useSearchParams();
  const postId = params.get("id");

  //field of react-hook-form
  const {
    control,
    watch,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { isValid, isSubmitting }
  } = useForm({
    mode: "onChange"
  })
  //watch hot and status of post
  const watchHot = watch("hot");
  const watchStatus = watch("status");
  const { image,
    progress,
    setImage,
    // handleResetImage,
    handleSelectImage,
    handleDeleteImage } = useFirebaseImage(setValue, getValues)
  const [selectCategory, setSelectCategoty] = useState({});
  const [categories, setCategoties] = useState([]);
  const [content, setContent] = useState("");
  // get data of post with post id
  useEffect(() => {
    async function getDataPost() {
      const docRef = doc(db, "posts", postId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data()) {
        reset(docSnapshot.data());
        setSelectCategoty(docSnapshot.data()?.category || "");
        setImage(docSnapshot.data()?.image)
      }
    }
    getDataPost();
  }, [postId, reset]);

  // get data of category
  useEffect(() => {
    async function getDataCategories() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", +categoryStatus.APPROVED));
      const querySnapshot = await getDocs(q);
      let results = [];
      querySnapshot.forEach(category => {
        results.push({
          id: category.id,
          ...category.data()
        })
      })
      setCategoties(results);
    }
    getDataCategories();
  }, []);
  // this func is used for updating post
  const handleUpdatePost = async (values) => {
    if (!isValid) return;
    try {
      const docRef = doc(db, "posts", postId);
      await updateDoc(docRef, {
        content,
      })


      toast.success("Update post successfully!!!");
    } catch (error) {
      toast.error("Update post failed!!!")
    }
  }
  //this func is used for selecting item for dropdown
  const handleClickOptionDropdown = async (item) => {
    // get data category of post
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    // setvalue cho categoryfield of form update
    setValue("category", {
      id: docData.id,
      ...docData.data()
    })
    // set de hien thi giao dien
    setSelectCategoty(item);
  }
  console.log(categories);
  if (!postId) return null;
  return (
    <div>
      <h1 className="dashboard-heading">Update post</h1>
      <form onSubmit={handleSubmit(handleUpdatePost)}>
        <div className="grid grid-cols-2 gap-x-10 mb-2">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-2">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              name="image"
              image={image}
              progress={progress}
              handleDeleteImage={handleDeleteImage}
              onChange={handleSelectImage}
            />
          </Field>
          <div className="flex flex-col gap-y-8">
            <Field>
              <Label>Status</Label>
              <div className="flex items-center gap-x-5">
                <Radio
                  name="status"
                  control={control}
                  checked={+watchStatus === postStatus.APPROVED}
                  value={postStatus.APPROVED}
                >
                  Approved
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={+watchStatus === postStatus.PENDING}
                  value={postStatus.PENDING}
                >
                  Pending
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={+watchStatus === postStatus.REJECTED}
                  value={postStatus.REJECTED}
                >
                  Reject
                </Radio>
              </div>
            </Field>
            <div className="flex justify-between items-center">
              <Field>
                <Label>Feature post</Label>
                <Toggle
                  on={watchHot === true} onClick={() => setValue("hot", !watchHot)}
                />
              </Field>
              <Field>
                <div className="w-[300px]">
                  <Label className="mb-2 inline-block">Category</Label>
                  <Dropdown >
                    <Dropdown.Select
                      placeholder={`${selectCategory?.name || "Select category"}`}
                    ></Dropdown.Select>
                    <Dropdown.List>
                      {categories?.length > 0 && categories.map(category => (
                        <Dropdown.Option
                          key={category.id}
                          onClick={() => handleClickOptionDropdown(category)}
                        >
                          {category.name}
                        </Dropdown.Option>
                      ))}
                    </Dropdown.List>
                  </Dropdown>
                </div>
              </Field>
            </div>
          </div>
        </div>
        <div>
          <Field>
            <Label>Content</Label>
            <div className="w-full entry-content">
              <ReactQuill theme="snow" value={content} onChange={setContent} />
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto mt-10"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update post
        </Button>
      </form>
    </div>);
};

export default PostUpdate;
