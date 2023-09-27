import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button, Field, Input, Label, ImageUpload } from "../../index";
import { DashboardHeading } from "../dashboard";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/auth-context";
import { useFirebaseImage } from "../../../hooks";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

const UserProfile = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { isValid, isSubmitting }
  } = useForm({
    mode: "onChange",
  });
  // get data current user
  const { userInfo } = useAuth();
  //get data user
  useEffect(() => {
    async function getDataUser() {
      if (!userInfo.uid) return;
      const colRef = doc(db, "users", userInfo.uid);
      const userData = await getDoc(colRef);
      reset(userData && userData.data());
    };
    getDataUser();
  }, [userInfo.uid, reset]);
  // delete avatar to update new avatar
  const deleteAvatar = async () => {
    const colRef = doc(db, "users", userInfo.uid);
    await updateDoc(colRef, {
      avatar: ""
    })
  }
  // get and set new avatar
  const imageUrl = getValues("avatar");
  const imageRegex = (/%2F(\S+)\?/gm).exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } = useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  //reset image 
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  // update user
  const handleUpdateUser = async (values) => {
    if (getValues("password") !== userInfo.password) {
      if (getValues("password") !== getValues("confirmPassword")) {
        toast.error("New password and confirmation password must be the same!!!");
        console.log("New password and confirmation password must be the same!!!")
        return;
      }
    }
    if (!isValid) return;
    try {
      const colRef = doc(db, "users", userInfo.uid);
      await updateDoc(colRef, {
        ...values,
        avatar: image
      });
      toast.success("Update user successfully!!!");
    }
    catch (error) {
      console.log(error);
      toast.error("Update user failed!!!");
    }
  }
  return (
    <div>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="text-center mb-10">
          <ImageUpload
            className="!w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            image={image}
          />
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Date of Birth</Label>
            <Input
              control={control}
              type="date"
              name="birthday"
              placeholder="dd/mm/yyyy"
            ></Input>
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
          <Field></Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>New Password</Label>
            <Input
              control={control}
              name="password"
              type="password"
              placeholder="Enter your password"
            ></Input>
          </Field>
          <Field>
            <Label>Confirm Password</Label>
            <Input
              control={control}
              name="confirmPassword"
              type="password"
              placeholder="Enter your confirm password"
            ></Input>
          </Field>
        </div>
        <Button
          kind="primary"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="mx-auto w-[200px]"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
