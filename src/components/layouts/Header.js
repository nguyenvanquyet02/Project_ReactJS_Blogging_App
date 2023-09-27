import React from 'react';
import styled from 'styled-components';
import Button from '../base/button/Button';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { userRole } from '../../utils/constants';

const HeaderStyles = styled.div`
    padding: 18px 0px;
    position: sticky;
    top: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    z-index: 100;
    border-bottom: 1px solid #eee;
    
//logo container
    .logo-container{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        column-gap: 22px;
    }
    .title-logo{
        font-size: 26px;
        font-weight: 600;
        color: ${props => props.theme.primary};;
    }
    .logo{
        display: block;
        max-width: 60px;
    }
    //main
    .header-main{
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
    }
    .menu{
        display: flex;
        align-items: center;
        gap: 20px;
        margin-left: 40px;
        list-style: none;
        font-weight: 500;
    }
    .header-right{
        margin-left: auto;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        column-gap: 16px;

    }
    .header-auth{
        img {
            width: 52px;
            height: 52px;
            object-fit: cover;
            border-radius: 100rem;
            border: 1px solid #eee;
        }
    }
    .search{
        position: relative;
        height: 44px;
        padding-left: 20px;
        padding-right: 48px;
        border: 1px solid #ccc;
        border-radius: 8px;
        width: 100%;
        max-width: 320px;
        display: flex;
        align-items: center;
    }
    .search-input{
        flex: 1;

    }
    .search-icon{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 16px;
    }
`;
const menuLinks = [
    {
        url: "/",
        title: "Home"
    },
    {
        url: "/blog",
        title: "Blog"
    },
    {
        url: "/contact",
        title: "Contact"
    },
]
const Header = () => {
    const { userInfo } = useAuth();
    return (
        <HeaderStyles>
            <div className='container'>
                <div className='header-main'>
                    <div className='logo-container'>
                        <NavLink to='/'>
                            <img srcSet='/logo.png 3x' alt='logo' className='logo' />
                        </NavLink>
                        <p className='title-logo'>Blogging App</p>
                    </div>
                    <ul className='menu'>
                        {menuLinks && menuLinks.map(item => (
                            <li className='menu-item' key={item.title}>
                                <NavLink
                                    to={item.url}
                                    className='menu-link'
                                >
                                    {item.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className='header-right'>
                        <div className='search'>
                            <input className='search-input' placeholder='Search posts...' />
                            <span className='search-icon'>
                                <svg
                                    width="18"
                                    height="17"
                                    viewBox="0 0 18 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <ellipse
                                        cx="7.66669"
                                        cy="7.05161"
                                        rx="6.66669"
                                        ry="6.05161"
                                        stroke="#999999"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                                        stroke="#999999"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                                        stroke="#999999"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        </div>
                        {userInfo && Number(userInfo.role) === userRole.ADMIN ?
                            <Button
                                to="/dashboard"
                                style={{ width: "140px", height: "44px" }}
                            >
                                Dashboard
                            </Button>
                            : <Button to="/manage/add-post" className="header-button" height="52px">
                                Write new post
                            </Button>
                        }
                        {!userInfo ? <Button to="/sign-in" style={{ width: "120px", height: "44px" }} kind='primary'>Login</Button>
                            : <div className='header-auth'>
                                <Link to="/profile">
                                    <div className="userInfo">
                                        <img
                                            src={userInfo?.avatar}
                                            alt={userInfo?.username}
                                        />
                                    </div>
                                </Link>
                            </div>}
                    </div>
                </div>
            </div>
        </HeaderStyles>
    );
};

export default Header;