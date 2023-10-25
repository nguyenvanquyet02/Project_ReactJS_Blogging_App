import slugify from "slugify";
import { categoryStatus, userRole } from "../../../utils/constants";
import { Button, Radio, Field, Input, Label, FieldCheckboxes } from "../../index";
import { DashboardHeading } from "../dashboard";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/auth-context";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Name of the category is a required field!!!"),
  slug: yup.string(),
}).required();
const CategoryAddNew = () => {
  const {
    control,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
    handleSubmit
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: categoryStatus.APPROVED,
      createdAt: new Date()
    },
    resolver: yupResolver(schema)
  });
  // handle validate form
  useEffect(() => {
    const arrErrors = Object.values(errors)
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
      })
    }
  }, [errors]);
  const watchStatus = watch("status");
  // this func is used for adding new category
  const handleAddNewCategory = async (values) => {
    if (!isValid) return;
    values.status = +values.status;
    values.slug = slugify(values.slug || values.name, { lower: true });
    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...values,
        createdAt: serverTimestamp(),// realtime
      });
      toast.success("Create new category successfully!!!");
      // reset form
      reset({
        name: "",
        slug: "",
        status: categoryStatus.APPROVED,
        createdAt: new Date()
      })
    } catch (error) {
      toast.error("Creating a new category failed!!!")
      console.log("ERROR: ", error);
    }
  }
  // phan quyen chi admin moi ca the truy cap
  const { userInfo } = useAuth();
  if (+userInfo.role !== userRole.ADMIN) return null;
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form
        onSubmit={handleSubmit(handleAddNewCategory)}
        autoComplete="off"
      >
        <div className="mb-5">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout mt-6">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="mx-auto mt-10"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
