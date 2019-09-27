import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Row, Col, StoreStaticMap, Anchor } from '../../../../../common/atoms';
import { StoreAddressTile, StoreHours, StoreLocations } from '../../../../../common/molecules';
import style from '../styles/StoreDetail.style';
import { getViewportInfo, isCanada, getAPIConfig } from '../../../../../../utils';
import formatStoreTiming from '../../../../../../utils/formatStoreTiming';

const StoreDetail = ({
  className,
  store,
  labels,
  otherStores,
  openStoreDetails,
  openStoreDirections,
  routesBack,
  setFavoriteStore,
  isFavorite,
}) => {
  const {
    hours,
    features: { mallType, entranceType },
  } = store;
  const storeMeta = [
    {
      label: labels.lbl_storelocators_detail_mallType,
      value: mallType,
    },
    {
      label: labels.lbl_storelocators_detail_entranceType,
      value: entranceType,
    },
  ];

  const storeTimings = [];
  if (hours !== undefined && Object.keys(hours).length > 0)
    Object.keys(hours).forEach(hour => storeTimings.push(...hours[hour]));

  return (
    <div className={className}>
      <Anchor
        fontSizeVariation="xlarge"
        anchorVariation="secondary"
        handleLinkClick={routesBack}
        noLink
        className={`${className}__backlink`}
      >
        <span className="left-arrow"> </span>
        Back
      </Anchor>
      <Row>
        <Col colSize={{ small: 6, medium: 4, large: 4 }}>
          <StoreAddressTile
            className="storeinfo"
            variation="detail"
            store={store}
            labels={labels}
            openStoreDirections={openStoreDirections}
            setFavoriteStore={setFavoriteStore}
            isFavorite={isFavorite}
            showSetFavorite
          />
          <StoreHours
            title="Store Hours"
            defaultOpen
            storeTiming={formatStoreTiming(storeTimings)}
            storeMeta={storeMeta}
          />
        </Col>
        <Col colSize={{ small: 6, medium: 4, large: 8 }}>
          <StoreStaticMap
            storesList={[store]}
            centeredStoreId={store.basicInfo && store.basicInfo.id}
            isMobile={getViewportInfo().isMobile}
            isCanada={isCanada}
            apiKey={getAPIConfig().googleApiKey}
          />
        </Col>
      </Row>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <StoreLocations
            className="storedetail__storelocation"
            stores={otherStores}
            labels={labels}
            openStoreDetails={openStoreDetails}
          />
        </Col>
      </Row>
    </div>
  );
};

StoreDetail.propTypes = {
  className: PropTypes.string.isRequired,
  store: PropTypes.shape({
    basicInfo: PropTypes.shape({
      id: PropTypes.string,
      storeName: PropTypes.string,
      phone: PropTypes.string,
      address: PropTypes.shape({
        addressLine1: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        country: PropTypes.string,
        zipCode: PropTypes.string,
      }),
      coordinates: PropTypes.shape({
        lat: PropTypes.number,
        long: PropTypes.number,
      }),
    }),
    hours: PropTypes.shape({}),
    features: PropTypes.shape({}),
  }).isRequired,
  labels: PropTypes.shape({}).isRequired,
  otherStores: PropTypes.shape([]).isRequired,
  openStoreDetails: PropTypes.func.isRequired,
  openStoreDirections: PropTypes.func.isRequired,
  routesBack: PropTypes.func.isRequired,
  setFavoriteStore: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default withStyles(StoreDetail, style);

export { StoreDetail as StoreDetailVanilla };
