import React from 'react';
import Banner from '../components/Banner';
import AboutUS from '../components/AboutUS';

import CountryImmigration from '../components/CountryImmigration';
import LatestVisa from '../components/LatestVisa';
const Home = () => {
  return (
    <div>
      <Banner />
      <AboutUS />
      <CountryImmigration />
      <LatestVisa />
    </div>
  );
};

export default Home;
