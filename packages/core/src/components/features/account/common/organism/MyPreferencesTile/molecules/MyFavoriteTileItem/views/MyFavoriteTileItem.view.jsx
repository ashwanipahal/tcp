import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue, formatPhoneNumber } from '@tcp/core/src/utils/utils';
import { Row, Col, BodyCopy, Anchor } from '../../../../../../../../common/atoms';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import styles from '../styles/MyFavoriteTileItem.style';

const MyFavoriteTile = ({
  labels,
  favStoreName,
  favStoreAddress,
  favStoreState,
  favStoreCity,
  favStoreZipcode,
  favStorePhone,
  className,
}) => {
  const isFavStoreName = !!favStoreName;
  const addEditLabel = isFavStoreName ? 'lbl_prefrence_tile_edit' : 'lbl_prefrence_tile_add';
  return (
    <BodyCopy component="div" className={className}>
      <BodyCopy component="div" className="heading">
        <Row fullBleed>
          <Col
            colSize={{
              small: 5,
              large: 10,
              medium: 6,
            }}
          >
            <BodyCopy component="div" fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
              {getLabelValue(labels, 'lbl_prefrence_favorite_store', 'preferences')}
            </BodyCopy>
          </Col>
          <Col
            colSize={{
              small: 1,
              large: 2,
              medium: 2,
            }}
          >
            <BodyCopy component="div" textAlign="right" fontSize="fs14" fontFamily="secondary">
              <Anchor fontSizeVariation="large" underline anchorVariation="primary" to="" asPath="">
                {getLabelValue(labels, addEditLabel, 'preferences')}
              </Anchor>
            </BodyCopy>
          </Col>
        </Row>
        <Row fullBleed className="elem-mb-SM">
          <Col
            colSize={{
              small: 5,
              large: 10,
              medium: 7,
            }}
          >
            {isFavStoreName ? (
              <Row fullBleed>
                <Col
                  colSize={{
                    small: 6,
                    medium: 8,
                    large: 12,
                  }}
                >
                  <BodyCopy
                    className="favStoreData capFirstLetter"
                    fontSize="fs14"
                    data-locator="storeName"
                    fontFamily="secondary"
                    component="p"
                    fontWeight="regular"
                  >
                    {favStoreName}
                  </BodyCopy>
                  <BodyCopy
                    className="favStoreData capFirstLetter"
                    fontSize="fs14"
                    data-locator="storeAddress"
                    fontFamily="secondary"
                    component="p"
                  >
                    {favStoreAddress}
                  </BodyCopy>
                  <BodyCopy
                    className="favStoreData capFirstLetter"
                    fontSize="fs14"
                    data-locator="storeCityDetails"
                    fontFamily="secondary"
                    component="p"
                  >
                    {`${favStoreCity}, ${favStoreState} ${favStoreZipcode}`}
                  </BodyCopy>
                  <BodyCopy
                    className="favStoreData"
                    fontSize="fs14"
                    data-locator="storePhoneNumber"
                    fontFamily="secondary"
                    component="p"
                  >
                    {formatPhoneNumber(favStorePhone)}
                  </BodyCopy>
                </Col>
              </Row>
            ) : (
              <BodyCopy fontSize="fs14" fontFamily="secondary">
                {getLabelValue(
                  labels,
                  'lbl_prefrence_tile_access_buy_online_pickup',
                  'preferences'
                )}
              </BodyCopy>
            )}
          </Col>
        </Row>
      </BodyCopy>
    </BodyCopy>
  );
};

MyFavoriteTile.propTypes = {
  labels: PropTypes.shape({}),
  favStoreName: PropTypes.string,
  favStoreAddress: PropTypes.string,
  favStoreState: PropTypes.string,
  favStoreCity: PropTypes.string,
  favStoreZipcode: PropTypes.string,
  favStorePhone: PropTypes.string,
  className: PropTypes.string,
};

MyFavoriteTile.defaultProps = {
  labels: {
    lbl_prefrence_tile_edit: '',
    lbl_prefrence_tile_add: '',
    lbl_prefrence_favorite_store: '',
    lbl_prefrence_tile_access_buy_online_pickup: '',
  },
  favStoreName: '',
  favStoreState: '',
  favStoreCity: '',
  favStoreZipcode: '',
  favStorePhone: '',
  favStoreAddress: '',
  className: '',
};

export default withStyles(MyFavoriteTile, styles);
