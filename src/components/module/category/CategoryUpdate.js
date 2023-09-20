import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import Swal from "sweetalert2";
import { DashboardHeading } from "../dashboard";
import { categoryStatus } from "../../../utils/constants";
import { Button, Field, FieldCheckboxes, Input, Label, Radio } from "../../index";

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
  useEffect(() => {

  }, [])
  if (!categoryId) return null;
  // this func is used for updating category
  const handleUpdateCategory = async (categoryId) => {
    if (!isValid) return;
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
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
