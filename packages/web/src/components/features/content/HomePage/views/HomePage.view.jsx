import dynamic from 'next/dynamic';
import React from 'react';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import HomePageSlots from '@tcp/core/src/components/common/molecules/HomePageSlots';
import GetCandid from '@tcp/core/src/components/common/molecules/GetCandid';
import Recommendations from '@tcp/core/src/components/common/molecules/Recommendations';
import ModuleB from '@tcp/core/src/components/common/molecules/ModuleB';
import ModuleJ from '@tcp/core/src/components/common/molecules/ModuleJ';
import ModuleR from '@tcp/core/src/components/common/molecules/ModuleR';
import mock from '@tcp/core/src/services/abstractors/common/moduleB/mock';
import moduleJMock from '@tcp/core/src/components/common/molecules/ModuleJ/mock';
import moduleRMock from '@tcp/core/src/services/abstractors/common/moduleR/mock';

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
    return [
      <ModuleR {...moduleRMock.moduleR.composites} />,
      <HomePageSlots slots={slots} modules={modules} />,
      <ModuleB {...mock} />,
      <GetCandid />,
      <ModuleJ {...moduleJMock.moduleJ.composites} />,
      <Recommendations />,
    ];
  },
});

HomePageView.defaultProps = {
  name: null,
};

HomePageView.propTypes = {
  name: PropTypes.string,
};

export default errorBoundary(HomePageView);
