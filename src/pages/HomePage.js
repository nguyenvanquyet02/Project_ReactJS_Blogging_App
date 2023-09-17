import React from 'react';
import { Button, Header } from '../components';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import styled from 'styled-components';

const HomePageStyles = styled.div`

`;
const HomePage = () => {
    // const handleSignOut = () => {
    //     signOut(auth);
    // }

    return (
        <HomePageStyles>
            <Header></Header>
        </HomePageStyles>
    );
};

export default HomePage;