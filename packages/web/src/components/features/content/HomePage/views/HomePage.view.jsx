import dynamic from 'next/dynamic';
import React from 'react';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import HomePageSlots from '@tcp/core/src/components/common/molecules/HomePageSlots';
import GetCandid from '@tcp/core/src/components/common/molecules/GetCandid';
import { Row, Col } from '@tcp/core/src/components/common/atoms';

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
  }),
  render: ({ slots }, modules) => {
    return (
      <Row>
        <Col
          colSize={{
            small: 2,
            medium: 2,
            large: 2,
          }}
          style={{ backgroundColor: 'gray' }}
        >
          {/* <div >text</div> */}
        </Col>
        <Col
          colSize={{
            small: 10,
            medium: 10,
            large: 10,
          }}
        >
          <HomePageSlots slots={slots} modules={modules} />
        </Col>
      </Row>
    );
  },
});

HomePageView.defaultProps = {
  name: null,
  slots: [],
};

HomePageView.propTypes = {
  name: PropTypes.string,
  slots: PropTypes.arrayOf(PropTypes.object),
};

export default errorBoundary(HomePageView);
export { HomePageView as HomePageViewVanilla };
