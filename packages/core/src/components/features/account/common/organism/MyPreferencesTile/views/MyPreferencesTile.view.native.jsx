import React from 'react';
import PropTypes from 'prop-types';
import { navigateToNestedRoute } from '@tcp/core/src/utils/utils.app';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils';
import CustomButton from '../../../../../../common/atoms/Button';
import {
  UnderlineStyle,
  MyPreferencesTileContainer,
  ButtonWrapperStyle,
} from '../styles/MyPreferencesTile.style.native';
import MyFavoriteTileItem from '../molecules/MyFavoriteTileItem';
import ContactPreferencesTileItem from '../molecules/ContactPreferencesTileItem';
import SocialAccountsTileItem from '../molecules/SocialAccountsTileItem';
import { isCanada } from '../../../../../../../utils';

export const MyPreferencesTile = ({
  labels,
  favStoreName,
  favStoreAddress,
  favStoreState,
  favStoreCity,
  favStorePhone,
  socialAccounts,
  favStoreZipcode,
  customerPreferences,
  handleComponentChange,
}) => {
  return (
    <MyPreferencesTileContainer>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs16"
        text={getLabelValue(labels, 'lbl_prefrence_heading', 'preferences')}
        color="black"
        fontWeight="black"
      />
      <UnderlineStyle />

      <MyFavoriteTileItem
        labels={labels}
        handleComponentChange={handleComponentChange}
        favStoreName={favStoreName}
        favStoreAddress={favStoreAddress}
        favStoreState={favStoreState}
        favStoreCity={favStoreCity}
        favStoreZipcode={favStoreZipcode}
        favStorePhone={favStorePhone}
      />
      <UnderlineStyle />

      <ContactPreferencesTileItem
        labels={labels}
        handleComponentChange={handleComponentChange}
        customerPreferences={customerPreferences}
      />
      <UnderlineStyle />

      <SocialAccountsTileItem
        labels={labels}
        handleComponentChange={handleComponentChange}
        socialAccounts={socialAccounts}
      />
      <ButtonWrapperStyle>
        <CustomButton
          text={getLabelValue(labels, 'lbl_prefrence_view_preferences', 'preferences')}
          fill="BLUE"
          onPress={() => {
            handleComponentChange('myPreferencePageMobile');
          }}
        />
      </ButtonWrapperStyle>
    </MyPreferencesTileContainer>
  );
};

MyPreferencesTile.propTypes = {
  labels: PropTypes.shape({}),
  ordersList: PropTypes.shape({}).isRequired,
  favStoreName: PropTypes.string,
  favStoreAddress: PropTypes.string,
  favStoreState: PropTypes.string,
  favStoreCity: PropTypes.string,
  favStoreZipcode: PropTypes.string,
  favStorePhone: PropTypes.string,
  socialAccounts: PropTypes.shape({}),
  customerPreferences: PropTypes.shape({}),
  handleComponentChange: PropTypes.func.isRequired,
};

MyPreferencesTile.defaultProps = {
  labels: {
    lbl_prefrence_heading: '',
    lbl_prefrence_view_preferences: '',
    lbl_prefrence_tileFavoriteStore: '',
  },
  favStoreName: '',
  favStoreState: '',
  favStoreCity: '',
  favStoreZipcode: '',
  favStorePhone: '',
  favStoreAddress: '',
  socialAccounts: {},
  customerPreferences: {},
};

export default MyPreferencesTile;
