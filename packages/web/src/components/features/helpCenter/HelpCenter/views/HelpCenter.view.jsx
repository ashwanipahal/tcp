import dynamic from 'next/dynamic';
import React from 'react';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import PageSlots from '@tcp/core/src/components/common/molecules/PageSlots';

const returnModule = mod => mod.default;
const HelpCenterView = dynamic({
  modules: () => ({
    moduleX: () => import('../molecules/HelpCenterTopBottomModule').then(returnModule),
    module2columns: () =>
      import('@tcp/core/src/components/common/molecules/HelpCenterModuleTwoCol').then(returnModule),
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
