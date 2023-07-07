import React, { useState } from 'react';
import Home from '../pages/Home.js';
import Concert from '../pages/Concert.js';
import UserTimeline from '../pages/UserTimeline.js';
import Login from '../pages/LoginForm.js';
import Signup from '../pages/SignUpForm.js';
import Header from '../components/Header.js'

export default function Container() {
    const [currentPage, setCurrentPage] = useState('Home');

    const renderPage = () => {
        if (currentPage === 'Home') {
            return <Home />;
        }
        if (currentPage === 'Concert') {
            return <Concert />;
        }
        if (currentPage === 'UserTimeline') {
            return <UserTimeline />
        }
        if (currentPage === 'Signup') {
            return <Signup handlePageChange={handlePageChange} />
        }
        return <Login handlePageChange={handlePageChange} />
    };

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div>
            <Header currentPage={currentPage} handlePageChange={handlePageChange} />
            {renderPage()}
            {/* <Footer /> */}
        </div>
    );
}