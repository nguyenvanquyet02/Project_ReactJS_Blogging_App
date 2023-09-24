import React from 'react';
import PostItem from './PostItem';
import { Heading } from '../../layouts';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';

const PostRelated = ({ categoryId = "" }) => {
    const [posts, setPosts] = useState([]);
    // get data posts where categoryid === categoryid
    useEffect(() => {
        const docRef = query(collection(db, "posts"), where("categoryId", "==", categoryId));
        onSnapshot(docRef, snapShot => {
            let results = [];
            snapShot.forEach(doc => {
                results.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setPosts(results);
        })
    }, [categoryId]);
    if (!categoryId || posts.length <= 0) return null;
    return (
        <div className="post-related">
            <Heading>Bài viết liên quan</Heading>
            <div className="grid-layout grid-layout--primary">
                {posts?.length > 0 && posts.map(item => (
                    <PostItem data={item} key={item.id}></PostItem>
                ))}
            </div>
        </div>
    );
};

export default PostRelated;