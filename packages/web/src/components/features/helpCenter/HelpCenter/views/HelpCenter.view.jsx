import dynamic from 'next/dynamic';
import React from 'react';
import { PropTypes } from 'prop-types';
import { Anchor } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import PageSlots from '@tcp/core/src/components/common/molecules/PageSlots';
import styles from '../styles/HelpCenter.style';

const returnModule = mod => mod.default;
const HelpCenterDynamicRender = dynamic({
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
    return <PageSlots slots={slots} modules={modules} {...slotData} />;
  },
});

const BackButton = ({ labels }) => {
  return (
    <Anchor
      fontSizeVariation="xlarge"
      anchorVariation="secondary"
      title={labels.lbl_helpCenter_continueShopping}
      to="/home"
      asPath="/home"
      className="help-center-back"
    >
      <span className="left-arrow" />
      {labels.lbl_helpCenter_continueShopping}
    </Anchor>
  );
};

const HelpCenterView = props => {
  const { className, labels } = props;
  return (
    <div className={`${className} helpcenter__view`}>
      <BackButton labels={labels} />
      <HelpCenterDynamicRender {...props} />
    </div>
  );
};

BackButton.propTypes = {
  labels: PropTypes.shape({}),
};

BackButton.defaultProps = {
  labels: {},
};

HelpCenterView.propTypes = {
  slotData: PropTypes.shape({}),
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}),
};

HelpCenterView.defaultProps = {
  slotData: {},
  labels: {},
};

export default withStyles(errorBoundary(HelpCenterView), styles);
export { HelpCenterView as HelpCenterViewVanilla };
