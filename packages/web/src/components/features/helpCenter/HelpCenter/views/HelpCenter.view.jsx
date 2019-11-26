import dynamic from 'next/dynamic';
import React from 'react';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import PageSlots from '@tcp/core/src/components/common/molecules/PageSlots';

const returnModule = mod => mod.default;
const HelpCenterView = dynamic({
  modules: () => ({
    module2columns: () =>
      import('@tcp/core/src/components/common/molecules/HelpCenterModuleTwoCol').then(returnModule),
    accordion: () =>
      import('@tcp/core/src/components/common/molecules/AccordionModule').then(returnModule),
    moduleX: () => import('@tcp/core/src/components/common/molecules/ModuleX').then(returnModule),
    imageText: () =>
      import('@tcp/core/src/components/common/molecules/ImageTextModule').then(returnModule),
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
