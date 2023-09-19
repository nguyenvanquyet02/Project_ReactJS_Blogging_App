import React, { useEffect, useState } from "react";
import { Button, Input, Label, Field, Radio, ImageUpload, Toggle } from "../../index";
import { Dropdown } from "../../base/dropdown";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import slugify from 'slugify'
import { postStatus } from "../../../utils/constants";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { useFirebaseImage } from "../../../hooks";
import { useAuth } from "../../../contexts/auth-context";
import { toast } from "react-toastify";

const PostAddNewStyles = styled.div``;
const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit, getValues, reset, formState: { isValid, isSubmitting } } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categoryId: "",
      hot: false,
      image: ""
    },
  });
  const { userInfo } = useAuth();
  const [categories, setCategoties] = useState([]);
  const [selectCategory, setSelectCategoty] = useState("");
  const watchStatus = watch("status");
  const watchHot = watch("hot");

  //custom hook is used for handling firebase image
  const {
    image,
    handleResetImage,
    progress,
    handleSelectImage,
    handleDeleteImage
  } = useFirebaseImage(setValue, getValues);

  // get categories data
  useEffect(() => {
    document.title = "Blogging App - Add new post"
    async function getData() {
      const colRef = collection(db, "categories")
      const q = query(colRef, where("status", "==", 1))
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data()
        })
      });
      setCategoties(result);
    }
    getData();
  }, [])
  // this function is used for submitting form add new post image
  const addPostHandler = async (values) => {
    if (!isValid) return;
    try {
      values.slug = slugify(values.title || values.slug, { lower: true });
      values.status = +values.status;
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...values,
        image,
        userId: userInfo.uid,
        createdAt: serverTimestamp(),
      })
      toast.success("Create new post successfully!!!");
      reset({
        title: "",
        slug: "",
        status: postStatus.PENDING,
        categoryId: "",
        hot: false,
        image: ""
      });
      // reset image
      handleResetImage();
      setSelectCategoty({});
    } catch (error) {
      console.log(error);
    } finally {
    }

  }
  //this func is used for selecting item for dropdown
  const handleClickOptionDropdown = (item) => {
    setValue("categoryId", item.id);
    setSelectCategoty(item)
  }
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
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
            <ImageUpload name="image" onChange={handleSelectImage} progress={progress} image={image} handleDeleteImage={handleDeleteImage} />
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
                <Toggle on={watchHot === true} onClick={() => setValue("hot", !watchHot)}></Toggle>
              </Field>
              <Field>
                <div className="w-[300px]">
                  <Label className="mb-2 inline-block">Category</Label>
                  <Dropdown >
                    <Dropdown.Select placeholder={`${selectCategory?.name || "Select category"}`}></Dropdown.Select>
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
        <Button
          type="submit"
          className="mx-auto mt-10"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
