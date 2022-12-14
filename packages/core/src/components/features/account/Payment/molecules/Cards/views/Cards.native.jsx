import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import ImageComp from '@tcp/core/src/components/common/atoms/Image';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import CustomButton from '../../../../../../common/atoms/Button';
import {
  ParentContainerStyle,
  HeadingTextStyle,
  WrapperStyle,
  EmptyCCLabelStyle,
  DescriptionEmptyCCStyle,
  ButtonWrapperStyle,
} from '../Cards.style.native';
import CardTile from '../../../../common/molecule/CardTile/views/CardTile.view.native';

const Cards = props => {
  const {
    labels,
    cardList,
    heading,
    cardImage,
    emptyLabel,
    description,
    emptyBtnLabel,
    addBtnLabel,
    setDefaultPaymentMethod,
    onGetBalanceCard,
    checkbalanceValueInfo,
    toggleModal,
    openUpdateModal,
    setSelectedCard,
    setCardHandler,
    toggleRecaptchaModal,
  } = props;
  return (
    <View {...props}>
      <HeadingTextStyle>{heading}</HeadingTextStyle>
      {cardList.size === 0 && (
        <React.Fragment>
          <WrapperStyle>
            <ImageComp source={cardImage} height={46} width={69} resizeMode="contain" />
            <EmptyCCLabelStyle>{emptyLabel}</EmptyCCLabelStyle>
          </WrapperStyle>
          <DescriptionEmptyCCStyle>{description}</DescriptionEmptyCCStyle>
        </React.Fragment>
      )}
      <ButtonWrapperStyle>
        <CustomButton
          text={cardList.size === 0 ? emptyBtnLabel : addBtnLabel}
          fill="BLUE"
          onPress={setCardHandler}
        />
      </ButtonWrapperStyle>
      {cardList.size > 0 &&
        cardList.map(cardItem => {
          const cardTileProps = {
            card: cardItem,
            labels,
            setDefaultPaymentMethod,
            onGetBalanceCard,
            checkbalanceValueInfo,
          };
          return (
            <CardTile
              toggleModal={toggleModal}
              openUpdateModal={openUpdateModal}
              setSelectedCard={setSelectedCard}
              toggleRecaptchaModal={toggleRecaptchaModal}
              {...cardTileProps}
            />
          );
        })}
    </View>
  );
};

Cards.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  cardList: PropTypes.shape([]).isRequired,
  heading: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  emptyLabel: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  emptyBtnLabel: PropTypes.string.isRequired,
  addBtnLabel: PropTypes.string.isRequired,
  setDefaultPaymentMethod: PropTypes.func,
  onGetBalanceCard: PropTypes.func,
  checkbalanceValueInfo: PropTypes.func,
  toggleRecaptchaModal: PropTypes.func,
  toggleModal: PropTypes.func,
  openUpdateModal: PropTypes.func,
  setSelectedCard: PropTypes.func,
  setCardHandler: PropTypes.func,
};

Cards.defaultProps = {
  setDefaultPaymentMethod: null,
  onGetBalanceCard: null,
  checkbalanceValueInfo: null,
  toggleModal: null,
  openUpdateModal: null,
  toggleRecaptchaModal: null,
  setSelectedCard: null,
  setCardHandler: () => {},
};

export default withStyles(Cards, ParentContainerStyle);
export { Cards as CardsVanilla };
