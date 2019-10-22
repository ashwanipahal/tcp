import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
// import { navigateToNestedRoute } from '@tcp/core/src/utils/utils.app';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getLabelValue, formatPhoneNumber } from '@tcp/core/src/utils';
import {
  MyFavoriteTileItemContainer,
  LeftContainer,
  RightContainer,
  BodyCopyWrapper,
} from '../styles/MyFavoriteTileItem.style.native';

export const MyFavoriteTileItem = ({
  labels,
  favStoreName,
  favStoreAddress,
  favStoreState,
  favStoreCity,
  favStoreZipcode,
  favStorePhone,
  handleComponentChange,
}) => {
  const isFavStoreName = !!favStoreName;
  const addEditLabel = isFavStoreName ? 'lbl_preference_tileEdit' : 'lbl_preference_tileAdd';
  return (
    <>
      <MyFavoriteTileItemContainer>
        <View style={LeftContainer}>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs14"
            text={getLabelValue(labels, 'lbl_prefrence_tileFavoriteStore', 'preferences')}
            color="black"
          />
        </View>
        <View style={RightContainer}>
          <Anchor
            anchorVariation="primary"
            text={getLabelValue(labels, addEditLabel, 'preferences')}
            onPress={() => handleComponentChange('myPreferencePageMobile')}
            underline
            fontSizeVariation="large"
            noLink
            dataLocator="addressbook-overview-edit"
            color="gray.900"
          />
        </View>
      </MyFavoriteTileItemContainer>
      {isFavStoreName ? (
        <>
          <BodyCopyWrapper
            fontSize="fs14"
            data-locator="storeName"
            mobilefontFamily="secondary"
            fontWeight="regular"
            color="gray.900"
            text={favStoreName}
          />
          <BodyCopyWrapper
            fontSize="fs14"
            data-locator="storeName"
            mobilefontFamily="secondary"
            fontWeight="regular"
            color="gray.900"
            text={favStoreAddress}
          />
          <BodyCopyWrapper
            fontSize="fs14"
            data-locator="storeName"
            mobilefontFamily="secondary"
            fontWeight="regular"
            color="gray.900"
            text={`${favStoreCity}, ${favStoreState} ${favStoreZipcode}`}
          />
          <BodyCopyWrapper
            fontSize="fs14"
            data-locator="storeName"
            mobilefontFamily="secondary"
            fontWeight="regular"
            color="gray.900"
            text={formatPhoneNumber(favStorePhone)}
          />
        </>
      ) : (
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs14"
          text={getLabelValue(labels, 'lbl_preference_tileAccessBuyOnlinePickup', 'preferences')}
          color="gray.900"
          fontWeight="regular"
        />
      )}
    </>
  );
};

MyFavoriteTileItem.propTypes = {
  labels: PropTypes.shape({}),
  favStoreName: PropTypes.string,
  favStoreAddress: PropTypes.string,
  favStoreState: PropTypes.string,
  favStoreCity: PropTypes.string,
  favStoreZipcode: PropTypes.string,
  favStorePhone: PropTypes.string,
  handleComponentChange: PropTypes.func.isRequired,
};

MyFavoriteTileItem.defaultProps = {
  labels: {
    lbl_preference_tileEdit: '',
    lbl_preference_tileAdd: '',
    lbl_prefrence_tileFavoriteStore: '',
    lbl_preferenceTile_accessBuyOnlinePickup: '',
  },
  favStoreName: '',
  favStoreState: '',
  favStoreCity: '',
  favStoreZipcode: '',
  favStorePhone: '',
  favStoreAddress: '',
};

export default MyFavoriteTileItem;
