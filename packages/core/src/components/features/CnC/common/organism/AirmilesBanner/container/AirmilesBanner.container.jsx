import React from 'react';
import { connect } from 'react-redux';

import AirmileBanner from '../views/AirmilesBanner.view';
import {
  getAirmilesBannerData,
  getAirmilesBannerLabels,
  getSyncError,
  getPromoFields,
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
    syncErrorObj: getSyncError(state),
    promoField: getPromoFields(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AirmilesBannerContainer);
