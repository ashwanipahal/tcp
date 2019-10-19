import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';
import internalEndpoints from '../../../internalEndpoints';
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
  favStoreZipcode,
  favStorePhone,
  socialAccounts,
}) => {
  const isContactAdded = true;
  return (
    <AccountOverviewTile
      title={getLabelValue(labels, 'lbl_prefrence_heading', 'preferences')}
      ctaTitle={getLabelValue(labels, 'lbl_prefrence_view_preferences', 'preferences')}
      dataLocatorPrefix="orders"
      ctaLink={internalEndpoints.myPreferencesPage.link}
      ctaPath={internalEndpoints.myPreferencesPage.path}
    >
      <MyFavoriteTileItem
        labels={labels}
        favStoreName={favStoreName}
        favStoreAddress={favStoreAddress}
        favStoreState={favStoreState}
        favStoreCity={favStoreCity}
        favStoreZipcode={favStoreZipcode}
        favStorePhone={favStorePhone}
      />

      <ContactPreferencesTileItem labels={labels} isContactAdded={isContactAdded} />

      {!isCanada() ? (
        <SocialAccountsTileItem labels={labels} socialAccounts={socialAccounts} />
      ) : null}
    </AccountOverviewTile>
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
};

export default MyPreferencesTile;
