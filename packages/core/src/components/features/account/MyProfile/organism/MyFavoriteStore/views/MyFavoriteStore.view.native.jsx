import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopyWithSpacing } from '../../../../../../common/atoms/styledWrapper';
import { getLabelValue, formatPhoneNumber } from '../../../../../../../utils';
import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';
import ctaTitleDefaultStore from '../utils';
import {
  Row,
  BodyCopyWithTextTransform,
} from '../../../../../../common/atoms/styledWrapper/styledWrapper.native';

const MyFavoriteStore = ({
  labels,
  favStoreName,
  favStoreAddress,
  favStoreState,
  favStoreCity,
  favStoreZipcode,
  favStorePhone,
  className,
  isMyPreferences,
  handleComponentChange,
}) => {
  return (
    <MyProfileTile
      className={className}
      title={getLabelValue(labels, 'lbl_common_myFavoriteStore')}
      ctaTitle={ctaTitleDefaultStore(labels, favStoreName, isMyPreferences)}
      dataLocator="myFavStoreLbl"
      ctaLink="StoreLanding"
      isPageNavigation
      handleComponentChange={handleComponentChange}
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
          <BodyCopyWithTextTransform
            fontSize="fs16"
            text={favStoreName}
            fontWeight={isMyPreferences ? 'semibold' : 'regular'}
          />

          <BodyCopyWithTextTransform fontSize="fs16" text={favStoreAddress} />
          <Row>
            <BodyCopyWithTextTransform fontSize="fs16" text={`${favStoreCity}, `} />
            <BodyCopyWithTextTransform
              textTransform="uppercase"
              fontSize="fs16"
              text={`${favStoreState} ${favStoreZipcode}`}
            />
          </Row>
          <BodyCopyWithTextTransform fontSize="fs16" text={formatPhoneNumber(favStorePhone)} />
        </>
      )}
    </MyProfileTile>
  );
};

MyFavoriteStore.propTypes = {
  favStoreName: PropTypes.string,
  favStoreAddress: PropTypes.string,
  favStoreState: PropTypes.string,
  favStoreCity: PropTypes.string,
  favStoreZipcode: PropTypes.string,
  favStorePhone: PropTypes.string,
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  isMyPreferences: PropTypes.bool,
  handleComponentChange: PropTypes.func.isRequired,
};

MyFavoriteStore.defaultProps = {
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
