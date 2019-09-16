import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/MyFavoriteStore.style';

// const capitalizeFirstLetter=(string)=> {
//   if(string)
//   return string.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
//   return ''
// }
//  const formatPhone=(phone)=>{
//    if(phone)
//    return `(${phone.slice(0,3)})-${phone.slice(3,6)}-${phone.slice(6,15)}`
//    return ''
//  }
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
      title={labels.myFavoriteStore}
      ctaTitle={defaultStore ? labels.updateFavoriteStore : labels.addAStore}
      ctaPath="/account/profile"
      ctaLink="/account?id=profile&subSection=change-password"
      dataLocator="pi-changepassword"
    >
      <BodyCopy component="div">
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          >
            <BodyCopy
              className="elem-pb-SM favStoreData"
              fontSize="fs16"
              data-locator="pi-passwordtextheader"
              fontFamily="secondary"
              component="p"
            >
              {favStoreName}
            </BodyCopy>
            <BodyCopy
              className="elem-pb-SM favStoreData"
              fontSize="fs16"
              data-locator="pi-passwordtextheader"
              fontFamily="secondary"
              component="p"
            >
              {favStoreAddress}
            </BodyCopy>
            <BodyCopy
              className="elem-pb-SM favStoreData"
              fontSize="fs16"
              data-locator="pi-passwordtextheader"
              fontFamily="secondary"
              component="p"
            >
              {`${favStoreCity}, ${favStoreState} ${favStoreZipcode}`}
            </BodyCopy>
            <BodyCopy
              className="elem-pb-SM favStoreData"
              fontSize="fs16"
              data-locator="pi-passwordtextheader"
              fontFamily="secondary"
              component="p"
            >
              {favStorePhone}
            </BodyCopy>
          </Col>
        </Row>
      </BodyCopy>
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
