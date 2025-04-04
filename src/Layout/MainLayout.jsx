import React from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import Loading from '../Shared/Loading';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const MainLayout = () => {

    const location = useLocation();
    const navigation = useNavigation();

    const noHeaderFooter = location.pathname.includes('/login') || location.pathname.includes('/signup');


    return (
        <div className='flex flex-col min-h-screen'>
            {noHeaderFooter || <Navbar></Navbar>}

            <main className=" w-11/12 mx-auto">
                {
                    navigation.state === 'loading'
                        ? <Loading />
                        : <Outlet />
                }
            </main>

            {noHeaderFooter || <Footer className=''></Footer>}

        </div>
    );
};

export default MainLayout;