import React, { useEffect, useState } from 'react';
import { Heading, Layout } from '../components';
import { useParams } from 'react-router-dom';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import PostItem from '../components/module/post/PostItem';

const CategoryPage = () => {
    const params = useParams();
    const [posts, setPosts] = useState({});
    //get data post
    useEffect(() => {
        async function getDataPost() {
            const docRef = query(collection(db, "posts"), where("category.slug", "==", params.slug));
            onSnapshot(docRef, snapshot => {
                let results = [];
                snapshot.forEach(doc => {
                    results.push({
                        id: doc.id,
                        ...doc.data()
                    })
                });
                setPosts(results);
            })
        }
        getDataPost();
    }, [params.slug]);
    // get data category
    // useEffect(() => {
    //     async function getDataCategory() {
    //         const docRef = query(collection(db, "categories"), where("slug", "==", params.slug));
    //         onSnapshot(docRef, snapshot => {
    //             snapshot.forEach(doc => {
    //                 if (doc.data()) setCategory(doc.data())
    //             });
    //         })
    //     }
    //     getDataCategory()
    // }, [params.slug]);
    if (!posts) return null;
    return (
        <Layout>
            <div className='container'>
                <div className='pt-10'></div>
                <Heading>Category: {posts[0]?.category?.name || ""}</Heading>
                <div className="grid-layout grid-layout--primary">
                    {posts?.length > 0 && posts.map(item => (
                        <PostItem data={item} key={item.id}></PostItem>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default CategoryPage;