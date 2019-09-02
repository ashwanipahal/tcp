import React from 'react';
import { connect } from 'react-redux';

import AirmileBanner from '../views/AirmilesBanner.view';
import {
  getAirmilesBannerData,
  getAirmilesBannerLabels,
  getSyncError,
  getFormAirmilesNumber,
} from './AirmilesBanner.selector';
import { addAirmilesBannerRequest } from './AirmilesBanner.actions';
import { isCanada } from '../../../../../../../utils';

// @flow

type Props = {
  className: string,
  airmilesBannerData: any,
  labels: any,
  addAirmilesBanner: Function,
  onAddAirmilesBanner: Function,
  syncErrorObj: any,
  promoField: any,
};
export const AirmilesBannerContainer = ({
  className,
  onAddAirmilesBanner,
  airmilesBannerData,
  labels,
  addAirmilesBanner,
  syncErrorObj,
  promoField,
  offerField,
}: Props) => {
  return (
    isCanada() && (
      <AirmileBanner
        className={className}
        onAddAirmilesBanner={onAddAirmilesBanner}
        airmilesBannerData={airmilesBannerData}
        labels={labels}
        initialValues={{
          promoId: airmilesBannerData.collectorNumber ? airmilesBannerData.collectorNumber : '',
          offerCode: airmilesBannerData.offerCode ? airmilesBannerData.offerCode : '',
        }}
        addAirmilesBanner={addAirmilesBanner}
        syncErrorObj={syncErrorObj}
        promoField={promoField}
        offerField={offerField}
      />
    )
  );
};

export const mapDispatchToProps = dispatch => {
  return {
    onAddAirmilesBanner: () => {
      dispatch(addAirmilesBannerRequest());
    },
  };
};

function mapStateToProps(state) {
  return {
    className: 'airmile-banner',
    airmilesBannerData: getAirmilesBannerData(state),
    labels: getAirmilesBannerLabels(state),
    syncErrorObj: getSyncError(state),
    promoField: getFormAirmilesNumber(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AirmilesBannerContainer);
