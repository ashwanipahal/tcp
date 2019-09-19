import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles.native';
// import {
//   Image,
//   Button,
//   BodyCopy,
//   InputCheckBox,
//   Anchor,
//   Row,
//   Col,
// } from '@tcp/core/src/components/common/atoms';
import styles from '../styles/StoreSearch.style.native';

// import TheMarketPlaceLogo from '../../../../../../../assets/my-place-rewards.png';
// import favIcon from '../../../../../../../../../mobileapp/src/assets/images/empty-heart.png';

const StoreSearch = props => {
  // const { labels } = props;
  // const imgStyle = { alignSelf: 'center', marginTop: 20 };
  return <View {...props}>data</View>;
};

StoreSearch.propTypes = {
  className: PropTypes.string.isRequired,
  selectedCountry: PropTypes.string.isRequired,
  loadStoresByCoordinates: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  error: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  labels: PropTypes.objectOf(PropTypes.string).isRequired,
  searchIcon: PropTypes.string.isRequired,
  markerIcon: PropTypes.string.isRequired,
};

StoreSearch.defaultProps = {
  submitting: false,
};

export default withStyles(StoreSearch, styles);
export { StoreSearch as LoginTopSectionVanilla };
