import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../base/button/Button';

const HomeBannerStyles = styled.div`
    margin-bottom: 52px;
    background-image: linear-gradient(
        to right bottom,
        ${props => props.theme.primary},
        ${props => props.theme.secondary});
    min-height: 500px;
    padding: 40px 0;
    .banner{
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-content{
        max-width: 560px;
        color: #fff;
        }
        &-heading{
            font-size: 36px;
            margin-bottom: 20px;
        }
        &-desc{
            line-height: 1.75;
            margin-bottom: 40px;
        }
    }
`;
const HomeBanner = () => {
    useEffect(() => {
        document.title = "Blogging App"
    }, [])
    return (
        <HomeBannerStyles>
            <div className='container'>
                <div className='banner'>
                    <div className='banner-content'>
                        <h1 className='banner-heading'>Blogging App</h1>
                        <p className='banner-desc'>
                            Celine Maris Blogging App is an engaging online platform curated by talented author and blogger Celine Maris. <br />
                            What sets the Celine platform apart is its interactive nature. The site offers a convenient newsletter subscription option. Celine Maris's blogging app is not only aesthetically pleasing but also easy to navigate, ensuring an enjoyable reading experience across multiple devices. It is a digital paradise where Celine shares her creativity and thoughts
                        </p>
                        <Button to="/sign-up" kind='secondary' style={{ width: "200px" }}>
                            Get started
                        </Button>
                    </div>
                    <div className='banner-image'>
                        <img src='./img-banner.png' alt='banner' />
                    </div>
                </div>
            </div>
        </HomeBannerStyles>
    );
};

export default HomeBanner;