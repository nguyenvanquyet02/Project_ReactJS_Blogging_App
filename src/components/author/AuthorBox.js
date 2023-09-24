import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../firebase/firebase-config';

const AuthorBox = ({ userId = "" }) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        async function getDataUser() {
            const docRef = doc(db, "users", userId);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.data()) setUser(docSnapshot.data());
        }
        getDataUser();
    }, [userId])
    if (!userId) return null;
    return (
        <div className="author">
            <div className="author-image">
                <img
                    src={user?.avatar}
                    alt={user?.username}
                />
            </div>
            <div className="author-content">
                <h3 className="author-name">{user?.fullname}</h3>
                <p className="author-desc">
                    {user?.description}
                </p>
            </div>
        </div>
    );
};

export default AuthorBox;