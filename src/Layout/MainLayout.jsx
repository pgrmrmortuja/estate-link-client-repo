import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import Loading from '../Shared/Loading';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import useAxiosPublic from '../hooks/useAxiosPublic';

const MainLayout = () => {

    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigation = useNavigation();

    const noHeaderFooter = location.pathname.includes('/login') || location.pathname.includes('/signup');

    // Track visitor using axios
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await axiosPublic.post('/track-visit');
        console.log("Visitor tracked");
      } catch (error) {
        console.error("Visitor tracking failed", error);
      }
    };

    trackVisitor();
  }, []);


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