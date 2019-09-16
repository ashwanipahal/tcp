import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';
import { getLabelValue, formatPhone } from '../../../../../../../utils';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/MyFavoriteStore.style';

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
      <Row fullBleed>
        <Col
          colSize={{
            small: 6,
            medium: 8,
            large: 12,
          }}
        >
          <BodyCopy
            className="elem-pb-SM favStoreData capFirstLetter"
            fontSize="fs16"
            data-locator="storeName"
            fontFamily="secondary"
            component="p"
          >
            {favStoreName}
          </BodyCopy>
          <BodyCopy
            className="elem-pb-SM favStoreData capFirstLetter"
            fontSize="fs16"
            data-locator="storeAddress"
            fontFamily="secondary"
            component="p"
          >
            {favStoreAddress}
          </BodyCopy>
          <BodyCopy
            className="elem-pb-SM favStoreData capFirstLetter"
            fontSize="fs16"
            data-locator="storeCityDetails"
            fontFamily="secondary"
            component="p"
          >
            {`${favStoreCity}, ${favStoreState} ${favStoreZipcode}`}
          </BodyCopy>
          <BodyCopy
            className="elem-pb-SM favStoreData"
            fontSize="fs16"
            data-locator="storePhoneNumber"
            fontFamily="secondary"
            component="p"
          >
            {formatPhone(favStorePhone)}
          </BodyCopy>
        </Col>
      </Row>
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

export default withStyles(MyFavoriteStore, styles);
