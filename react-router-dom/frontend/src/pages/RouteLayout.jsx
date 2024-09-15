import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

const RouteLayoutPage = () => {
    return (
        <>
          <MainNavigation />
            <main>
            <Outlet />
            </main>
        
        </>
    
  )
}

export default RouteLayoutPage;