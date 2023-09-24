import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostMetaStyles = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    font-weight: 600;
    color: inherit;

    .dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
    .time{

    }
    .author{
        
    }
`;
const PostMeta = ({ date = 'July 30', authorName = "Celine Maris", className = '', to = "/" }) => {
    return (
        <PostMetaStyles className={className}>
            <span className="time">{date}</span>
            <span className="dot" />
            <Link to={`/author/${to}`}>
                <span className="author">{authorName}</span>
            </Link>
        </PostMetaStyles>
    );
};

export default PostMeta;