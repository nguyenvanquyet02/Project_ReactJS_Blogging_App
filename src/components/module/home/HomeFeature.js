import Heading from "../../layouts/Heading";
import PostFeatureItem from "../post/PostFeatureItem";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore'
import { db } from "../../../firebase/firebase-config";
import { postStatus } from "../../../utils/constants";
const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const qy = query(colRef,
      where("status", "==", +postStatus.APPROVED),
      where("hot", "==", true),
      limit(3));
    onSnapshot(qy, (snapshot) => {
      const result = [];
      snapshot.forEach(doc => {
        result.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setPosts(result);
    });
  }, []);
  if (posts.length <= 0) return null;
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {posts?.length > 0 && posts.map(post => (
            <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
          ))}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
