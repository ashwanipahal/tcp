import dynamic from 'next/dynamic';
import React from 'react';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import PageSlots from '@tcp/core/src/components/common/molecules/PageSlots';

const returnModule = mod => mod.default;
const HelpCenterView = dynamic({
  modules: () => ({
    moduleL: () => import('@tcp/core/src/components/common/molecules/ModuleL').then(returnModule),
    moduleM: () => import('@tcp/core/src/components/common/molecules/ModuleM').then(returnModule),
    moduleN: () => import('@tcp/core/src/components/common/molecules/ModuleN').then(returnModule),
    moduleA: () => import('@tcp/core/src/components/common/molecules/ModuleA').then(returnModule),
    moduleJ: () => import('@tcp/core/src/components/common/molecules/ModuleJ').then(returnModule),
    moduleT: () => import('@tcp/core/src/components/common/molecules/ModuleT').then(returnModule),
    moduleE: () => import('@tcp/core/src/components/common/molecules/ModuleE').then(returnModule),
    moduleG: () => import('@tcp/core/src/components/common/molecules/ModuleG').then(returnModule),
    moduleB: () => import('@tcp/core/src/components/common/molecules/ModuleB').then(returnModule),
    moduleK: () => import('@tcp/core/src/components/common/molecules/ModuleK').then(returnModule),
    moduleQ: () => import('@tcp/core/src/components/common/molecules/ModuleQ').then(returnModule),
    moduleR: () => import('@tcp/core/src/components/common/molecules/ModuleR').then(returnModule),
    moduleD: () => import('@tcp/core/src/components/common/molecules/ModuleD').then(returnModule),
    moduleH: () => import('@tcp/core/src/components/common/molecules/ModuleH').then(returnModule),
    moduleX: () => import('@tcp/core/src/components/common/molecules/ModuleX').then(returnModule),
    moduleS: () => import('@tcp/core/src/components/common/molecules/ModuleS').then(returnModule),
    module2columns: () =>
      import('@tcp/core/src/components/common/molecules/HelpCenterModuleTwoCol').then(returnModule),
    accordion: () =>
      import('@tcp/core/src/components/common/molecules/AccordionModule').then(returnModule),
  }),
  render: (slotData, modules) => {
    const { slots } = slotData;
    return <PageSlots slots={slots} modules={modules} />;
  },
});

HelpCenterView.propTypes = {
  slotData: PropTypes.shape({}),
};

HelpCenterView.defaultProps = {
  slotData: {},
};

export default errorBoundary(HelpCenterView);
export { HelpCenterView as HelpCenterViewVanilla };
