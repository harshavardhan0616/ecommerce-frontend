import React from 'react';
import MainCrosel from '../../components/HomeCarosel/MainCrosel';
import HomeSectionCarosel from '../../components/HomeSectionCarosel/HomeSectionCarosel';
import { mens_kurta } from '../../../Data/mens_kurta';
import { women_kurta } from "../../../Data/women_kurta";
import { men_shoe} from "../../../Data/men_shoe";
import { women_saree } from "../../../Data/women_saree";
import { mens_watch } from '../../../Data/mens_watch';
const HomePage = () => {
  return (
    <div>
      <MainCrosel />

      <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
        <HomeSectionCarosel data={mens_kurta}  sectionName="Men's Kurta" category="mens_kurta"/>
        <HomeSectionCarosel data={women_kurta} sectionName="Women's Kurta" category="women_kurta"/>
        <HomeSectionCarosel data={men_shoe}  sectionName="Men's Shoes" category="men_shoe"/>
        <HomeSectionCarosel data={mens_kurta}  sectionName="Men's Shirt" category="mens_kurta"/>
        <HomeSectionCarosel data={women_saree}  sectionName="Women's Saree" category="women_saree"/>
        <HomeSectionCarosel data={mens_watch}  sectionName="Men's Watch" category="mens_watch"/>
      </div>
    </div>
  );
};

export default HomePage;