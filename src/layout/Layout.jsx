import React from 'react';
import "./Layout.css"
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';

const Layout = () => {

    return (
        <div>
            <Navbar/>
            <div className='bg-gray-100 h-[100vh] '>
                {/* dynamic content */}
                <Outlet />
            </div>

        </div>
    );
};

export default Layout;