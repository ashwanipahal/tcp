import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { ParentContainerStyle, HeadingTextStyle } from '../VenmoCards.style.native';
import CardTile from '../../../../common/molecule/CardTile/views/CardTile.view.native';

const VenmoCards = props => {
  const { labels, venmoCardList } = props;
  return (
    <View {...props}>
      <HeadingTextStyle>{labels.paymentGC.ACC_LBL_VENMO_HEADING}</HeadingTextStyle>
      {venmoCardList.size > 0 &&
        venmoCardList.map(cardItem => <CardTile card={cardItem} labels={labels} />)}
    </View>
  );
};

VenmoCards.propTypes = {
  labels: PropTypes.string,
  venmoCardList: PropTypes.shape({}),
};

VenmoCards.defaultProps = {
  labels: null,
  venmoCardList: {},
};

export default withStyles(VenmoCards, ParentContainerStyle);
export { VenmoCards as VenmoCardsVanilla };
