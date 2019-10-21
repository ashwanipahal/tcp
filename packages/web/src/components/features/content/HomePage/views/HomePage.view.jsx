import dynamic from 'next/dynamic';
import React from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import HomePageSlots from '@tcp/core/src/components/common/molecules/HomePageSlots';
import { isTCP } from '@tcp/core/src/utils';
import GetCandid from '@tcp/core/src/components/common/molecules/GetCandid';
import ModuleT from '@tcp/core/src/components/common/molecules/ModuleT';
import mock from '@tcp/core/src/services/abstractors/common/moduleT/mock';
import ModuleN from '@tcp/core/src/components/common/molecules/ModuleN';
import mockModuleN from '@tcp/core/src/services/abstractors/common/moduleN/mock';
import ModuleTwoCol from '@tcp/core/src/components/common/molecules/ModuleTwoCol/views/ModuleTwoCol';
import Recommendations from '../../../../common/molecules/Recommendations';

const returnModule = mod => mod.default;
const HomePageView = dynamic({
  modules: () => ({
    moduleA: () => import('@tcp/core/src/components/common/molecules/ModuleA').then(returnModule),
    moduleB: () => import('@tcp/core/src/components/common/molecules/ModuleB').then(returnModule),
    moduleD: () => import('@tcp/core/src/components/common/molecules/ModuleD').then(returnModule),
    moduleH: () => import('@tcp/core/src/components/common/molecules/ModuleH').then(returnModule),
    moduleJ: () => import('@tcp/core/src/components/common/molecules/ModuleJ').then(returnModule),
    moduleK: () => import('@tcp/core/src/components/common/molecules/ModuleK').then(returnModule),
    moduleL: () => import('@tcp/core/src/components/common/molecules/ModuleL').then(returnModule),
    moduleN: () => import('@tcp/core/src/components/common/molecules/ModuleN').then(returnModule),
    moduleQ: () => import('@tcp/core/src/components/common/molecules/ModuleQ').then(returnModule),
    moduleR: () => import('@tcp/core/src/components/common/molecules/ModuleR').then(returnModule),
    moduleX: () => import('@tcp/core/src/components/common/molecules/ModuleX').then(returnModule),
    moduleS: () => import('@tcp/core/src/components/common/molecules/ModuleS').then(returnModule),
  }),
  render: ({ slots }, modules) => {
    return [
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 6 }}>
          <ModuleN {...mockModuleN.ModuleN.composites} halfWidth />
        </Col>
        <Col colSize={{}} />
      </Row>,
      <HomePageSlots slots={slots} modules={modules} />,
      isTCP() ? <ModuleT {...mock.moduleT.composites} /> : null,
      <ModuleTwoCol slots={slots} modules={modules} />,
      <GetCandid />,
      <Recommendations variations="moduleO,moduleP" />,
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
export { HomePageView as HomePageViewVanilla };
