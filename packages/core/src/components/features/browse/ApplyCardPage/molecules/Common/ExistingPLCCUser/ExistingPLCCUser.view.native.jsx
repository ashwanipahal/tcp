import React from 'react';
import PropTypes from 'prop-types';
import { Button, RichText } from '../../../../../../common/atoms';
import {
  ImageContainer,
  StyledBodyCopy,
  ScrollViewContainer,
  ButtonWrapper,
  StyledAnchor,
  Container,
  RichTextContainer,
  CheckoutButtonWrapper,
  BottomContainer,
  StyledImage,
} from './style/ExistingPLCCUser.view.style.native';
import { getLabelValue } from '../../../../../../../utils/utils';

const headerImage = require('../../../../../../../assets/tcp-cc.png');

const ExistingPLCCUserView = ({
  labels,
  bagItems,
  existingCustomerDetails,
  navigation,
  toggleModal,
}) => {
  return (
    <ScrollViewContainer>
      <ImageContainer>
        <StyledImage source={headerImage} width="60%" height="166px" />
      </ImageContainer>
      <Container>
        <RichTextContainer>
          <RichText source={{ html: existingCustomerDetails }} />
        </RichTextContainer>
      </Container>
      {bagItems ? (
        <ButtonWrapper>
          <Button
            fill="BLUE"
            type="submit"
            fontWeight="regular"
            color="white"
            buttonVariation="variable-width"
            onPress={() => {
              toggleModal();
              navigation.navigate('bag');
            }}
            text={getLabelValue(labels, 'lbl_PLCCForm_checkout')}
            width="90%"
          />
        </ButtonWrapper>
      ) : null}
      <CheckoutButtonWrapper>
        <Button
          fill={bagItems ? 'WHITE' : 'BLUE'}
          type="submit"
          color={bagItems ? 'black' : 'white'}
          buttonVariation="variable-width"
          text={getLabelValue(labels, 'lbl_PLCCForm_continueShopping')}
          onPress={() => {
            navigation.navigate('Home');
          }}
          width="90%"
        />
      </CheckoutButtonWrapper>
      <BottomContainer>
        <StyledBodyCopy
          fontSize="fs10"
          fontFamily="secondary"
          text={getLabelValue(labels, 'lbl_PLCCModal_linksTextPrefix')}
          paddingRight="4px"
        />

        <StyledAnchor
          url={getLabelValue(labels, 'lbl_PLCCModal_detailsLink')}
          fontSizeVariation="medium"
          anchorVariation="primary"
          underline
          text={getLabelValue(labels, 'lbl_PLCCForm_details')}
          paddingRight="28px"
        />
      </BottomContainer>
    </ScrollViewContainer>
  );
};

ExistingPLCCUserView.propTypes = {
  labels: PropTypes.shape({
    apply_now_link_modal: PropTypes.string,
  }).isRequired,
  bagItems: PropTypes.bool.isRequired,
  existingCustomerDetails: PropTypes.string.isRequired,
  navigation: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ExistingPLCCUserView;
