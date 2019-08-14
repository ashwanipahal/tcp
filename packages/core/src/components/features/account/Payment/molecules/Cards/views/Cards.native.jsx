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
  ModalHeading,
  ModalViewWrapper,
  LineWrapper,
} from '../Cards.style.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import LineComp from '../../../../../../common/atoms/Line';
import CardTile from '../../../../common/molecule/CardTile/views/CardTile.view.native';
import ModalNative from '../../../../../../common/molecules/Modal';
import AddGiftCardContainer from '../../../AddGiftCard/container/AddGiftCard.container.native';

class Cards extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal,
    });
  };

  render() {
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
      setSelectedCard,
      toggleModal,
    } = this.props;
    const { showModal } = this.state;
    return (
      <View {...this.props}>
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
            onPress={this.toggleModal}
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
                setSelectedCard={setSelectedCard}
                {...cardTileProps}
              />
            );
          })}
        {showModal && (
          <ModalNative isOpen={showModal} onRequestClose={this.toggleModal}>
            <ModalHeading>
              <BodyCopy
                mobileFontFamily={['secondary']}
                fontWeight="extrabold"
                fontSize="fs16"
                text={labels.paymentGC.lbl_payment_addGiftCard}
              />
            </ModalHeading>
            <LineWrapper>
              <LineComp marginTop={5} borderWidth={1} borderColor="black" />
            </LineWrapper>
            <ModalViewWrapper>
              <AddGiftCardContainer toggleModal={this.toggleModal} labels={labels} />
            </ModalViewWrapper>
          </ModalNative>
        )}
      </View>
    );
  }
}

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
  toggleModal: PropTypes.func,
  setSelectedCard: PropTypes.func,
};

Cards.defaultProps = {
  setDefaultPaymentMethod: null,
  onGetBalanceCard: null,
  checkbalanceValueInfo: null,
  toggleModal: null,
  setSelectedCard: null,
};

export default withStyles(Cards, ParentContainerStyle);
export { Cards as CardsVanilla };
