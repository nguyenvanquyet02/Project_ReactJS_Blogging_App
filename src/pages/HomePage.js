import React from 'react';
import { HomeBanner, HomeFeature, HomeNewest, Layout } from '../components';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase/firebase-config';
import styled from 'styled-components';

const HomePageStyles = styled.div`

`;
const HomePage = () => {
    // const handleSignOut = () => {
    //     signOut(auth);
    // }

    return (
        <HomePageStyles>
            <Layout>
                <HomeBanner></HomeBanner>
                <HomeFeature></HomeFeature>
                <HomeNewest></HomeNewest>
            </Layout>
        </HomePageStyles>
    );
};

export default HomePage;