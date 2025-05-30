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
import Success from './Success';

const HomeLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Helmet>
                <title>Home | EstateLink</title>
            </Helmet>
            
            <Slider></Slider>
            <AboutUs></AboutUs>
            <Steps></Steps>
            <Mission></Mission>
            <TeamSection></TeamSection>
            <Success></Success>
            <Awards></Awards>
            <Choose></Choose>
            <LimitAd></LimitAd>
            <LatestReview></LatestReview>
        </div>
    );
};

export default HomeLayout;