import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import CustomButton from '../../../../../../common/atoms/Button';
import {
  ParentContainerStyle,
  HeadingTextStyle,
  WrapperStyle,
  ImgWrapper,
  ImageStyle,
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
  } = props;
  return (
    <View {...props}>
      <HeadingTextStyle>{heading}</HeadingTextStyle>
      {cardList.size === 0 && (
        <React.Fragment>
          <WrapperStyle>
            <ImgWrapper>
              <ImageStyle source={cardImage} />
            </ImgWrapper>
            <EmptyCCLabelStyle>{emptyLabel}</EmptyCCLabelStyle>
          </WrapperStyle>
          <DescriptionEmptyCCStyle>{description}</DescriptionEmptyCCStyle>
        </React.Fragment>
      )}
      <ButtonWrapperStyle>
        <CustomButton
          text={cardList.size === 0 ? emptyBtnLabel : addBtnLabel}
          buttonVariation="variable-width"
          fill="BLUE"
          color="white"
        />
      </ButtonWrapperStyle>
      {cardList.size > 0 &&
        cardList.map(cardItem => {
          const cardTileProps = {
            card: cardItem,
            labels,
            setDefaultPaymentMethod,
          };
          return <CardTile {...cardTileProps} />;
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
};

Cards.defaultProps = {
  setDefaultPaymentMethod: null,
};

export default withStyles(Cards, ParentContainerStyle);
export { Cards as CardsVanilla };
