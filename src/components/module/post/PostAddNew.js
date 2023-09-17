import { Button, Input, Label, Field, Radio, ImageUpload } from "../../index";
import { Dropdown } from "../../base/dropdown";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import slugify from 'slugify'
import { postStatus } from "../../../utils/constants";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { addDoc, collection } from "firebase/firestore";

const PostAddNewStyles = styled.div``;
// storage firebase
const storage = getStorage();
const PostAddNew = () => {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const { control, watch, setValue, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      image: "",
      author: "",
      status: 2,
      category: "",
    },
  });
  // this function is used for submitting form add new post image
  const addPostHandler = async (values) => {
    values.slug = slugify(values.title || values.slug);
    values.status = +values.status;
    // const colRef = collection(db, "posts");
    // await addDoc(colRef, {
    //   title: "",
    //   slug: "",
    //   image: "",
    //   author: "",
    //   status: 2,
    //   category: "",
    // })
    // handleUploadImage(values.image);
  }
  // this function is used for loading image return downloadURL
  const handleUploadImage = (file) => {
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", (snapshot) => {
      const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progressPercent + "% done");
      setProgress(progressPercent);
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused!");
          break;
        case "running":
          console.log("Upload is running!");
          break;
        default:
          console.log("Nothing at all!!!");
          break;
      }
    },
      (error) => {
        console.log("ERROR: ", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at ", downloadURL);
          setImage(downloadURL);
        })
      })
  }
  // this function is used for selecting image and setValue image field
  const handleOnSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image", file)
    handleUploadImage(file);
  }
  const watchStatus = watch("status");
  const watchCategory = watch("category");
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
            <ImageUpload name="image" onChange={handleOnSelectImage} progress={progress} image={image} />
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === postStatus.APPROVED}
                onClick={() => setValue("status", "approved")}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === postStatus.PENDING}
                onClick={() => setValue("status", "pending")}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === postStatus.REJECTED}
                onClick={() => setValue("status", "reject")}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>

        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-2">
          <Field>
            <Label>Author</Label>
            <Input control={control} placeholder="Find the author" name="author"></Input>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Option>Knowledge</Dropdown.Option>
              <Dropdown.Option>Blockchain</Dropdown.Option>
              <Dropdown.Option>Setup</Dropdown.Option>
              <Dropdown.Option>Nature</Dropdown.Option>
              <Dropdown.Option>Developer</Dropdown.Option>
            </Dropdown>
          </Field>

        </div>
        <Button type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
