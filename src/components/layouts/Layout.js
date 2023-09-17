import React, { Fragment } from 'react';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <Fragment>
            <Header />
            {children}
            {/* footer */}
        </Fragment>
    );
};

export default Layout;