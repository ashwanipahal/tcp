import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { ParentContainerStyle, HeadingTextStyle } from '../VenmoCards.style.native';
import CardTile from '../../../../common/molecule/CardTile/views/CardTile.view.native';

const VenmoCards = props => {
  const { labels, venmoCardList, toggleModal, setSelectedCard } = props;
  return (
    <View {...props}>
      <HeadingTextStyle>{labels.paymentGC.lbl_payment_venmoHeading}</HeadingTextStyle>
      {venmoCardList.size > 0 &&
        venmoCardList.map(cardItem => (
          <CardTile
            card={cardItem}
            labels={labels}
            toggleModal={toggleModal}
            setSelectedCard={setSelectedCard}
          />
        ))}
    </View>
  );
};

VenmoCards.propTypes = {
  labels: PropTypes.string,
  venmoCardList: PropTypes.shape({}),
  toggleModal: PropTypes.func,
  setSelectedCard: PropTypes.func,
};

VenmoCards.defaultProps = {
  labels: null,
  venmoCardList: {},
  toggleModal: () => {},
  setSelectedCard: () => {},
};

export default withStyles(VenmoCards, ParentContainerStyle);
export { VenmoCards as VenmoCardsVanilla };
