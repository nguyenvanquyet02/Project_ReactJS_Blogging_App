import { collection, limit, onSnapshot, query, where } from "firebase/firestore";
import Heading from "../../layouts/Heading";
// import PostItem from "../post/PostItem";
import PostNewestItem from "../post/PostNewestItem";
import PostNewestLarge from "../post/PostNewestLarge";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../../firebase/firebase-config";
import { postStatus } from "../../../utils/constants";

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
`;

const HomeNewest = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "posts"),
      where("status", "==", +postStatus.APPROVED),
      limit(4));
    onSnapshot(q, snapshot => {
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
  const [first, ...other] = posts;
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Mới nhất</Heading>
        <div className="layout">
          <PostNewestLarge data={first}></PostNewestLarge>
          <div className="sidebar">
            {other?.length > 0 && other.map(post => (
              <PostNewestItem key={post.id} data={post}></PostNewestItem>
            ))}
          </div>
        </div>
        {/* <Heading>Blog liên quan</Heading>
        <div className="grid-layout grid-layout--primary">
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
        </div> */}
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
