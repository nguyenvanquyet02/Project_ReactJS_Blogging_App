import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { DashboardHeading } from "../dashboard";
import { categoryStatus } from "../../../utils/constants";
import { Button, Field, FieldCheckboxes, Input, Label, Radio } from "../../index";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

const CategoryUpdate = () => {
  const { control, watch, reset, handleSubmit, formState: { isValid, isSubmitting } } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: categoryStatus.APPROVED,
      createdAt: new Date()
    }
  })
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const watchStatus = watch("status");
  const navigate = useNavigate();
  // get data category
  useEffect(() => {
    async function getDataCategory() {
      const colRef = doc(db, "categories", categoryId);
      const category = await getDoc(colRef);
      // reset cac truong ui ve cac gia tri lay duoc
      reset(category.data());
    }
    getDataCategory();
  }, [categoryId, reset])
  if (!categoryId) return null;

  // this func is used for updating category
  const handleUpdateCategory = async (values) => {
    if (!isValid) return;
    try {
      const colRef = doc(db, "categories", categoryId);
      await updateDoc(colRef, {
        name: values.name,
        slug: slugify(values.slug || values.name, { lower: true }),
        status: +values.status
      })
      toast.success("Update category successfully!!!");
      navigate("/manage/category");
    } catch (error) {
      toast.error("Update category failed!!!");
      console.log(error);
    }
  }

  return (
    <div>
      <DashboardHeading title="Update category" desc={`Update your category id: ${categoryId}`}></DashboardHeading>
      <form
        onSubmit={handleSubmit(handleUpdateCategory)}
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
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
