import dynamic from 'next/dynamic';
import React from 'react';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import HomePageSlots from '@tcp/core/src/components/common/molecules/HomePageSlots';
import GetCandid from '@tcp/core/src/components/common/molecules/GetCandid';

const returnModule = mod => mod.default;

const HomePageView = dynamic({
  modules: () => ({
    moduleD: () => import('@tcp/core/src/components/common/molecules/ModuleD').then(returnModule),
    moduleH: () => import('@tcp/core/src/components/common/molecules/ModuleH').then(returnModule),
    moduleK: () => import('@tcp/core/src/components/common/molecules/ModuleK').then(returnModule),
    moduleL: () => import('@tcp/core/src/components/common/molecules/ModuleL').then(returnModule),
    moduleA: () => import('@tcp/core/src/components/common/molecules/ModuleA').then(returnModule),
    moduleN: () => import('@tcp/core/src/components/common/molecules/ModuleN').then(returnModule),
  }),
  render: ({ slots }, modules) => {
    return [<HomePageSlots slots={slots} modules={modules} />, <GetCandid />];
  },
});

HomePageView.defaultProps = {
  name: null,
};

HomePageView.propTypes = {
  name: PropTypes.string,
};

export default errorBoundary(HomePageView);
