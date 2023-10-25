import styled from "styled-components";
import React, { useEffect, useState } from "react";
import parse from 'html-react-parser';
import NotFoundPage from "./NotFoundPage";
import { useParams } from "react-router-dom";
import { PostCategory, PostImage, PostMeta, PostRelated } from "../components/module/post";
import { Layout } from "../components/layouts";
import { db } from "../firebase/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { AuthorBox } from "../components/author";
import slugify from "slugify";
import { CommentContainer } from "../components/module/comment";

const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 32px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    padding: 4px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  useEffect(() => {
    async function getDataPost() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, snaphot => {
        snaphot.forEach(doc => {
          if (doc.data()) setPostInfo(doc.data());
        })
      })
    }
    getDataPost();
  }, [slug]);
  // scroll start when click post related
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);
  if (!slug) return <NotFoundPage />
  if (!postInfo.title) return null;
  console.log(postInfo.id);
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={postInfo.image}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory className="mb-6" to={postInfo?.category?.slug}>{postInfo.category?.name}</PostCategory>
              <h1 className="post-heading">
                {postInfo.title}
              </h1>
              <PostMeta
                to={slugify(postInfo?.user?.username || "", { lower: true })}
                date={new Date(postInfo?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
                authorName={postInfo?.user?.fullname}
              />
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">
              {parse(postInfo.content || "")}
            </div>
            <AuthorBox userId={postInfo?.user?.id} />
            <CommentContainer postId={postInfo.id} />
          </div>
          <PostRelated categoryId={postInfo?.category?.id} />
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
