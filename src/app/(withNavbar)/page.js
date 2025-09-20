"use client"

import { FeaturesSectionDemo } from '@/components/featureSection';
import { HeroSectionOne } from '@/components/HeroSection';
import React from 'react';

const page = () => {
    return (
        <div>
              <HeroSectionOne/>
              <FeaturesSectionDemo/>
        </div>
    );
};

export default page;