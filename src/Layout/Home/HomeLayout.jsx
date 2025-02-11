import React from 'react';
import { Helmet } from 'react-helmet-async';
import LimitAd from './LimitAd';
import LatestReview from './LatestReview';
import AboutUs from './AboutUs';
import Choose from './Choose';

const HomeLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <h1>Home</h1>
            <AboutUs></AboutUs>
            <Choose></Choose>
            <LimitAd></LimitAd>
            <LatestReview></LatestReview>
            {/* <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonials></Testimonials> */}
        </div>
    );
};

export default HomeLayout;