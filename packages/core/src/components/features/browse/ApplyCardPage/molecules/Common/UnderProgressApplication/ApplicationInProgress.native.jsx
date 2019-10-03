import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../../../../common/atoms';
import {
  ImageContainer,
  StyledBodyCopy,
  ScrollViewContainer,
  ButtonWrapper,
  StyledAnchor,
  CheckoutButtonWrapper,
  BottomContainer,
  StyledImage,
} from './style/ApplicationInProgress.style.native';
import { getLabelValue } from '../../../../../../../utils/utils';

const headerImage = require('../../../../../../../assets/tcp-cc.png');

const ApplicationInProgress = ({ labels, bagItems, navigation, toggleModal }) => {
  return (
    <ScrollViewContainer>
      <ImageContainer>
        <StyledImage source={headerImage} width="60%" height="166px" />
      </ImageContainer>
      <StyledBodyCopy
        color="gray.900"
        fontFamily="secondary"
        fontWeight="regular"
        fontSize="fs22"
        textAlign="center"
        text={getLabelValue(labels, 'lbl_PLCCForm_underProgress')}
        paddingTop="32px"
        paddingLeft="14px"
        paddingRight="14px"
      />
      <StyledBodyCopy
        color="gray.900"
        fontFamily="secondary"
        fontSize="fs16"
        fontWeight="regular"
        textAlign="center"
        text={getLabelValue(labels, 'lbl_PLCCForm_underProcessDetails')}
        paddingTop="24px"
        paddingLeft="14px"
        paddingRight="14px"
      />
      {bagItems ? (
        <ButtonWrapper>
          <Button
            fill="BLUE"
            type="submit"
            fontWeight="regular"
            color="white"
            onPress={() => {
              toggleModal();
              navigation.navigate('bag');
            }}
            buttonVariation="variable-width"
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
          onPress={() => {
            navigation.navigate('Home');
          }}
          text={getLabelValue(labels, 'lbl_PLCCForm_continueShopping')}
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

ApplicationInProgress.propTypes = {
  labels: PropTypes.shape({
    apply_now_link_modal: PropTypes.string,
  }).isRequired,
  bagItems: PropTypes.bool.isRequired,
  navigation: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ApplicationInProgress;
