import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const PostImgStyles = styled.div`
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
      border: 1px solid #eee;
    }
    a{
        display: "block";
        width: inherit;
    }
`;
const PostImg = ({ url = '', to = "", alt = 'imageAlt', className = '' }) => {
    if (to) return (
        <Link to={`/${to}`} style={{}}>
            <PostImgStyles className={`post-image ${className}`}>
                <img
                    src={url}
                    alt={alt}
                    loading='lazy'
                />
            </PostImgStyles>
        </Link>
    )
    return (
        <PostImgStyles className={`post-image ${className}`}>
            <img
                src={url}
                alt={alt}
                loading='lazy'
            />
        </PostImgStyles>
    );
};

export default PostImg;