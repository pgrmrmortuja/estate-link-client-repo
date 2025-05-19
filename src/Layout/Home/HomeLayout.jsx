import React from 'react';
import { Helmet } from 'react-helmet-async';
import LimitAd from './LimitAd';
import LatestReview from './LatestReview';
import AboutUs from './AboutUs';
import Choose from './Choose';
import Slider from './Slider';
import Steps from './Steps';
import Mission from './Mission';
import TeamSection from './TeamSection';
import Awards from './Awards';

const HomeLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Helmet>
                <title>Home | EstateLink</title>
            </Helmet>
            
            <Slider></Slider>
            <Steps></Steps>
            <TeamSection></TeamSection>
            <Awards></Awards>
            <Mission></Mission>
            <AboutUs></AboutUs>
            <Choose></Choose>
            <LimitAd></LimitAd>
            <LatestReview></LatestReview>
        </div>
    );
};

export default HomeLayout;