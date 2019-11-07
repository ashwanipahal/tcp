import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Espot from '@tcp/core/src/components/common/molecules/Espot';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { ParentContainerStyle } from '../OffersSection.style.native';

const OffersSection = ({ labels }) => (
  <View>
    <Espot richTextHtml={labels.ACC_PAYMNET_BANNER_LABEL} />
  </View>
);
OffersSection.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default withStyles(OffersSection, ParentContainerStyle);
export { OffersSection as OffersSectionVanilla };
