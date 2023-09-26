import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImg from "./PostImg";
import slugify from "slugify";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 10px;
    }
  }
`;

const PostNewestLarge = ({ data = {} }) => {
  if (!data.id) return null;
  //get date of post
  const date = data?.createdAt?.seconds ? new Date(data?.createdAt?.seconds * 1000) : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostNewestLargeStyles>
      <PostImg url={data?.image} to={data?.slug}></PostImg>
      <PostCategory to={data?.category?.slug}>{data?.category?.name}</PostCategory>
      <PostTitle size="big" to={data?.slug}>
        {data?.title}
      </PostTitle>
      <PostMeta
        to={slugify(data?.user?.username || "", { lower: true })}
        authorName={data?.user?.fullname}
        date={formatDate}
      ></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
