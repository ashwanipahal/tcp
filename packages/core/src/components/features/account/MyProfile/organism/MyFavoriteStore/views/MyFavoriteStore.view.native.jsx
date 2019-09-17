import React from 'react';
import PropTypes from 'prop-types';
import CapitalizeEachWord from '../styles/MyFavoriteStore.style.native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { getLabelValue, formatPhoneNumber } from '../../../../../../../utils';
import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';

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
}) => {
  return (
    <MyProfileTile
      className={className}
      title={getLabelValue(labels, 'lbl_common_myFavoriteStore')}
      ctaTitle={
        defaultStore
          ? getLabelValue(labels, 'lbl_common_updateFavoriteStore')
          : getLabelValue(labels, 'lbl_common_addAStore')
      }
      ctaPath="/account/profile"
      ctaLink="/account?id=profile&subSection=change-password"
      dataLocator="myFavStoreLbl"
    >
      <CapitalizeEachWord>
        <BodyCopy fontSize="fs16" text={favStoreName} />
      </CapitalizeEachWord>
      <CapitalizeEachWord>
        <BodyCopy fontSize="fs16" text={favStoreAddress} />
      </CapitalizeEachWord>
      <CapitalizeEachWord>
        <BodyCopy fontSize="fs16" text={`${favStoreCity}, ${favStoreState} ${favStoreZipcode}`} />
      </CapitalizeEachWord>
      <BodyCopy fontSize="fs16" text={formatPhoneNumber(favStorePhone)} />
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
};

export default withStyles(MyFavoriteStore);
