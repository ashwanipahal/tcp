import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopyWithSpacing } from '../../../../../../common/atoms/styledWrapper';
import { getLabelValue, formatPhoneNumber } from '../../../../../../../utils';
import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';
import ctaTitleDefaultStore from '../utils';
import StoreAddress from '../styles/MyFavoriteStore.style.native';

const MyFavoriteStore = ({
  labels,
  defaultStore,
  favStoreName,
  favStoreAddress,
  favStoreState,
  favStoreCity,
  favStoreZipcode,
  favStorePhone,
  className,
  isMyPreferences,
}) => {
  return (
    <MyProfileTile
      className={className}
      title={getLabelValue(labels, 'lbl_common_myFavoriteStore')}
      ctaTitle={ctaTitleDefaultStore(labels, defaultStore, isMyPreferences)}
      dataLocator="myFavStoreLbl"
    >
      {isMyPreferences && (
        <BodyCopyWithSpacing
          spacingStyles="margin-bottom-XXL"
          fontSize="fs16"
          text={getLabelValue(labels, 'lbl_common_accessBuyOnline')}
        />
      )}
      {!favStoreName && (
        <BodyCopyWithSpacing
          spacingStyles="margin-bottom-LRG"
          fontSize="fs16"
          text={getLabelValue(labels, 'lbl_common_favStoreNotAdded')}
        />
      )}
      {!!favStoreName && (
        <>
          <StoreAddress
            fontSize="fs16"
            text={favStoreName}
            fontWeight={isMyPreferences ? 'semibold' : 'regular'}
          >
            {favStoreName}
          </StoreAddress>
          <StoreAddress fontSize="fs16" text={favStoreAddress}>
            {favStoreAddress}
          </StoreAddress>
          <StoreAddress
            fontSize="fs16"
            text={`${favStoreCity}, ${favStoreState} ${favStoreZipcode}`}
          >
            {`${favStoreCity}, ${favStoreState} ${favStoreZipcode}`}
          </StoreAddress>
          <StoreAddress fontSize="fs16" text={formatPhoneNumber(favStorePhone)}>
            {formatPhoneNumber(favStorePhone)}
          </StoreAddress>
        </>
      )}
    </MyProfileTile>
  );
};

MyFavoriteStore.propTypes = {
  defaultStore: PropTypes.string,
  favStoreName: PropTypes.string,
  favStoreAddress: PropTypes.string,
  favStoreState: PropTypes.string,
  favStoreCity: PropTypes.string,
  favStoreZipcode: PropTypes.string,
  favStorePhone: PropTypes.string,
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  isMyPreferences: PropTypes.bool,
};

MyFavoriteStore.defaultProps = {
  defaultStore: '',
  favStoreName: '',
  favStoreState: '',
  favStoreCity: '',
  favStoreZipcode: '',
  favStorePhone: '',
  favStoreAddress: '',
  className: '',
  isMyPreferences: false,
};

export default MyFavoriteStore;
