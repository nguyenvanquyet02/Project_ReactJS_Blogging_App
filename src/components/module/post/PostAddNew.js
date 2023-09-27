import React, { useEffect, useState } from "react";
import { Button, Input, Label, Field, Radio, ImageUpload, Toggle } from "../../index";
import { Dropdown } from "../../base/dropdown";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import slugify from 'slugify'
import { postStatus, userRole } from "../../../utils/constants";
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { useFirebaseImage } from "../../../hooks";
import { useAuth } from "../../../contexts/auth-context";
import { toast } from "react-toastify";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import { useMemo } from "react";
import axios from "axios";
import { imgbbAPI } from "../../../config/apiConfig";


Quill.register("modules/imageUploader", ImageUploader);

const schema = yup.object({
  title: yup.string().required("Title of the post is a required field!!!"),
  slug: yup.string(),
  image_name: yup.string().required("Image of the post is a required field!!!")
}).required();

const PostAddNewStyles = styled.div``;
const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit, getValues, reset, formState: { errors, isValid, isSubmitting } } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      status: +postStatus.PENDING,
      category: {},
      hot: false,
      image: "",
      user: {}
    },
    resolver: yupResolver(schema)
  });
  const { userInfo } = useAuth();
  const [categories, setCategoties] = useState([]);
  const [selectCategory, setSelectCategoty] = useState("");
  const [content, setContent] = useState("");
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  // handle validate form
  useEffect(() => {
    const arrErrors = Object.values(errors)
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
      })
    }
  }, [errors])
  // get data user add post
  useEffect(() => {
    if (!userInfo.email) return;
    async function getDataUser() {
      const q = query(collection(db, "users"), where("email", "==", userInfo.email))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        setValue("user", {
          id: doc.id,
          ...doc.data()
        })
      })
    }
    getDataUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.email]);
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
  }, []);
  // this function is used for submitting form add new post
  const addPostHandler = async (values) => {
    // if (!isValid) return;
    try {
      values.slug = slugify(values.slug || values.title, { lower: true });
      values.status = +values.status;
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...values,
        image,
        content,
        createdAt: serverTimestamp(),
      })
      toast.success("Create new post successfully!!!");
      reset({
        title: "",
        slug: "",
        content: "",
        status: +postStatus.PENDING,
        category: {},
        hot: false,
        image: "",
        user: {}
      });
      // reset image
      handleResetImage();
      setSelectCategoty({});
      console.log(values)
    } catch (error) {
      toast.error("Create post failed!!!");
      console.log(error);
    }
  }
  //this func is used for selecting item for dropdown
  const handleClickOptionDropdown = async (item) => {
    // get data category of post
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data()
    })
    // set de hien thi giao dien
    setSelectCategoty(item)
  };
  // input content upload image
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        // imgbbAPI
        upload: async (file) => {
          console.log("upload: ~ file", file);
          const bodyFormData = new FormData();
          console.log("upload: ~ bodyFormData", bodyFormData);
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: imgbbAPI,
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }), []);
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Write new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 gap-x-10 mb-2">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
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
            {+userInfo?.role === userRole.ADMIN && <Field>
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
            </Field>}
            <div className="flex justify-between items-center">
              {+userInfo?.role === userRole.ADMIN && <Field>
                <Label>Feature post</Label>
                <Toggle on={watchHot === true} onClick={() => setValue("hot", !watchHot)}></Toggle>
              </Field>}
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
        <Field>
          <Label>Content</Label>
          <div className="w-full entry-content">
            <ReactQuill
              modules={modules}
              theme="snow"
              value={content}
              onChange={setContent} />
          </div>
        </Field>
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
