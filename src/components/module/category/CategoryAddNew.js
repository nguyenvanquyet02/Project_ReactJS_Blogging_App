import slugify from "slugify";
import { categoryStatus } from "../../../utils/constants";
import { Button, Radio, Field, Input, Label, FieldCheckboxes } from "../../index";
import { DashboardHeading } from "../dashboard";
import React from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { toast } from "react-toastify";

const CategoryAddNew = () => {
  const {
    control,
    watch,
    reset,
    formState: { isSubmitting, isValid },
    handleSubmit
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: categoryStatus.APPROVED,
      createdAt: new Date()
    }
  });
  const watchStatus = watch("status");
  const handleAddNewCategory = async (values) => {
    if (!isValid) return;
    values.status = +values.status;
    values.slug = slugify(values.name, { lower: true });
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
    } finally {
    }
  }
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
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
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
