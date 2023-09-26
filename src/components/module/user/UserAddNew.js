import React from "react";
import { useForm } from "react-hook-form";
import { userRole, userStatus } from "../../../utils/constants";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import slugify from "slugify";
import { toast } from "react-toastify";

import { Button, Radio, Field, FieldCheckboxes, Input, Label, ImageUpload } from "../../index";
import { DashboardHeading } from "../dashboard";
import { useFirebaseImage } from "../../../hooks";
import { useAuth } from "../../../contexts/auth-context";
import { useEffect } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  fullname: yup.string().required("Fullname is a required field!!!"),
  email: yup.string().email().required("Please enter your email!"),
  password: yup.string().min(8, "Your password must be at least 8 characters").required("Please enter your password!"),
}).required();

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      status: userStatus.ACTIVE,
      role: userRole.USER
    },
    resolver: yupResolver(schema)
  });
  const {
    image,
    progress,
    handleResetImage,
    handleSelectImage,
    handleDeleteImage

  } = useFirebaseImage(setValue, getValues);
  const watchStatus = watch("status");
  const watchRole = watch("role");
  // handle validate form
  useEffect(() => {
    const arrErrors = Object.values(errors)
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
      })
    }
  }, [errors])
  // this func is used for creating new user
  const handleCreateUser = async (values) => {
    if (!isValid) return;
    try {
      // tạo user trong authentiaction trước
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      // tạo data trong colection users tương ứng trong db
      await addDoc(collection(db, "users"), {
        fullname: values.fullname,
        username: slugify(values.username || values.fullname, {
          lower: true,
          replacement: " ",
          trim: true
        }),
        avatar: image,
        email: values.email,
        password: values.password,
        status: +values.status,
        role: +values.role,
        createdAt: serverTimestamp()
      })
      toast.success("Create new user successfully!!!")
      // reset image upload
      handleResetImage();
      // reset form
      reset({
        fullname: "",
        username: "",
        email: "",
        password: "",
        status: userStatus.ACTIVE,
        role: userRole.USER
      })
    } catch (error) {
      toast.error("Create new user failed!!!")
      console.log(error);
    }
  };
  // phan quyen chi admin moi ca the truy cap
  const { userInfo } = useAuth();
  if (+userInfo.role !== userRole.ADMIN) return null;
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
          <ImageUpload
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            image={image}
            progress={progress}
            className="!rounded-full h-full"
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={+watchRole === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={+watchRole === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={+watchRole === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
