import React from 'react';
import { connect } from 'react-redux';

import AirmileBanner from '../views/AirmilesBanner.view';
import { getAirmilesBannerData, getAirmilesBannerLabels } from './AirmilesBanner.selector';

// @flow

type Props = {
  className: string,
  airmilesBannerData: any,
  labels: any,
};
export const AirmilesBannerContainer = ({ className, airmilesBannerData, labels }: Props) => (
  <AirmileBanner className={className} airmilesBannerData={airmilesBannerData} labels={labels} />
);

function mapStateToProps(state) {
  return {
    className: 'order-summary',
    airmilesBannerData: getAirmilesBannerData(state),
    labels: getAirmilesBannerLabels(state),
  };
}

export default connect(mapStateToProps)(AirmilesBannerContainer);
