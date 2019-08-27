import React from 'react';
import { connect } from 'react-redux';

import AirmileBanner from '../views/AirmilesBanner.view';
import { getAirmilesBannerData, getAirmilesBannerLabels } from './AirmilesBanner.selector';
import { addAirmilesBannerRequest } from './AirmilesBanner.actions';
import { isCanada } from '../../../../../../../utils';

// @flow

type Props = {
  className: string,
  airmilesBannerData: any,
  labels: any,
  addAirmilesBanner: Function,
  onAddAirmilesBanner: Function,
};
export const AirmilesBannerContainer = ({
  className,
  onAddAirmilesBanner,
  airmilesBannerData,
  labels,
  addAirmilesBanner,
}: Props) => {
  return (
    isCanada() && (
      <AirmileBanner
        className={className}
        onAddAirmilesBanner={onAddAirmilesBanner}
        airmilesBannerData={airmilesBannerData}
        labels={labels}
        addAirmilesBanner={addAirmilesBanner}
      />
    )
  );
};

export const mapDispatchToProps = dispatch => {
  return {
    onAddAirmilesBanner: payload => {
      dispatch(addAirmilesBannerRequest(payload));
    },
  };
};

function mapStateToProps(state) {
  return {
    className: 'airmile-banner',
    airmilesBannerData: getAirmilesBannerData(state),
    labels: getAirmilesBannerLabels(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AirmilesBannerContainer);
