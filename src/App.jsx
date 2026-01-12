import React from 'react';
import Container from '@mui/material/Container';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <Container maxWidth="lg">
                    <Navbar />
                    <Outlet />
                </Container>
            ),
            children: [
                { index: true, element: <Navigate to="/posts" /> },
                { path: 'posts', element: <Home /> },
                { path: 'posts/search', element: <Home /> },
                { path: 'posts/:id', element: <PostDetails /> },
                { path: 'auth', element: !user ? <Auth /> : <Navigate to="/posts" /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;